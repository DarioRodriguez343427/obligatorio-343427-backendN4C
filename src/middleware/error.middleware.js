export const middlewareErrores = (err, req, res, next) => {
    if (err.isJoi) {
        return res.status(400).json({
            message: 'Datos inválidos',
            errors: err.details.map((detail) => ({
                field: detail.path.join('.'),
                message: detail.message
            }))
        });
    }

    //no lo hice con common en schema, en este middleware ya controlo el error desde la app, junto con el errores generico de arriba.
    // cada vez que el id no sea del formato que pide mongo retornamos este 400
    if (err.name === 'CastError' && err.kind === 'ObjectId') {
        return res.status(400).json({
        message: 'El ID proporcionado no es válido'
        });
    }

    return res.status(err.status || 500).json({
        message: err.publicMessage || err.message || 'Error interno del servidor'
    });
};
