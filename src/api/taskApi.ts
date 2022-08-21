import axiosClient from "./axios";

const taskApi = {
    create: (boardId: any, params: any) => axiosClient.post(`/boards/${boardId}/tasks`,params),
    updatePosition: (boardId: string, params: any) =>
        axiosClient.put(`/boards/${boardId}/tasks/update-position`, params),
    deleteTask: (boardId: string, taskId: string) =>
        axiosClient.delete(`/boards/${boardId}/tasks/${taskId}`),
    updateTask: (boardId: string, taskId: string, params: any) =>
        axiosClient.put(`/boards/${boardId}/tasks/${taskId}`, params),
}

export default taskApi