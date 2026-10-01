import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

export const obtenerClienteIA = () => {
    const apiKey = process.env.IA_API_KEY;

    if (!apiKey) {
        throw new Error("Falta configurar IA_API_KEY");
    }

    return new GoogleGenAI({ apiKey });
};