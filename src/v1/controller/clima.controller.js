import { obtenerClimaService } from "../services/clima.services.js";
import { validarFechaClima } from "../../utils/validar-fecha.js";

export const obtenerClimaController = async (req, res) => {
    const { departamento, fecha } = res.locals.validatedQuery;

    validarFechaClima(fecha);

    const clima = await obtenerClimaService(departamento, fecha);

    return res.status(200).json(clima);
};