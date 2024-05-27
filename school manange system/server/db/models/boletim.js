import mongoose from "mongoose";

const { Schema, model } = mongoose;

const boletimSchema = new Schema({
    alunoRef: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Alunos',
        unique: true,
        required: true
    },
    nivelAcademico: {
        type: Number,
        required: true
    },
    disciplinas: [
        {
            nome: {
                type: String,
                required: true,

            },
            notas: []
        },
    ]
}, { timestamps: true });

const Boletim = model('Boletins', boletimSchema);

export default Boletim;