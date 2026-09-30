import {Router} from "express";
import { authMiddleware } from "../../middleware/auth.middleware.js";
import { changeMyPlanController, deleteUserController, getUserByIdController, replaceUserController, updateUserController, updateUserByIdController } from "../controller/user.controller.js";
import { validateRolAdminMiddleware, validateRolClienteMiddleware } from "../../middleware/rol.middleware.js";
import { middlewareReplaceUserValidateBody, middlewareUpdateUserValidateBody, middlewareUpdateMyUserValidateBody } from "../../middleware/user.middleware.js";

const usersRoutes = Router();

//siempre autorizados
usersRoutes.use(authMiddleware);

//solo cliente
usersRoutes.patch("/",validateRolClienteMiddleware, middlewareUpdateMyUserValidateBody, updateUserController);
usersRoutes.patch("/plan", validateRolClienteMiddleware, changeMyPlanController);

//solo admin
usersRoutes.use(validateRolAdminMiddleware);

usersRoutes.patch("/:idUser", middlewareUpdateUserValidateBody, updateUserByIdController);
usersRoutes.get("/:idUser", getUserByIdController);
usersRoutes.delete("/:idUser", deleteUserController);
usersRoutes.put("/:idUser", middlewareReplaceUserValidateBody ,replaceUserController);

export default usersRoutes;
