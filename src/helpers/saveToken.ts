import cookie from 'js-cookie';

export async function saveToken(token: string, id: string) {
    await cookie.set('token', token)
    await cookie.set('id', id)
    return
}