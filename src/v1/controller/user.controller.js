//aca importamos los services
import { changeMyPlanService, deleteUserService, getUserByIdService, updateUserService, replaceUserService } from "../services/user.services.js";

export const changeMyPlanController = async (req, res) => {
	const user = await changeMyPlanService(req.user.id);
	return res.status(200).json(user);
};


export const deleteUserController = async  (req, res) => {
	const { idUser } = req.params;
	const user = await deleteUserService(idUser);
	if (!user) {
		return res.status(404).json({message: "Usuario no existe"});
	}
	return res.status(204).send();
};


export const getUserByIdController = async (req, res) => {
	const { idUser } = req.params;
	const user = await getUserByIdService(idUser);
	if (!user) {
		return res.status(404).json({message: "Usuario no existe"});
	}
	return res.status(200).json(user);
}


export const updateUserController = async (req, res) => {
	const data = req.body;
	const idUser = req.user?.id;
	const user = await updateUserService(idUser, data);
	if (!user) {
		return res.status(404).json({message: "Usuario no existe"});
	}
	return res.status(200).json(user);
}

export const updateUserByIdController = async (req, res) => {
    const user = await updateUserService(req.params.idUser, req.body);
    if (!user) {
        return res.status(404).json({ message: "Usuario no existe" });
    }
    return res.status(200).json(user);
};

export const replaceUserController = async (req, res) => {
	const data = req.body;
	const { idUser } = req.params;

	const user = await replaceUserService(idUser, data);

	if (!user) {
		return res.status(404).json({message: "Usuario no existe"});
	}

	return res.status(200).json(user);
};
