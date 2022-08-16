import axiosClient from "./axios";

const boardApi = {
    create: () => axiosClient.post("/boards"),
    getAll: () => axiosClient.get("/boards"),
    updatePosition: (id: any,params: any) => axiosClient.put(`/boards/${id}`, params),
    getOne: (id: any) => axiosClient.get(`/boards/${id}`)
}

export default boardApi