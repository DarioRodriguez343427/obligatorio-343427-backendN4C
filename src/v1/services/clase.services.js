import Clase from "../models/clase.model.js";
import Disciplina from "../models/disciplina.model.js";
import User from "../models/user.model.js";
import { Plan } from "../../constants/plan.constants.js";
import { Role } from "../../constants/role.constants.js";
import { constructorError } from "../../utils/contructor.error.js";


// auxiliar para no estar repidiento el populate y pasar la query por parametro
const populatedClase = (query) => {
    return query
        .populate("disciplina", "nombre")
        .populate("usuario", "username plan");
};

const validateDisciplina = async (idDisciplina) => {
    const disciplinaExiste = await Disciplina.exists({ _id: idDisciplina });

    if (!disciplinaExiste) {
        throw constructorError("Disciplina no existe", 404);
    }
};

const crearFiltroClases = (idUser, { nombre, disciplina } = {}) => {
    const filtro = { usuario: idUser };
    if (disciplina) filtro.disciplina = disciplina;
    if (nombre) {
        // Escapar símbolos para buscar texto literal, no expresiones del usuario.
        const texto = nombre.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        filtro.nombre = { $regex: texto, $options: "i" };
    }
    return filtro;
};


export const getClasesByUserServicePaginated = async (idUser, { pagina, limite, nombre, disciplina }) => {
    const filtro = crearFiltroClases(idUser, { nombre, disciplina });
    const [clases, total] = await Promise.all([
        populatedClase(
            Clase.find(filtro)
                .sort({ _id: -1 })
                .skip((pagina - 1) * limite)
                .limit(limite)
        ),
        Clase.countDocuments(filtro)
    ]);

    return {
        clases,
        pagina,
        limite,
        total,
        totalPaginas: Math.ceil(total / limite)
    };
};

export const getClaseByIdService = async (idClase, idUser) => {
    return populatedClase(Clase.findOne({ _id: idClase, usuario: idUser }));
};

export const createClaseService = async (idUser, data) => {
    const user = await User.findById(idUser);

    if (!user) {
        throw constructorError("Usuario no existe", 404);
    }
    if (user.role !== Role.cliente) {
        throw constructorError("Solo los clientes pueden crear clases", 403);
    }

    const existeClase = await Clase.exists({nombre: data.nombre, usuario: idUser});
    if(existeClase){
        throw constructorError("El nombre de la clase que intenta crear ya existe", 409);
    }

    await validateDisciplina(data.disciplina);

    if (user.plan === Plan.plus) {
        const cantidad = await Clase.countDocuments({ usuario: idUser });
        if (cantidad >= 4) {
            throw constructorError("El plan plus permite crear un máximo de 4 clases", 403);
        }
    }

    const clase = await Clase.create({...data,usuario: idUser});

    await clase.populate({
        path: "disciplina",
        select: "nombre"
    });

    await clase.populate({
        path: "usuario",
        select: "username plan"
    });

    return clase;
};

export const deleteClaseService = async (idClase, idUser) => {
    const clase = await Clase.findOneAndDelete({ _id: idClase, usuario: idUser });
    return clase;
};

export const updateClaseService = async (idClase, idUser, data) => {
    if (data.disciplina) {
        await validateDisciplina(data.disciplina);
    }

    const existeClase = await Clase.exists({nombre: data.nombre, usuario: idUser});
    if(existeClase){
        throw constructorError("El nombre de la clase que intenta actualizar ya existe", 409);
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

    const existeClase = await Clase.exists({nombre: data.nombre, usuario: idUser});
    if(existeClase){
        throw constructorError("El nombre de la clase que intenta remplazar ya existe", 409);
    }

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
