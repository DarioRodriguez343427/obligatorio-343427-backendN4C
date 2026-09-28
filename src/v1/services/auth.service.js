import User from "../models/user.model.js";
import { getUserByEmail, getUserByUsername } from "./user.services.js";
import { hashear } from "../../utils/validar-password.js";

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
        throw new Error("Error el usuario ya existe");
    }
    const username = data.username;
    const userPorUsername = await getUserByUsername(username);
    if (userPorUsername) {
        throw new Error("Error el usuario ya existe");
    }
    const passwordHash = await hashear(data.password);
    const { confirmPassword, password, ...userData } = data;
    const user = await User.create({
        ...userData,
        password: passwordHash
    });
    
    return user;
}
