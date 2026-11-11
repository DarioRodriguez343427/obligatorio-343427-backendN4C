import "dotenv/config";
import { v2 as cloudinary } from "cloudinary";

const config = {
    cloud_name: process.env.CLOUD_NAME?.trim(),
    api_key: process.env.CLOUD_API_KEY?.trim(),
    api_secret: process.env.CLOUD_API_SECRET?.trim(),
};

if (!config.cloud_name || !config.api_key || !config.api_secret) {
    console.error("Falta una variable de configuración de Cloudinary en el .env");
}

cloudinary.config(config);

export default cloudinary;
