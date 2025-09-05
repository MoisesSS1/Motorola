import cookie from 'js-cookie';

export async function saveToken(token: string, id: string, type?: string) {
    await cookie.set('token', token)
    await cookie.set('id', id)
    if (type) {
        await cookie.set('type', type)
    }
    return
}