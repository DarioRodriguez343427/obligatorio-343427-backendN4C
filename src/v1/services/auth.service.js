import User from "../models/user.model.js";
import { getUserByEmail, getUserByUsername } from "./user.services.js";
import { hashear } from "../../utils/validar-password.js";
import { constructorError } from "../../utils/contructor.error.js";
import { Role } from "../../constants/role.constants.js";
import { Plan } from "../../constants/plan.constants.js";

export const getUserByEmailOrUsername = async (data) => {
    return await User.findOne({
        $or: [
            { email: data },
            { username: data }
        ]
    }).select("+password");
}

export const createUserService = async (data) => {
    const email = data.email;
    const userPorEmail = await getUserByEmail(email);
    if (userPorEmail) {
        throw constructorError("El email ya está registrado", 409);
    }
    const username = data.username;
    const userPorUsername = await getUserByUsername(username);
    if (userPorUsername) {
        throw constructorError("El username ya está registrado", 409);
    }
    const passwordHash = await hashear(data.password);
    const { confirmPassword, password, ...userData } = data;
    const user = await User.create({
        ...userData,
        role: Role.cliente,
        plan: Plan.plus,
        password: passwordHash
    });
    
    return user;
}
