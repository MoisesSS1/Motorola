import { api } from "@/services/api";


export interface ICreateUser {
    login: string,
    name: string,
    password: string,
    permissions: ['see', 'delegate', 'comment', 'create', 'close'],//pode ver chamados, delegar,comentar,criar e concluir
    groupsId: string[]//array de id dos setores que esse usuário faz parte
}
export async function CreateUserCall({ groupsId, login, name, password, permissions }: ICreateUser) {

    try {
        const res: any = await api.post(`/user/create`, {
            groupsId, login, name, password, permissions
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