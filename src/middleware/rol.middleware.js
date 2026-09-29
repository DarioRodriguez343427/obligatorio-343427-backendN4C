import { Role } from "../constants/role.constants.js";
import { constructorError } from "../utils/contructor.error.js";

const validateRolMiddleware = (role) => {
    return (req, res, next) => {
        const cliente = req.user;
        const rolCliente = cliente.role;

        if (role !== rolCliente) {
            const errorSinRol = constructorError(`No tiene permisos, necesita el rol de ${role} para realizar esta operacion`, 403)
            next(errorSinRol);
        }
        next();
    }
}


export const validateRolAdminMiddleware = validateRolMiddleware(Role.admin);
export const validateRolClienteMiddleware = validateRolMiddleware(Role.cliente);