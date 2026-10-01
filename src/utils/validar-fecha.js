import { constructorError } from "./contructor.error.js";

export const validarFechaClima = (fecha) => {
    const fechaElegida = new Date(`${fecha}T00:00:00Z`);

    if (Number.isNaN(fechaElegida.getTime()) ||fechaElegida.toISOString().slice(0, 10) !== fecha) {
        throw constructorError("La fecha no es válida", 400);
    }

    const hoy = new Intl.DateTimeFormat("en-CA", {
        timeZone: "America/Montevideo",
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    }).format(new Date());

    const fechaLimite = new Date(`${hoy}T00:00:00Z`);
    fechaLimite.setUTCDate(fechaLimite.getUTCDate() + 15);

    const ultimoDia = fechaLimite.toISOString().slice(0, 10);

    if (fecha < hoy || fecha > ultimoDia) {
        throw constructorError("La fecha debe ser hoy o uno de los próximos 15 días",400);
    }
};