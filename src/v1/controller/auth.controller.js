import { generateAccessToken } from "../../utils/token.util.js";
import { Role } from "../../constants/role.constants.js";
import { compararPassword } from "../../utils/validar-password.js";
import { createUserService, getUserByEmailOrUsername } from "../services/auth.service.js";
import { Estado } from "../../constants/estado.constants.js";



export const loginController = async (req, res) => {

    const userLogin = req.body

    if (!userLogin) {
        return res.status(401).json({ message: "Credenciales invalidas" });
    }
    const emailOUsername = userLogin.identificador;

    const user = await getUserByEmailOrUsername(emailOUsername);

    if (!user) {
        return res.status(401).json({ message: "Credenciales invalidas" });
    }

    const passwordParam = userLogin.password;
    const passwordBase = user.password;

    const valid = await compararPassword(passwordParam, passwordBase);

    if (!valid) {
        return res.status(401).json({ message: "Credenciales invalidas" });
    }

    if (user.role === Role.cliente && user.estado !== Estado.activo) {
        return res.status(403).json({ message: "El cliente está inactivo" });
    }

    const data = {
        id: user._id,
        username: user.username,
        name: user.name,
        email: user.email,
        role: user.role
    }
    const token = generateAccessToken(data);
    return res.status(200).json({
        user,
        token
    });
}


export const registerController = async (req, res) => {
    const data = req.body;
    const user = await createUserService(data);
    const token = generateAccessToken({
        id: user._id,
        username: user.username,
        name: user.name,
        email: user.email,
        role: user.role
    });

    return res.status(201).json({
        user,
        token
    });
}
