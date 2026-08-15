import { connectToDB } from './app/api/db';

export function getGoogleOauthUrl() {
    const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
    const options = {
        redirect_uri: process.env.GOOGLE_REDIRECT_URI,
        client_id: process.env.GOOGLE_CLIENT_ID,
        access_type: 'offline',
        response_type: 'code',
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email',
        ].join(' '),
    };
    const qs = new URLSearchParams(options);
    return `${rootUrl}?${qs.toString()}`;
}

export async function getGoogleUser(code) {
    const tokenUrl = 'https://oauth2.googleapis.com/token';
    const values = {
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI,
        grant_type: 'authorization_code',
    };
    const response = await fetch(tokenUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(values),
    });
    const tokens = await response.json();
    const userInfoResponse = await fetch(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`,
        {
            headers: { Authorization: `Bearer ${tokens.id_token}` },
        }
    );
    return userInfoResponse.json();
}

export async function updateOrCreateUserInfo(oauthUserInfo) {
    const { db } = await connectToDB();
    let user = await db.collection('users').findOne({ email: oauthUserInfo.email });
    if (!user) {
        await db.collection('users').insertOne({
            email: oauthUserInfo.email,
            name: oauthUserInfo.name,
            picture: oauthUserInfo.picture,
        });
        user = await db.collection('users').findOne({ email: oauthUserInfo.email });
    }
    return user;
}