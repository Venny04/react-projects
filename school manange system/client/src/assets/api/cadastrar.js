import axios from "axios";

export const cadastrar = async () => {



    const headersList = {
        "Accept": "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjQzZDQzN2QyMzg2NWY1NTYwZDE3OTUiLCJpYXQiOjE3MTU5NzEyNDh9.KxM7BMp5oDIEivDg9pT1BlXvhW_s6VWGnLc70ieWkHw"
    };

    const formData = new FormData();
    formData.append("file", fs.createReadStream(""));
    formData.append("nomeCompleto", "aluno 5");
    formData.append("genero", "m");
    formData.append("residencia", "luanda");
    formData.append("numeroDoTelefone", "5885444383");
    formData.append("localDeResidencia", "luanda");
    formData.append("localDeNascimento[cidade]", "luanda");
    formData.append("localDeNascimento[municipio]", "luanda");
    formData.append("localDeNascimento[provincia]", "kuanda");
    formData.append("numeroDoBI", "34567hgf345678");
    formData.append("dataDeNascimento", "2006-05-26");
    formData.append("nomeDoPai", "pai 4");
    formData.append("nomeDaMae", "mae 4");
    formData.append("nomeDoEncarregado", "encarregado 5");
    formData.append("nivelAcademico", "8");
    formData.append("turma", "7.1");
    formData.append("turno", "tarde");
    formData.append("nivelDeParentesco", "pai 5");
    formData.append("profissao", "trabalho");
    formData.append("localDeTrabalho", "trabalho 5");

    const reqOptions = {
        url: "http://localhost:8080/api/v1/admin/aluno/create",
        method: "POST",
        headers: headersList,
        data: formData,
    };

    const response = await axios.request(reqOptions);
    console.log(response.data);
}