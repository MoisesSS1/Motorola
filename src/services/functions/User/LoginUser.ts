import { saveToken } from "@/helpers/saveToken";
import { api } from "../../api";

export interface LoginDTO {
    login: string,
    password: string
}

export async function loginUser({ login, password }: LoginDTO) {

    try {
        const res: any = await api.post(`/user/login`, {
            password,
            login,
        });

        if (res.status !== 200) {
            return {
                type: "error",
                message: res.data.message,
            };
        }

        await saveToken(res.data.token, res.data.id, "user")
        return {
            type: "success",
            data: res.data,
        };
    } catch (error: any) {
        return {
            type: "error",
            message: error.message || "Erro ao fazer login",
        };
    }

}