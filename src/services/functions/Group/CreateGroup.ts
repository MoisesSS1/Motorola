import { api } from "@/services/api";


export interface ICreateGroup {
    name: string,
    description: string
}
export async function CreateGroupCall({ description, name }: ICreateGroup) {

    try {
        const res: any = await api.post(`/admin/group/create`, {
            description,
            name
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