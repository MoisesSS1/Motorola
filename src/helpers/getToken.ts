import cookie from 'js-cookie';

export async function getToken() {

    const token = await cookie.get('token')

    return token

}