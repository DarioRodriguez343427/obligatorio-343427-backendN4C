
import { Router } from "express"
import { loginController, registerController } from "../controller/auth.controller.js";
import { middlewareValidateLoginBody, middlewareValidateRegisterBody } from "../../middleware/auth.middleware.js";


const authRoutes = Router();



authRoutes.post("/login", middlewareValidateLoginBody, loginController);
authRoutes.post("/register", middlewareValidateRegisterBody, registerController);


export default authRoutes

