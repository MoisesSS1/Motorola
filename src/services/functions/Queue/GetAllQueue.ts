import { api } from "@/services/api";

export async function GetAllQueues(groupId: string) {

    try {
        const res: any = await api.get(`/queue/get/all?groupId=${groupId}`,);

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




export async function GetAllQueuesForUser(groupId: string, type?: "group") {

    try {
        const res: any = await api.get(`/user/get/queue?groupId=${groupId}&&isGroup=${type}`,);

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