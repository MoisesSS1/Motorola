import { api } from "@/services/api";

export interface ICreateTicket {
    groupId: string,
    itemId: string,
    name: string,
    notes: string,
    queueId: string,
    externalTickets?: { key: string, value: string }[]
}

export async function CreateTicketCall({ groupId, itemId, name, notes, queueId, externalTickets }: ICreateTicket) {

    try {
        const res: any = await api.post(`/ticket/create`, {
            groupId, itemId, name, notes, queueId, externalTickets
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