import mongoose from "mongoose";

const { Schema, model } = mongoose;

const AlunosSchema = new Schema(
    {
        nomeCompleto: {
            type: String,
            required: true
        },
        genero: {
            type: String,
            required: true
        },


        numeroDoTelefone: {
            type: Number,
            required: true,
            unique: true
        },
        numeroDoBI: {
            type: String,
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
        dataDeNascimento: {
            type: Date,
            required: true
        },
        nomeDoPai: {
            type: String,
            required: true
        },
        nomeDaMae: {
            type: String,
            required: true
        },
        nomeDoEncarregado: {
            type: String,
            required: true
        },

        nivelAcademico: {
            type: Number,
            required: true
        },
        turma: {
            type: String,
            required: true
        },
        turno: {
            type: String,
            required: true
        },
        nivelDeParentesco: {
            type: String,
            required: true
        },
        profissao: {
            type: String,
            required: true
        },
        localDeResidencia: {
            type: String,
            required: true
        },

    }, { timestamps: true }
);

const Alunos = model("Alunos", AlunosSchema);

export default Alunos;