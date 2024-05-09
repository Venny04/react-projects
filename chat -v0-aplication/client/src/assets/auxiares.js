const [mediaRecorder, setMediaRecorder] = useState(null);
const [audioChunks, setAudioChunks] = useState([]);
const [audioBlob, setAudioBlob] = useState(null);

const startRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then((stream) => {
            const recorder = new MediaRecorder(stream);
            setMediaRecorder(recorder);

            const chunks = [];
            recorder.addEventListener('dataavailable', (event) => {
                chunks.push(event.data);
            });

            recorder.start();

            setAudioChunks(chunks);
        })
        .catch((error) => {
            console.error('Erro ao acessar o microfone:', error);
        });
};
const stopRecording = () => {
    mediaRecorder.stop();
    mediaRecorder.addEventListener('stop', () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        setAudioBlob(audioBlob);

        // Enviar o áudio para o servidor
        const formData = new FormData();
        formData.append('audio', audioBlob);
        console.log(formData);

        axios.post('http://localhost:8080-/api/v1/audio/upload-audio', formData)
            .then((response) => {
                console.log(response.data.message);
            })
    });

};


