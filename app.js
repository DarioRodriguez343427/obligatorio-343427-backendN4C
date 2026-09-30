import express from "express";
import { middlewareErrores } from "./src/middleware/error.middleware.js";
import apiRoutes from "./src/v1/routes/index.js";
import "dotenv/config";
import { connectMongo } from "./src/v1/config/mongo.config.js";

await connectMongo();

const app = express();

app.use(express.json());

app.use("/api", apiRoutes);

//cualquier error que suceda en cualquier ruta de la api cae aca.
app.use(middlewareErrores);

app.listen(process.env.PORT, () => {
    console.log(`Servidor escuchando en el puerto ${process.env.PORT}`);
})

export default app;
