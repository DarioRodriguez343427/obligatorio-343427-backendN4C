import mongoose from "mongoose";

const disciplinaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  descripcion: {
    type: String,
    trim: true
  }
});

disciplinaSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id;

    delete ret._id;
    delete ret.__v;

    return ret;
  }
});

const Disciplina = mongoose.model("disciplinas", disciplinaSchema);

export default Disciplina;
