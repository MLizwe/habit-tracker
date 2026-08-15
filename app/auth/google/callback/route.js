import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { getGoogleUser, updateOrCreateUserInfo } from '../../../../googleOauthUtils'
import { SignJWT } from 'jose'

export async function GET(params) {
    let request = await params;
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');

    const oauthUserInfo = await getGoogleUser(code);
    const createdUser = await updateOrCreateUserInfo(oauthUserInfo);

    const secret = new TextEncoder().encode(process.env.JWT_SECRET)
    const alg = 'HS256'

    const jwt = await new SignJWT({ 
        'userId': createdUser._id.toString(), 
        'email': createdUser.email,
        'name': createdUser.name,
        'picture': createdUser.picture
    })
        .setProtectedHeader({ alg })
        .setExpirationTime('1h')
        .sign(secret)

    const cookieStore = await cookies();
    cookieStore.set('session', jwt, { httpOnly: true })

    redirect('/dashboard')
}