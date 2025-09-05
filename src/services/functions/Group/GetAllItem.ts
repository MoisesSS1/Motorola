import { api } from "@/services/api";

export interface IGetAllItems {
    groupId: string,

}

export async function GetAllItems({ groupId }: IGetAllItems) {

    try {
        const res: any = await api.get(`/item/get/all?groupId=${groupId}`,);

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

export async function GetItemsForUserByGroupId({ groupId }: IGetAllItems) {

    try {
        const res: any = await api.get(`/user/get/items?groupId=${groupId}`,);

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