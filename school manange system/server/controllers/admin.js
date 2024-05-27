import shortid from "shortid";
import bcrypt from 'bcrypt';
import { isAdmin } from "../isAdmin.js";
import Professor from "../db/models/professor.js";
import Alunos from "../db/models/aluno.js";
import Turma from "../db/models/turma.js";
import Boletim from "../db/models/boletim.js";




// Estatisticas
const getSchoolEtatisticas = async (req, res, next) => {
    try {
        const entidade = req.query.entidade; // 'aluno' ou 'professor'
        if (!entidade) return;

        const mesesDoAno = [
            'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
            'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
        ];

        const estatisticas = [];

        // Inicializa o array de estatísticas com todos os meses do ano
        mesesDoAno.forEach((mes) => {
            estatisticas.push({ month: mes, seoul: 0 });
        });

        let Model;

        if (entidade === 'alunos') {
            Model = Alunos;
        } else if (entidade === 'professores') {
            Model = Professor;
        } else {
            res.status(400).json({ error: true, message: `${entidade} não encontrados.` });
            return;
        }

        // Busca todos os alunos ou professores no banco de dados usando o Mongoose
        const datas = await Model.find();
        if (!datas) {
            return res.status(404).json({ error: true, message: `... não encontrados.` });
        };


        // Conta a quantidade de entidades por mês
        datas?.forEach((data) => {
            const mesCadastro = data?.createdAt?.getMonth();
            estatisticas[mesCadastro].seoul++;
        });

        // Adiciona zero para os meses sem entidades cadastradas
        estatisticas.forEach((estatistica) => {
            if (estatistica?.seoul === 0) {
                estatistica.seoul = 0;
            }
        });

        res.status(200).json({ error: false, estatisticas });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: true, message: "Erro no servidor" });
    }
}

// TotalDocs 
const getSchoolTotalDocs = async (req, res, next) => {
    try {
        const alunos = await Alunos.countDocuments();
        const turma = await Turma.countDocuments();
        const professor = await Professor.countDocuments();

        const total = Number(alunos + professor);

        res.status(200).json({ error: false, total, alunos, turma, professor });

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: true, message: error.message });
    }
}

// Alunos
const getAlunos = async (req, res) => {
    try {
        let Model
        const entidade = req.query.entidade; // 'aluno' ou 'professor'
        if (!entidade.trim()) return;

        if (entidade === 'alunos') {
            Model = Alunos;
        } else if (entidade === 'professores') {
            Model = Professor;
        } else {
            res.status(400).json({ error: true, message: `${entidade} não encontrados.` });
            return;
        }
        const data = await Model.find({ 'role': { $ne: 'admin' } })
            .sort({ nomeCompleto: 1 })
            .exec();

        if (!data || data.length === 0) {
            return res.status(404).json({ erro: true, message: "Nenhum aluno encontrado." });
        }
        // const { senha, ...doc } = data._doc;
        // console.log(senha)

        res.status(200).json({ error: false, data });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 500, message: error.message });
    }
}
const getUser = async (req, res) => {
    try {
        let Model
        const entidade = req.query.entidade;
        const id = req.params.id;

        if (!entidade.trim() || !id) return;

        if (entidade === 'alunos') {
            Model = Alunos;
        } else if (entidade === 'professores') {
            Model = Professor;
        } else {
            res.status(400).json({ error: true, message: `${entidade} não encontrados.` });
            return;
        }

        const data = await Model.findById(id);

        if (!data || data.length === 0) {
            return res.status(404).json({ erro: true, message: `Nenhum ${entidade} encontrado.` });
        }
        // const { senha, ...doc } = data._doc;
        // console.log(senha)

        res.status(200).json({ error: false, data });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 500, message: error.message });
    }
}

const getTurma = async (req, res) => {
    try {
        const nome = req.query.nome;

        const turma = await Turma.findOne({ nome, 'role': { $ne: 'admin' } }).populate('alunos').sort({ nomeCompleto: 1 }).populate('professores')
            .exec();

        if (!turma || turma.length === 0) {
            return res.status(404).json({ erro: true, message: "Nenhum Turma foi encontrada." });
        }
        // const { senha, ...doc } = turma._doc;
        // console.log(senha)

        res.status(200).json({ error: false, turma });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 500, message: error.message });
    }
}

