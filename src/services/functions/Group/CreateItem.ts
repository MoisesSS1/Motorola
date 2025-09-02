import { api } from "@/services/api";

export interface ICreateItem {
    name: string;
    groupId?: string,
    attributes: Record<string, any>; // objeto dinâmico com chave → valor
}

export async function CreateItemCall({ attributes, name, groupId }: ICreateItem) {

    try {
        const res: any = await api.post(`/item/create`, {
            attributes,
            name,
            groupId
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