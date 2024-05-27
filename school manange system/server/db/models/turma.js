import mongoose from "mongoose";

const { Schema, model } = mongoose;

const turmaSchema = new Schema(
    {
        nome: {
            type: String,
            required: true,
            unique: true
        },
        nivelAcademico: {
            type: Number,
            required: true
        },

        turno: String,
        professores: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Professores',
            }
        ],
        alunos: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Alunos',
            }
        ]
    },
    { timestamps: true }
);
const Turma = model("Turmas", turmaSchema);

export default Turma;