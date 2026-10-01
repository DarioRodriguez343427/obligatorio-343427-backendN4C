import { generarDescripcionService } from "../services/ia.services.js";

export const generarDescripcionController = async (req, res) => {
    const { nombre, detalles } = req.body;

    const descripcion = await generarDescripcionService(
        nombre,
        detalles
    );

    return res.status(200).json({ descripcion });
};