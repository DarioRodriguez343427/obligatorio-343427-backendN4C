import mongoose from "mongoose";

const claseSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  descripcion: {
    type: String,
    required: true,
    trim: true
  },
  disciplina: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "disciplinas",
    required: true
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "usuarios",
    required: true
  },
  imagen: {
    type: String,
    trim: true
  }
});

claseSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id;

    delete ret._id;
    delete ret.__v;

    return ret;
  }
});

const Clase = mongoose.model("Clase", claseSchema);

export default Clase;
