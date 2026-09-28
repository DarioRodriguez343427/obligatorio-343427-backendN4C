import Clase from "../models/clase.model.js";
import Disciplina from "../models/disciplina.model.js";
import User from "../models/user.model.js";
import { Plan } from "../../constants/plan.constants.js";


//funcion auxiliar para no estar repidiento el populate y pasar la query por parametro
const populatedClase = (query) => {
    return query
        .populate("disciplina", "nombre descripcion")
        .populate("usuario", "name username email plan");
};

const createServiceError = (message, status) => {
    const error = new Error(message);
    error.status = status;
    error.publicMessage = message;
    return error;
};

const validateDisciplina = async (idDisciplina) => {
    const disciplinaExiste = await Disciplina.exists({ _id: idDisciplina });

    if (!disciplinaExiste) {
        throw createServiceError("Disciplina no existe", 404);
    }
};

export const getAllClasesByUserService = async (idUser) => {
    return populatedClase(Clase.find({ usuario: idUser }));
};

export const getClaseByIdService = async (idClase, idUser) => {
    return populatedClase(Clase.findOne({ _id: idClase, usuario: idUser }));
};

export const createClaseService = async (idUser, data) => {
    const [user] = await Promise.all([
        User.findById(idUser),
        validateDisciplina(data.disciplina)
    ]);

    if (!user) {
        throw createServiceError("Usuario no existe", 404);
    }

    if (user.plan === Plan.plus) {
        const cantidadClases = await Clase.countDocuments({ usuario: idUser });

        if (cantidadClases >= 4) {
            throw createServiceError(
                "El plan plus permite crear un máximo de 4 clases",
                403
            );
        }
    }

    const clase = await Clase.create({
        ...data,
        usuario: idUser
    });


    return clase.populate([
        { path: "disciplina", select: "nombre descripcion" },
        { path: "usuario", select: "name username email plan" }
    ]);
};

export const deleteClaseService = async (idClase, idUser) => {
    const clase = await Clase.findOneAndDelete({ _id: idClase, usuario: idUser });
    return clase;
};

export const updateClaseService = async (idClase, idUser, data) => {
    if (data.disciplina) {
        await validateDisciplina(data.disciplina);
    }

    const clase = await populatedClase(Clase.findOneAndUpdate(
        { _id: idClase, usuario: idUser },
        data,
        {
            returnDocument: "after",
            runValidators: true
        }
    ));
    return clase;
};

export const replaceClaseService = async (idClase, idUser, data) => {
    await validateDisciplina(data.disciplina);

    const clase = await populatedClase(Clase.findOneAndReplace(
        { _id: idClase, usuario: idUser },
        { ...data, usuario: idUser },
        {
            returnDocument: "after",
            runValidators: true
        }
    ));
    return clase;
};
