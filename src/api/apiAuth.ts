import axiosClient from "./axios";

const authApi = {
    signUp: (params: any) => axiosClient.post("/signup", params),
    login: (params: any) => axiosClient.post("/login", params),
    verifyToken: () => axiosClient.get("/auth/me")
}

export default authApi