import { connectToDB } from '../../db';
import { ObjectId } from 'mongodb';

export async function DELETE(request, { params }) {
    const { db } = await connectToDB();
    const { id } = await params;
    await db.collection('habits').deleteOne({ _id: new ObjectId(id) });
    return Response.json({ message: 'Habit deleted' });
}

export async function PUT(request, { params }) {
    const { db } = await connectToDB();
    const { id } = await params;
    const data = await request.json();
    await db.collection('habits').updateOne(
        { _id: new ObjectId(id) },
        { $set: { name: data.name, category: data.category } }
    );
    return Response.json({ message: 'Habit updated' });
}