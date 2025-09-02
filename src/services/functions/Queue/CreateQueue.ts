import { api } from "@/services/api";


export interface ICreateQueue {
    name: string,
    groupId: string,
    parentQueueId: string | null,
    description?: string
}
export async function CreateQueue({ description, name, groupId, parentQueueId }: ICreateQueue) {

    try {
        const res: any = await api.post(`/queue/create`, {
            description, name, groupId, parentQueueId
        });

        if (res.status !== 201) {
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