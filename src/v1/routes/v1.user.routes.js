import {Router} from "express";
import { authMiddleware } from "../../middleware/auth.middleware.js";
import { changeMyPlanController, deleteUserController, getUserByIdController, replaceUserController, updateUserController } from "../controller/user.controller.js";
import { validateRolAdminMiddleware, validateRolClienteMiddleware } from "../../middleware/rol.middleware.js";
import { middlewareReplaceUserValidateBody, middlewareUpdateUserValidateBody, validatePlanClienteMiddleware } from "../../middleware/user.middleware.js";

//controladores

const usersRoutes = Router();

usersRoutes.use(authMiddleware);

usersRoutes.patch("/", middlewareUpdateUserValidateBody ,updateUserController);
usersRoutes.patch("/me/plan", validateRolClienteMiddleware, validatePlanClienteMiddleware, changeMyPlanController);

usersRoutes.use(validateRolAdminMiddleware);

usersRoutes.get("/:idUser", getUserByIdController);
usersRoutes.delete("/:idUser", deleteUserController);
usersRoutes.put("/:idUser", middlewareReplaceUserValidateBody ,replaceUserController);

export default usersRoutes;
