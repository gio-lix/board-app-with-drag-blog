import authApi from "../api/apiAuth";

const authUtils = {
    isAuthentication: async () => {
        const token = localStorage.getItem("token")
        if (!token) return false

        try {
            const {data} = await authApi.verifyToken()
            return data
        } catch (err) {
            return  false
        }
    }
}

export default authUtils