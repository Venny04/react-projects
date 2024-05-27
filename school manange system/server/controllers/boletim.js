import Boletim from "../db/models/boletim.js"

const getAlunoBoletim = async (req, res, next) => {
    const alunoRef = req.params.alunoId;
    if (!alunoRef) return res.status(404).json({ error: true, message: "Precisamos do id do aluno para achar o seu boletim." });


    try {
        const boletim = await Boletim.findOne({ alunoRef });

        if (!boletim) res.status(404).json({ error: true, message: 'Boletim não encotrado.' });


        res.status(200).json({ error: false, data: boletim });
    } catch (error) {
        res.status(500).json({ error: true, message: 'Erro no servidor' })
        console.log(error);
    }

}
const updateAlunoBoletim = async (req, res, next) => {
    const alunoRef = req.params.alunoId;
    if (!alunoRef) return res.status(404).json({ error: true, message: "Precisamos do id do aluno para achar o seu boletim." });
    const { nome, notas } = req.body;
    try {
        if (!nome || !notas) return;

        const boletim = await Boletim.findOne({ alunoRef });

        if (!boletim) res.status(404).json({ error: true, message: 'Boletim não encontrado.' });
        boletim.disciplinas.map(async (obj) => {
            if (obj.nome.trim() == nome.trim()) {
                obj.notas = notas;
                await boletim.save()
            }
        })

        res.status(200).json({ error: false, data: boletim });
    } catch (error) {
        res.status(500).json({ error: true, message: 'Erro no servidor' });
        console.log(error);
    }

}


export { getAlunoBoletim, updateAlunoBoletim }