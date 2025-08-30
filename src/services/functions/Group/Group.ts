import { api } from "@/services/api";


export async function GetAllGroups() {
    try {
        const res: any = await api.get(`/groups/get/all`);

        if (res.status !== 200) {
            return {
                type: "error",
                message: res.data.message,
            };
        }

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