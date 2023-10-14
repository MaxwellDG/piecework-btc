import ModalWrapper from '..';
import TaskHandler from '../../../../db/modeling/task';
import { headers } from 'next/headers';
import dbConnect from '../../../../db';
import { redirect } from 'next/navigation';
import { revalidateTag } from 'next/cache';

// this was a nice little experiment to see if I could do modals and forms entirely server-side
// didn't work out as smoothly as I'd hoped, but it's still a nice little snippet to refer to

type Props = {
    projectId: string;
    path: string;
};

export default async function AddTaskModal({ projectId, path }: Props) {
    await dbConnect();

    const _headers = headers();
    const companyId = _headers.get('jwt-company') as string;

    async function handleSubmit(formData: FormData): Promise<void> {
        'use server';

        const name = formData.get('name');
        const price = formData.get('price');
        const desc = formData.get('description');
        await TaskHandler.create(
            name as string,
            desc as string,
            parseInt(price as string),
            companyId,
            projectId
        );
        formData.set('name', '');
        formData.set('price', '');
        formData.set('description', '');

        revalidateTag('tasks');
        // redirect(path);
    }

    return (
        <ModalWrapper path={path}>
            <form action={handleSubmit}>
                <div className="flex mb-2">
                    <label htmlFor="name" className="mr-2 w-20">
                        Name:
                    </label>
                    <input
                        type="text"
                        name="name"
                        className="input input-bordered flex flex-1"
                        required
                    />
                </div>
                <div className="flex mb-2">
                    <label htmlFor="price" className="mr-2 w-20">
                        Price:
                    </label>
                    <input
                        type="number"
                        name="price"
                        className="input input-bordered flex flex-1"
                        required
                    />
                </div>
                <div className="flex items-start mb-8">
                    <label htmlFor="description" className="mr-2 w-20">
                        Description:
                    </label>
                    <textarea
                        name="description"
                        className="input input-bordered flex flex-1"
                        required
                    />
                </div>
                <button type="submit" className="button w-full">
                    Submit
                </button>
            </form>
        </ModalWrapper>
    );
}
