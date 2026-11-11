import cloudinary from "../config/cloudinary.config.js";
import { constructorError } from "../../utils/contructor.error.js";

export const createImage = (file) => {
  if (typeof file !== "string" || !/^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/]+={0,2}$/.test(file)) {
    throw constructorError("La foto debe ser una imagen JPEG, PNG o WebP en Base64", 400);
  }
  if (Buffer.from(file.split(",")[1], "base64").length > 2 * 1024 * 1024) {
    throw constructorError("La foto no puede superar los 2 MiB", 400);
  }
  const folder = process.env.CLOUD_FOLDER?.trim() || "Usuarios";

  return cloudinary.uploader.upload(file, {
    folder,
  });
};

export const deleteImage = async (publicId) => {
  const resultado = await cloudinary.uploader.destroy(publicId, { invalidate: true });
  if (!["ok", "not found"].includes(resultado.result)) {
    throw constructorError("No se pudo eliminar la foto de Cloudinary", 502);
  }
  return resultado;
};
