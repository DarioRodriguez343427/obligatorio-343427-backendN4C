import {Router} from "express";
import { adminMiddleware, authMiddleware } from "../../middleware/auth.middleware.js";
import { validateRequest } from "../../middleware/validate.middleware.js";
import { replaceUserBodySchema, updateUserBodySchema } from "../../schemas/user-body.schema.js";
import { changeMyPlanController, deleteUserController, getUserByIdController, replaceUserController, updateUserController } from "../controller/user.controller.js";

//controladores

const usersRoutes = Router();

usersRoutes.use(authMiddleware);

// El cliente cambia su propio plan; las demás operaciones requieren administrador.
usersRoutes.patch("/me/plan", changeMyPlanController);

usersRoutes.use(adminMiddleware);

usersRoutes.get("/:idUser", getUserByIdController);
usersRoutes.delete("/:idUser", deleteUserController);
usersRoutes.patch("/:idUser",validateRequest(updateUserBodySchema, "body"),updateUserController);
usersRoutes.put("/:idUser",validateRequest(replaceUserBodySchema, "body"),replaceUserController);

export default usersRoutes;
