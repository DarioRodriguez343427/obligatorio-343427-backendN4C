import { departamentos } from "../../utils/departamentos.js";
import { constructorError } from "../../utils/contructor.error.js";

export const obtenerClimaService = async (departamento, fecha) => {
    //comprobamo que sea una clave del objeto
    if (!Object.hasOwn(departamentos, departamento)) {
        throw constructorError("Departamento no válido", 400);
    }

    const ubicacion = departamentos[departamento];

    const url = new URL("https://api.open-meteo.com/v1/forecast");

    url.searchParams.set("latitude", ubicacion.latitud);
    url.searchParams.set("longitude", ubicacion.longitud);
    url.searchParams.set("start_date", fecha);
    url.searchParams.set("end_date", fecha);
    url.searchParams.set("timezone", "America/Montevideo");
    url.searchParams.set(
        "daily",
        "temperature_2m_max,temperature_2m_min,precipitation_probability_max,wind_speed_10m_max"
    );

    const respuesta = await fetch(url, {
        signal: AbortSignal.timeout(10000)
    });

    if (!respuesta.ok) {
        throw constructorError("No se pudo consultar el pronóstico",502);
    }

    const datos = await respuesta.json();

    if (!datos.daily?.time?.length) {
        throw constructorError("No hay pronóstico disponible para esa fecha",502);
    }

    return {
        departamento,
        capital: ubicacion.capital,
        fecha: datos.daily.time[0],
        temperaturaMaxima: datos.daily.temperature_2m_max[0],
        temperaturaMinima: datos.daily.temperature_2m_min[0],
        probabilidadPrecipitacion:
            datos.daily.precipitation_probability_max[0],
        vientoMaximo: datos.daily.wind_speed_10m_max[0],
        unidades: {
            temperatura: datos.daily_units.temperature_2m_max,
            probabilidadPrecipitacion:
                datos.daily_units.precipitation_probability_max,
            viento: datos.daily_units.wind_speed_10m_max
        },
        zonaHoraria: datos.timezone,
        fuente: "Open-Meteo"
    };
};