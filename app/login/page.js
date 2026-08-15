import { getGoogleOauthUrl } from '../../googleOauthUtils';
import { redirect } from 'next/navigation';

export default async function LoginPage() {
    async function login(formData) {
        "use server"
        const redirectURL = getGoogleOauthUrl();
        redirect(redirectURL);
    }

    return (
        <div className="w-full flex flex-col items-center gap-8 text-center py-20">
            <h1 className="text-3xl font-bold text-white">Sign In</h1>
            <p className="text-gray-400">Sign in to track your habits</p>
            <form action={login}>
                <button type="submit" className="bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                    Login with Google
                </button>
            </form>
        </div>
    );
}