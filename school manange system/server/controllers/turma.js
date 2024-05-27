import Turma from "../db/models/turma.js";

const turmasStatist = async (req, res) => {
    try {
        // Calcular a estatística de aproveitamento para cada classe
        const estatisticas = {};

        // Recuperar todas as classes
        const classes = await Turma.distinct('nome');

        // Para cada classe, calcular o aproveitamento médio
        for (const classe of classes) {
            const turmas = await Turma.find({ nome: classe });
            const totalTurmas = turmas.length;
            let somaNotas = 0;

            // Somar as notas de todas as turmas da classe
            for (const turma of turmas) {
                somaNotas += turma.nota;
            }

            // Calcular o aproveitamento médio
            const aproveitamentoMedio = somaNotas / totalTurmas;

            // Armazenar o aproveitamento médio para a classe
            estatisticas[classe] = aproveitamentoMedio;
        }

        // Enviar a resposta com as estatísticas de aproveitamento
        res.json(estatisticas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao calcular estatísticas' });
    }
}