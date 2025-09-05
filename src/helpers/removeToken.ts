import cookie from 'js-cookie';

export async function removeToken() {

    await cookie.remove('token')
    await cookie.remove('id')
    await cookie.remove('type')
    return

}