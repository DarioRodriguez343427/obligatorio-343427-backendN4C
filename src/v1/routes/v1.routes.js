import { Router } from "express";
import clasesRoutes from "./v1.clase.routes.js";
import disciplinasRoutes from "./v1.disciplina.routes.js";
import authRoutes from "./v1.auth.routes.js";
import usersRoutes from "./v1.user.routes.js";

const v1Routes = Router();

v1Routes.use("/auth", authRoutes);


v1Routes.use("/users", usersRoutes);
v1Routes.use("/clases", clasesRoutes);
v1Routes.use("/disciplinas", disciplinasRoutes);

export default v1Routes;
