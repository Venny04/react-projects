import axios from "axios";

export const fetchAPIdata = async (url, method, content, token) => {
    let headersList = {
        "Accept": "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)", "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
    }
    console.log(url, method, content)
    let bodyContent = JSON.stringify({ ...content });
    let reqOptions = {
        url,
        method,
        headers: headersList,
        data: bodyContent
    }

    let response = await axios.request(reqOptions);
    return response.data

}