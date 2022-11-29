import queryString from "query-string";
import axios from "axios";


const baseUrl =  "https://drag-drop-app-server.onrender.com/api"


const axiosClient =  axios.create({
    baseURL: baseUrl,
    paramsSerializer: params => queryString.stringify(params)
})

axiosClient.interceptors.request.use(async config => {
    return {
        ...config,
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${localStorage.getItem("token")}`
        }
    }
})



export default axiosClient



