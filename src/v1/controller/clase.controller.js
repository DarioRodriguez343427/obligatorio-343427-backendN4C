import {
    createClaseService,
    deleteClaseService,
    getAllClasesByUserService,
    getClasesByUserServicePaginated,
    getClaseByIdService,
    replaceClaseService,
    updateClaseService
} from "../services/clase.services.js";

export const getAllClasesByUserController = async (req, res) => {
    const { pagina, limite, nombre, disciplina } = res.locals.validatedQuery;

    if (pagina === undefined && limite === undefined) {
        const clases = await getAllClasesByUserService(req.user.id, { nombre, disciplina });
        return res.status(200).json(clases);
    }

    const resultado = await getClasesByUserServicePaginated(req.user.id, {
        pagina: pagina ?? 1,
        limite: limite ?? 20,
        nombre,
        disciplina
    });
    return res.status(200).json(resultado);
};

export const getClaseByIdController = async (req, res) => {
    const clase = await getClaseByIdService(req.params.idClase, req.user.id);

    if (!clase) {
        return res.status(404).json({ message: "Clase no existe" });
    }

    return res.status(200).json(clase);
};

export const createClaseController = async (req, res) => {
    const clase = await createClaseService(req.user.id, req.body);
    return res.status(201).json(clase);
};

export const deleteClaseController = async (req, res) => {
    const clase = await deleteClaseService(req.params.idClase, req.user.id);

    if (!clase) {
        return res.status(404).json({ message: "Clase no existe" });
    }

    return res.status(204).send();
};

export const updateClaseController = async (req, res) => {
    const clase = await updateClaseService(req.params.idClase, req.user.id, req.body);

    if (!clase) {
        return res.status(404).json({ message: "Clase no existe" });
    }

    return res.status(200).json(clase);
};

export const replaceClaseController = async (req, res) => {
    const clase = await replaceClaseService(req.params.idClase, req.user.id, req.body);

    if (!clase) {
        return res.status(404).json({ message: "Clase no existe" });
    }

    return res.status(200).json(clase);
};
