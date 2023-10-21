import { File as GoogleCloudFile } from '@google-cloud/storage';
import { bucket } from '../../(clients)/google';
import { NextResponse } from 'next/server';
import TasksHandler from '../../../db/modeling/task';
import dbConnect from '../../../db';

const uploadFile = async (fileName: string, file: File) => {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const blob: GoogleCloudFile = bucket.file(fileName);

    const blobStream = blob.createWriteStream({
        resumable: false,
        gzip: true,
    });

    return new Promise((resolve, reject) => {
        blobStream.on('error', (e) => {
            reject(false);
        });
        blobStream.on('finish', () => resolve(true));
        blobStream.end(buffer);
    });
};

// todo fancy pipe?
export async function POST(req: Request, res: Response) {
    const formData = await req.formData();
    const company = req.headers.get('jwt-company') as string;
    if (formData) {
        await dbConnect();
        try {
            const file = formData.get('file') as unknown as File;
            const projectId = formData.get('projectId') as string;
            const taskId = formData.get('taskId') as string;
            const folder = formData.get('folder') as string;
            const fileName = `${folder}/${projectId}/${file.name}`;
            const res = await uploadFile(fileName, file);
            if (res) {
                // Add to task
                // todo this query is repeated in the update and could be written better
                const task = await TasksHandler.findById(
                    taskId,
                    company,
                    projectId
                );
                const imageUrls = task?.imageUrls ?? [];
                await TasksHandler.update(taskId, company, projectId, {
                    imageUrls: [...imageUrls, fileName],
                });

                return NextResponse.json({ fileName });
            } else {
                return new Response('Error while uploading file', {
                    status: 500,
                });
            }
        } catch (e) {
            console.log('Errr here', e);
            return new Response('Error while streaming file', { status: 500 });
        }
    } else {
        return new Response('No form data', { status: 422 });
    }
}
