import {Router} from "express";
import { authMiddleware } from "../../middleware/auth.middleware.js";
import { validateRequest } from "../../middleware/validate.middleware.js";
import { replaceUserBodySchema, updateUserBodySchema } from "../../schemas/user-body.schema.js";
import { changeMyPlanController, deleteUserController, getUserByIdController, replaceUserController, updateUserController } from "../controller/user.controller.js";
import { validateRolAdminMiddleware, validateRolClienteMiddleware } from "../../middleware/rol.middleware.js";

//controladores

const usersRoutes = Router();

usersRoutes.use(authMiddleware);

// El cliente cambia su propio plan; las demás operaciones requieren administrador.
usersRoutes.patch("/me/plan", validateRolClienteMiddleware, changeMyPlanController);


usersRoutes.use(validateRolAdminMiddleware);

usersRoutes.get("/:idUser", getUserByIdController);
usersRoutes.delete("/:idUser", deleteUserController);
usersRoutes.patch("/:idUser",validateRequest(updateUserBodySchema, "body"),updateUserController);
usersRoutes.put("/:idUser",validateRequest(replaceUserBodySchema, "body"),replaceUserController);

export default usersRoutes;
