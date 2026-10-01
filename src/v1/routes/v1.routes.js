import { Router } from "express";
import clasesRoutes from "./v1.clase.routes.js";
import disciplinasRoutes from "./v1.disciplina.routes.js";
import authRoutes from "./v1.auth.routes.js";
import usersRoutes from "./v1.user.routes.js";
import iaRoutes from "./v1.ia.routes.js";
import climaRoutes from "./v1.clima.routes.js";

const v1Routes = Router();

v1Routes.use("/auth", authRoutes);


v1Routes.use("/users", usersRoutes);
v1Routes.use("/clases", clasesRoutes);
v1Routes.use("/disciplinas", disciplinasRoutes);
v1Routes.use("/ia", iaRoutes);
v1Routes.use("/clima", climaRoutes);

export default v1Routes;
