import axios from "axios";




export const fecthAPI = async (url, method, data, token, content) => {
    let headersList = {
        "Accept": "*/*",
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
    }

    let bodyContent = JSON.stringify({
        content,
        ...data
    });

    let reqOptions = {
        url,
        method,
        headers: headersList,
        data: bodyContent,
    }


    let response = await axios.request(reqOptions);
    return response.data;

}