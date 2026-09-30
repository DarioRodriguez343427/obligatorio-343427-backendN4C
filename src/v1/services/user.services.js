import User from "../models/user.model.js";
import { hashear } from "../../utils/validar-password.js";
import { Role } from "../../constants/role.constants.js";
import { Plan } from "../../constants/plan.constants.js";
import { constructorError } from "../../utils/contructor.error.js";

export const changeMyPlanService = async (idUser) => {
    const user = await User.findById(idUser);

    if (!user) {
        throw constructorError("Usuario no existe", 404); 
    }

    // La condición también se comprueba al actualizar para evitar dos cambios simultáneos.
    const updatedUser = await User.findOneAndUpdate(
        { _id: idUser, role: Role.cliente, plan: Plan.plus },
        { $set: { plan: Plan.premium } },
        { returnDocument: "after", runValidators: true }
    );

    if (!updatedUser) {
        throw constructorError("Solo se puede cambiar de Plus a Premium", 409); 
    }

    return updatedUser;
};

const prepareUserData = async (data) => {
    const { confirmPassword, ...userData } = data;

    if (userData.password) {
        userData.password = await hashear(userData.password);
    }

    return userData;
};

export const getUserByEmail = async (data) => {
    return await User.findOne({ email: data });
}

export const getUserByUsername = async (data) => {
    return await User.findOne({ username: data });
}


//CRUD
//crear usuario se lo delegamos a auth.services

export const getUserByIdService = async (id) => {
    return await User.findById(id);
};

export const deleteUserService = async (id) => {
    const user = await User.findByIdAndDelete(id);
    return user;
};

//modificar algunos campos
export const updateUserService = async (id, data) => {
    const userData = await prepareUserData(data);

    const user = await User.findByIdAndUpdate(id, userData, {
        returnDocument: "after",
        runValidators: true
    });
    return user;
};

//reemplazar usuario
export const replaceUserService = async (id, data) => {
    const userData = await prepareUserData(data);

    const user = await User.findOneAndReplace(
        { _id: id },
        userData,
        {
            returnDocument: "after",
            runValidators: true
        }
    );
    return user;
};
