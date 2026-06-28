import { connectToDB } from '../../db';
import { ObjectId } from 'mongodb';

export async function DELETE(request, { params }) {
    const { db } = await connectToDB();
    const { id } = await params;

    await db.collection('habits').deleteOne({ _id: new ObjectId(id) });

    return Response.json({ message: 'Habit deleted' });
}