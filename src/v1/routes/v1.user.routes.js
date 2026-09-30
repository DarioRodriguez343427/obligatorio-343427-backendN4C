import {Router} from "express";
import { authMiddleware } from "../../middleware/auth.middleware.js";
import { changeMyPlanController, deleteUserController, getUserByIdController, replaceUserController, updateUserController, updateUserByIdController } from "../controller/user.controller.js";
import { validateRolAdminMiddleware, validateRolClienteMiddleware } from "../../middleware/rol.middleware.js";
import { middlewareReplaceUserValidateBody, middlewareUpdateUserValidateBody, middlewareUpdateMyUserValidateBody } from "../../middleware/user.middleware.js";

//controladores

const usersRoutes = Router();

usersRoutes.use(authMiddleware);

usersRoutes.patch("/", middlewareUpdateMyUserValidateBody, updateUserController);
usersRoutes.patch("/me", middlewareUpdateMyUserValidateBody, updateUserController);
usersRoutes.patch("/me/plan", validateRolClienteMiddleware, changeMyPlanController);

usersRoutes.use(validateRolAdminMiddleware);
usersRoutes.patch("/:idUser", middlewareUpdateUserValidateBody, updateUserByIdController);

usersRoutes.get("/:idUser", getUserByIdController);
usersRoutes.delete("/:idUser", deleteUserController);
usersRoutes.put("/:idUser", middlewareReplaceUserValidateBody ,replaceUserController);

export default usersRoutes;
