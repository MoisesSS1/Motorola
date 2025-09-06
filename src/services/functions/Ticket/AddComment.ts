import { api } from "@/services/api";

export interface IAddTicket {
    idTicket: string,
    notes: string,
}

export async function AddTicketRequest({ idTicket, notes }: IAddTicket) {

    try {
        const res: any = await api.post(`/ticket/addcomment`, {
            idTicket, notes
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