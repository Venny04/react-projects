import Alunos from "../db/models/aluno.js";
import Professor from "../db/models/professor.js";

const getAluno = async (req, res, next) => {

    try {
        const id = req.params.id;
        if (!id) return res.status(404).json({ error: true, message: 'O id nao existe' });

        const aluno = await Alunos.findById(id);

        if (!aluno) return res.status(404).json({ error: true, message: 'Esse aluno  nao foi cadastrado' });


        res.status(200).json({ error: false, aluno });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: true, message: error.message });

    }
}
const getAlunoForSearch = async (req, res) => {
    const { query } = req.query;
    const entidade = req.query.entidade;

    if (!entidade.trim() || !query) {
        return res.status(400).json({ error: true, message: 'Parâmetros inválidos.' });
    }

    let Model;
    if (entidade === 'alunos') {
        Model = Alunos;
    } else if (entidade === 'professores') {
        Model = Professor;
    } else {
        return res.status(400).json({ error: true, message: `${entidade} não encontrado.` });
    }

    try {
        const searchTerms = query.split(" "); // Divide a string de consulta em palavras separadas

        const data = await Promise.all(
            searchTerms.map(async (term) => {
                return await Model.find({ nomeCompleto: { $regex: term, $options: 'i' }, role: { $ne: 'admin' } });
            })
        );

        const flattenedData = data.flat(); // Aplanha o array de arrays de alunos

        if (!flattenedData || flattenedData.length === 0) {
            return res.status(404).json({ error: true, message: `${entidade} não encontrado.` });
        }

        res.status(200).json({ error: false, data: flattenedData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: true, message: 'Erro ao pesquisar alunos.' });
    }
}
export { getAluno, getAlunoForSearch }