import { File as GoogleCloudFile } from '@google-cloud/storage';
import {
    bucket,
    deleteBucketFile,
    moveBucketFiles,
} from '../../(clients)/google';
import { NextResponse } from 'next/server';

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
    if (formData) {
        try {
            const file = formData.get('file') as unknown as File;
            const filePath = formData.get('filePath') as string;
            const res = await uploadFile(filePath, file);
            if (res) {
                return NextResponse.json({ filePath });
            } else {
                return new Response('Error while uploading file', {
                    status: 500,
                });
            }
        } catch (e) {
            return new Response('Error while streaming file', { status: 500 });
        }
    } else {
        return new Response('No form data', { status: 422 });
    }
}

export async function PUT(req: Request) {
    const { oldFilePaths, newFilePaths } = await req.json();
    if (oldFilePaths?.length === newFilePaths?.length) {
        const response = await moveBucketFiles(oldFilePaths, newFilePaths);

        if (response) {
            return new Response('Success', { status: 200 });
        } else {
            return new Response('Could not find image to move', {
                status: 404,
            });
        }
    } else {
        return new Response('Old and new file paths must be the same length', {
            status: 422,
        });
    }
}

export async function DELETE(req: Request) {
    const { filePath } = await req.json();
    const response = await deleteBucketFile(filePath);

    if (response) {
        return new Response('Success', { status: 200 });
    } else {
        return new Response('Could not find image to delete', { status: 404 });
    }
}
