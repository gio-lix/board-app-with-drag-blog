import axiosClient from "./axios";

const boardApi = {
    create: () => axiosClient.post("/boards"),
    getAll: () => axiosClient.get("/boards"),
    updatePosition: (id: any,params: any) => axiosClient.put(`/boards/${id}`, params),
    getOne: (id: string) => axiosClient.get(`/boards/${id}`),

    deleteBoard: (id: any) => axiosClient.delete(`/boards/${id}`),

    getFavorite: () => axiosClient.get(`/boards/favorites`),
    getFavoritePosition: (params: any) => axiosClient.put(`/boards/favorites`, params)
}

export default boardApi