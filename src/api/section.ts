import axiosClient from "./axios";

const sectionApi = {
    create: (boardId: string) => axiosClient.post(`/boards/${boardId}/sections`),

    deleteSection: (boardId: string, sectionId: string) =>
        axiosClient.delete(`/boards/${boardId}/sections/${sectionId}`),

    updateSection: (boardId: string, sectionId: string, params: any) =>
        axiosClient.put(`/boards/${boardId}/sections/${sectionId}`, params)
}

export default sectionApi

