import { connectToDB } from '../db';

export async function GET() {
    const { db } = await connectToDB();
    const habits = await db.collection('habits').find({}).toArray();
    return Response.json(habits);
}

export async function POST(request) {
    const { db } = await connectToDB();
    const data = await request.json();
    
    await db.collection('habits').insertOne({
        name: data.name,
        streak: 0,
        category: data.category
    });

    return Response.json({ message: 'Habit created' });
}