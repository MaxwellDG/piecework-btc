import { deleteBucketFile } from '../../../(clients)/google';
import dbConnect from '../../../../db';
import TasksHandler from '../../../../db/modeling/task';

export async function DELETE(
    req: Request,
    { params }: { params: { filePath: string } }
) {
    const { folder, projectId, taskId } = await req.json();
    const company = req.headers.get('jwt-company') as string;
    const { filePath } = params;

    const response = await deleteBucketFile(folder, projectId, filePath);

    if (response) {
        await dbConnect();
        // todo this query is repeated in the update and could be written better
        const task = await TasksHandler.findById(taskId, company, projectId);
        const imageUrls = task?.imageUrls ?? [];
        await TasksHandler.update(taskId, company, projectId, {
            imageUrls: imageUrls.filter((url) => url !== filePath),
        });
        return new Response('Success', { status: 200 });
    } else {
        return new Response('Could not find image to delete', { status: 404 });
    }
}
