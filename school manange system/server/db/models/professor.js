import mongoose from 'mongoose';


const { Schema, model } = mongoose
const professorSchema = new Schema({
    nomeCompleto: {
        type: String,
        required: true
    },

    dataDeNascimento: {
        type: Date,
        required: true
    },
    genero: {
        type: String,
        required: true
    },
    numeroDoTelefone: {
        type: Number,
        required: true
    },
    senha: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    numeroDoBI: {
        type: String,
        required: true,
        unique: true
    },
    cidade: {
        type: String,
        required: true
    },
    municipio: {
        type: String,
        required: true
    },
    provincia: {
        type: String,
        required: true
    },


    cargo: [
        {
            type: String,
            required: true
        }
    ],
    turno: {
        type: String,
        required: true
    },
    turma: {
        type: String,
        required: true
    },
    localDeResidencia: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['professor', 'admin'],
        default: 'professor'
    }

}, { timestamps: true });

const Professor = model('Professores', professorSchema);

export default Professor;