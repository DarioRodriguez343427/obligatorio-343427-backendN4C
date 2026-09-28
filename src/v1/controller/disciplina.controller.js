import {createDisciplinaService, deleteDisciplinaService, getAllDisciplinasService, getDisciplinaByIdService, replaceDisciplinaService, updateDisciplinaService } from "../services/disciplina.services.js";

export const getAllDisciplinasController = async (req, res) => {
    const disciplinas = await getAllDisciplinasService();
    return res.status(200).json(disciplinas);
};

export const getDisciplinaByIdController = async (req, res) => {
    const { idDisciplina } = req.params;
    const disciplina = await getDisciplinaByIdService(idDisciplina);

    if (!disciplina) {
        return res.status(404).json({ message: "Disciplina no existe" });
    }

    return res.status(200).json(disciplina);
};

export const createDisciplinaController = async (req, res) => {
    const disciplina = await createDisciplinaService(req.body);
    return res.status(201).json(disciplina);
};

export const deleteDisciplinaController = async (req, res) => {
    const { idDisciplina } = req.params;
    const disciplina = await deleteDisciplinaService(idDisciplina);

    if (!disciplina) {
        return res.status(404).json({ message: "Disciplina no existe" });
    }

    return res.status(204).send();
};

export const updateDisciplinaController = async (req, res) => {
    const { idDisciplina } = req.params;
    const disciplina = await updateDisciplinaService(idDisciplina, req.body);

    if (!disciplina) {
        return res.status(404).json({ message: "Disciplina no existe" });
    }

    return res.status(200).json(disciplina);
};

export const replaceDisciplinaController = async (req, res) => {
    const { idDisciplina } = req.params;
    const disciplina = await replaceDisciplinaService(idDisciplina, req.body);

    if (!disciplina) {
        return res.status(404).json({ message: "Disciplina no existe" });
    }

    return res.status(200).json(disciplina);
};
