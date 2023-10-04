import { revalidatePath } from 'next/cache';
import ModalWrapper from '..';
import TaskHandler from '../../../../db/modeling/task';

type Props = {
    projectId: string;
    path: string;
};

export default function AddTaskModal({ projectId, path }: Props) {
    async function handleSubmit(formData: FormData): Promise<void> {
        'use server';

        const name = formData.get('name');
        const price = formData.get('price');
        const desc = formData.get('description');
        const task = await TaskHandler.create(
            name as string,
            desc as string,
            parseInt(price as string),
            '6515cfa37b8c4ebb9679801d', // todo get from jwt
            projectId
        );
        console.log('New task? ', task);
        formData.set('name', '');
        formData.set('price', '');
        formData.set('description', '');

        revalidatePath(path);
    }

    return (
        <ModalWrapper path={path}>
            <form action={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input type="text" name="name" placeholder="Name" />
                </div>
                <div>
                    <label htmlFor="price">Price:</label>
                    <input type="text" name="price" placeholder="Price" />
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea name="description" placeholder="Description" />
                </div>
                <button type="submit">Submit</button>
            </form>
        </ModalWrapper>
    );
}
