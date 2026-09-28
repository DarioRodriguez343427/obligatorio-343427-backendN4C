import test from "node:test";
import assert from "node:assert/strict";
import express from "express";
import usersRoutes from "../src/v1/routes/v1.user.routes.js";
import clasesRoutes from "../src/v1/routes/v1.clase.routes.js";
import { middlewareErrores } from "../src/middleware/error.middleware.js";
import { generateAccessToken } from "../src/utils/token.util.js";
import User from "../src/v1/models/user.model.js";
import Clase from "../src/v1/models/clase.model.js";
import Disciplina from "../src/v1/models/disciplina.model.js";

// Pruebas locales: se sustituyen las consultas, sin conectar a MongoDB.
test("autorización de planes y propiedad de clases", async (t) => {
    process.env.JWT_ACCESS_SECRET = "secreto-local-exclusivo-de-pruebas";
    process.env.ACCESS_TOKEN_EXPIRES = "5m";
    const owner = "507f1f77bcf86cd799439011";
    const other = "507f1f77bcf86cd799439012";
    const classId = "507f1f77bcf86cd799439013";
    const disciplineId = "507f1f77bcf86cd799439014";
    const accounts = {
        [owner]: { _id: owner, role: "cliente", plan: "plus" },
        [other]: { _id: other, role: "cliente", plan: "plus" }
    };
    let row = { _id: classId, usuario: owner, disciplina: disciplineId, nombre: "Pilates", descripcion: "Clase inicial" };
    const query = (value) => ({ populate() { return this; }, then(resolve, reject) { return Promise.resolve(value).then(resolve, reject); } });
    const matches = (filter) => row && row.usuario === filter.usuario && (!filter._id || row._id === filter._id);
    t.mock.method(User, "findById", async (id) => accounts[id] || null);
    t.mock.method(User, "findOneAndUpdate", async (filter, update) => {
        const user = accounts[filter._id];
        if (!user || user.role !== filter.role || user.plan !== filter.plan) return null;
        Object.assign(user, update.$set);
        return user;
    });
    t.mock.method(Disciplina, "exists", async () => ({ _id: disciplineId }));
    t.mock.method(Clase, "find", (filter) => query(matches(filter) ? [row] : []));
    t.mock.method(Clase, "findOne", (filter) => query(matches(filter) ? row : null));
    t.mock.method(Clase, "findOneAndUpdate", (filter, data) => {
        if (!matches(filter)) return query(null);
        Object.assign(row, data);
        return query(row);
    });
    t.mock.method(Clase, "findOneAndReplace", (filter, data) => {
        if (!matches(filter)) return query(null);
        row = { _id: classId, ...data };
        return query(row);
    });
    t.mock.method(Clase, "findOneAndDelete", async (filter) => {
        if (!matches(filter)) return null;
        const deleted = row;
        row = null;
        return deleted;
    });
    t.mock.method(Clase, "countDocuments", async () => 0);
    t.mock.method(Clase, "create", async (data) => ({ populate: async () => ({ _id: classId, ...data }) }));
    const app = express();
    app.use(express.json());
    app.use("/users", usersRoutes);
    app.use("/clases", clasesRoutes);
    app.use(middlewareErrores);
    const server = app.listen(0, "127.0.0.1");
    await new Promise((resolve) => server.once("listening", resolve));
    t.after(() => new Promise((resolve) => server.close(resolve)));
    const request = async (method, path, id, body) => {
        const headers = { "Content-Type": "application/json" };
        if (id) headers.Authorization = `Bearer ${generateAccessToken({ id, role: accounts[id]?.role || "cliente" })}`;
        return fetch(`http://127.0.0.1:${server.address().port}${path}`, {
            method, headers, ...(body ? { body: JSON.stringify(body) } : {})
        });
    };

    await t.test("plan: exige login y solo cambia la cuenta del token", async () => {
        assert.equal((await request("PATCH", "/users/me/plan")).status, 401);
        const response = await request("PATCH", "/users/me/plan", owner, { idUser: other, role: "admin", plan: "plus" });
        assert.equal(response.status, 200);
        assert.equal((await response.json()).plan, "premium");
        assert.equal(accounts[owner].role, "cliente");
        assert.equal(accounts[other].plan, "plus");
        assert.equal((await request("PATCH", "/users/me/plan", owner)).status, 409);
        assert.equal((await request("PATCH", `/users/${other}`, owner, { plan: "premium" })).status, 403);
    });
    await t.test("plan: rechaza administradores y cuentas inexistentes", async () => {
        accounts[other].role = "admin";
        assert.equal((await request("PATCH", "/users/me/plan", other)).status, 403);
        accounts[other].role = "cliente";
        assert.equal((await request("PATCH", "/users/me/plan", disciplineId)).status, 404);
    });
    await t.test("clases: otro cliente no puede listar, consultar ni modificar las ajenas", async () => {
        assert.equal((await request("GET", "/clases")).status, 401);
        assert.deepEqual(await (await request("GET", "/clases", other)).json(), []);
        const replacement = { nombre: "Otra clase", descripcion: "Otra descripcion", disciplina: disciplineId };
        for (const method of ["GET", "PATCH", "PUT", "DELETE"]) {
            const body = method === "PATCH" ? { nombre: "Cambio" } : method === "PUT" ? replacement : undefined;
            assert.equal((await request(method, `/clases/${classId}`, other, body)).status, 404);
        }
        assert.equal(row.nombre, "Pilates");
    });
    await t.test("clases: el propietario puede operar pero no transferir la propiedad", async () => {
        assert.equal((await request("GET", `/clases/${classId}`, owner)).status, 200);
        assert.equal((await (await request("GET", "/clases", owner)).json()).length, 1);
        const data = { nombre: "Nueva clase", descripcion: "Descripcion de prueba", disciplina: disciplineId };
        assert.equal((await request("POST", "/clases", owner, { ...data, usuario: other })).status, 400);
        assert.equal((await request("PATCH", `/clases/${classId}`, owner, { usuario: other })).status, 400);
        assert.equal((await request("PUT", `/clases/${classId}`, owner, { ...data, usuario: other })).status, 400);
        const created = await request("POST", "/clases", owner, data);
        assert.equal(created.status, 201);
        assert.equal((await created.json()).usuario, owner);
        assert.equal((await request("PATCH", `/clases/${classId}`, owner, { nombre: "Editada" })).status, 200);
        assert.equal((await request("PUT", `/clases/${classId}`, owner, data)).status, 200);
        assert.equal(row.usuario, owner);
        assert.equal((await request("DELETE", `/clases/${classId}`, owner)).status, 204);
    });
});
