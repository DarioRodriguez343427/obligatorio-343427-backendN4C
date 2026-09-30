import Disciplina from "../models/disciplina.model.js";
import Clase from "../models/clase.model.js";
import { constructorError } from "../../utils/contructor.error.js";


export const getAllDisciplinasService = async () => {
    return Disciplina.find();
};

export const getDisciplinaByIdService = async (id) => {
    return Disciplina.findById(id);
};

export const createDisciplinaService = async (data) => {
    return Disciplina.create(data);
};

export const deleteDisciplinaService = async (id) => {
    if (await Clase.exists({ disciplina: id })) {
        throw constructorError("No se puede eliminar una disciplina con clases asociadas", 409);
    }
    const disciplina = await Disciplina.findByIdAndDelete(id);
    return disciplina;
};

export const updateDisciplinaService = async (id, data) => {
    const disciplina = await Disciplina.findByIdAndUpdate(id, data, {returnDocument: "after", runValidators: true});
    return disciplina;
};

export const replaceDisciplinaService = async (id, data) => {
    const disciplina = await Disciplina.findOneAndReplace({ _id: id },data,
        {
            returnDocument: "after",
            runValidators: true // esto lo puse para que exita todos los campos
        }
    );
    return disciplina;
};
