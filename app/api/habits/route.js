import { connectToDB } from '../db';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

export async function GET() {
    const { db } = await connectToDB();
    const habits = await db.collection('habits').find({}).toArray();
    return Response.json(habits);
}

export async function POST(request) {
    const { db } = await connectToDB();
    const data = await request.json();

    const cookieStore = await cookies();
    const session = cookieStore.get('session');
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(session.value, secret);

    await db.collection('habits').insertOne({
        name: data.name,
        streak: 0,
        category: data.category,
        userId: payload.userId
    });

    return Response.json({ message: 'Habit created' });
}