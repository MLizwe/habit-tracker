import { connectToDB } from '@/api/db';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { suggestHabits } from '@/lib/ai/suggest-habits';

export async function POST(request) {
    const cookieStore = await cookies();
    const session = cookieStore.get('session');

    if (!session) {
        return Response.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(session.value, secret);

    const { db } = await connectToDB();
    const habits = await db.collection('habits')
        .find({ userId: payload.userId })
        .toArray();

    const suggestions = await suggestHabits(habits);

    return Response.json(suggestions);
}