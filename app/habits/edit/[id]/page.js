import { connectToDB } from '@/api/db';
import { ObjectId } from 'mongodb';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export default async function EditHabit({ params }) {
    const { id } = await params;
    const { db } = await connectToDB();
    const habit = await db.collection('habits').findOne({ _id: new ObjectId(id) });

    async function updateHabit(formData) {
        "use server"
        const { db } = await connectToDB();
        await db.collection('habits').updateOne(
            { _id: new ObjectId(id) },
            { $set: { name: formData.get("name"), category: formData.get("category") } }
        )
        revalidatePath('/dashboard');
        redirect('/dashboard');
    }

    return (
        <div className="w-full flex flex-col gap-6">
            <h1 className="text-3xl font-bold text-white">Edit Habit</h1>
            <form action={updateHabit} className="flex flex-col gap-4">
                <input type="text" name="name" defaultValue={habit.name}
                    className="bg-gray-800 text-white px-4 py-3 rounded-lg outline-none" />
                <select name="category" defaultValue={habit.category}
                    className="bg-gray-800 text-white px-4 py-3 rounded-lg">
                    <option>Health</option>
                    <option>Learning</option>
                    <option>Fitness</option>
                </select>
                <button type="submit"
                    className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors">
                    Update Habit
                </button>
            </form>
        </div>
    );
}