// criar alunos
const createAluno = async (req, res, next) => {
    try {
        const isadmin = isAdmin(req, res);

        if (!isadmin) {
            return res.status(403).json({ error: true, message: 'Acesso não permitido.' });
        }
        if (isadmin === true) {
            const { dataDeNascimento } = req.body;

            const aluno = await Alunos.create({
                dataDeNascimento: new Date(dataDeNascimento),
                ...req.body
            });

            if (!aluno) {
                return res.status(500).json({ error: true, message: 'Falha ao cadastrar um novo aluno.' });
            }
            const boletim = await Boletim.create({
                alunoRef: aluno?._id,
                nivelAcademico: aluno?.nivelAcademico,
                disciplinas: [
                    {
                        nome: 'L. Portuguesa',
                        notas: [0, 0, 0]
                    },
                    {
                        nome: 'Biologia',
                        notas: [0, 0, 0]
                    },
                    {
                        nome: 'L. Ingles',
                        notas: [0, 0, 0]
                    },
                    {
                        nome: 'Quimica',
                        notas: [0, 0, 0]
                    },
                    {
                        nome: 'E.V.P',
                        notas: [0, 0, 0]
                    },
                    {
                        nome: 'Geografia',
                        notas: [0, 0, 0]
                    },
                    {
                        nome: '  E.M.C',
                        notas: [0, 0, 0]
                    },
                    {
                        nome: 'Ed. Laboral',
                        notas: [0, 0, 0]
                    },
                    {
                        nome: 'Matemática',
                        notas: [0, 0, 0]
                    },
                    {
                        nome: 'História',
                        notas: [0, 0, 0]
                    },
                    {
                        nome: 'Empreededorismo',
                        notas: [0, 0, 0]
                    },
                    {
                        nome: 'Fisica',
                        notas: [0, 0, 0]
                    },

                ],
            });

            if (!boletim) {
                return res.status(401).json({ error: false, message: "Falha ao criar o boletim" });
            }

            let turma = await Turma.findOne({
                nome: aluno.turma,
                nivelAcademico: aluno?.nivelAcademico,
            });
            if (!turma?.alunos?.includes(aluno._id)) {
                turma?.alunos?.push(aluno?._id);
                await turma?.save();
            }
            if (!turma) {
                turma = await Turma.create({
                    nome: aluno?.turma,
                    turno: aluno?.turno,
                    nivelAcademico: Number(aluno?.nivelAcademico),
                    alunos: [aluno?._id]
                });
            }

            return res.status(200).json({ error: false, aluno, boletim });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 500, message: error.message });
    }
};
const updateAlunosInfo = async (req, res, next) => {

    const isadmin = isAdmin(req, res);
    if (!isadmin) {
        return res.status(403).json({ error: true, message: 'Acesso não permitido.' });
    }

    const entidade = req.query.entidade;
    const id = req.params.id;

    if (!entidade.trim() || !id) {
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
        const data = await Model.findByIdAndUpdate(id, { $set: { ...req.body } }, { new: true });

        if (!data) {
            return res.status(404).json({ error: true, message: `${entidade} não encontrado.` });
        }

        res.status(200).json({ error: false, data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: true, message: 'Erro ao atualizar entidade.' });
    }
}

const deleteEntidade = async (req, res, next) => {
    try {
        const isadmin = isAdmin(req, res);
        if (!isadmin) {
            return res.status(403).json({ error: true, message: 'Acesso não permitido.' });
        }

        let Model
        const entidade = req.query.entidade;
        const id = req.params.id;


        if (!entidade.trim() || !id) return;

        if (entidade === 'alunos') {
            Model = Alunos;
        } else if (entidade === 'professores') {
            Model = Professor;
        } else {
            res.status(400).json({ error: true, message: `${entidade} não encontrados.` });
            return;
        }

        const data = await Model.findByIdAndDelete(id);

        if (!data || data.length === 0) {
            return res.status(404).json({ erro: true, message: `Nenhum ${entidade} encontrado.` });
        }


        res.status(200).json({ error: false, message: `${entidade} apagada com sucesso.` });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: true, message: 'Erro do servidor' });
    }
}
// criar professores
const createAProfessor = async (req, res, next) => {
    try {
        const isadmin = isAdmin(req, res);

        if (!isadmin) return res.status(403).json({ error: true, message: 'Acesso não permitido.' });;

        if (isadmin === true) {

            const codigo = shortid.generate();
            const senhaCriptografada = await bcrypt.hash(codigo, 10);

            const professor = await Professor.create({
                senha: senhaCriptografada,
                ...req.body
            });
            if (!professor) return res.status(500).json({ error: true, message: 'falha ao cadastrar um novo professor.' });

            let turma = await Turma.findOne({
                nome: professor?.turma,
            });

            const nivelAcademico = Number(professor.turma[0]);

            if (!turma?.professores?.includes(professor._id)) {
                turma?.professores?.push(professor?._id);
                await turma?.save();
            }
            if (!turma) {
                turma = await Turma.create({
                    nome: professor?.turma,
                    turno: professor?.turno,
                    nivelAcademico,
                    professores: [professor?._id]
                });
            }
            console.log(codigo, professor.email);
            console.log(codigo, professor.email);
            const { senha, ...doc } = professor._doc;
            return res.status(200).json({ error: false, user: doc, senha: codigo });

        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: true, message: 'Erro do servidor' });
    }
}

const getTurmasLength = async (req, res, next) => {
    try {
        const turmas = await Turma.find().sort({ nome: 1 });
        if (!turmas) return res.status(404).json({ error: true, message: "Sem nenhuma turma" });

        res.status(200).json({ error: false, turmas });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: true, message: 'Erro no servidor' })
    }
}

const getAlunoBoletim = async (req, res, next) => {
    try {
        const id = req.params.id;

        const boletim = await Boletim.findOne({ alunoRef: id })

        if (!boletim) return res.status(404).json({ error: true, message: "Esse aluno nao tem um boletim" });

        res.status(200).json({ error: false, boletim });

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: true, message: 'Erro no servidor' })
    }
}

export {
    getUser,
    getTurma,
    getAlunoBoletim,
    getAlunos,
    updateAlunosInfo,
    createAluno,
    getTurmasLength,
    createAProfessor,
    getSchoolTotalDocs,
    deleteEntidade,
    getSchoolEtatisticas
}