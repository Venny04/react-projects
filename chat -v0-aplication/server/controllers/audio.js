import Audio from "../db/models/audio.js";

const uploadAudio = async (req, res, next) => {
    try {
        const { originalname, path } = req.file;

        // Salvar os detalhes do áudio no MongoDB
        const audio = new Audio({ filename: originalname, path });
        audio.save()
            .then(() => {
                res.status(200).json({ message: 'Áudio enviado e armazenado com sucesso!' });
            })
            .catch((error) => {
                console.error('Erro ao salvar o áudio no MongoDB:', error);
                res.status(500).json({ error: 'Erro ao salvar o áudio no servidor' });
            });
    } catch (error) {
        res.status(500).json({ error: "Erro do sistema" });
        console.log(error)
    }
}




export { uploadAudio };