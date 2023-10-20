import { File as GoogleCloudFile } from '@google-cloud/storage';
import { bucket } from '../../(clients)/google';

// todo fancy pipe?
export async function POST(req: Request) {
    const formData = await req.formData();
    if (formData) {
        try {
            const file = formData.get('file') as unknown as File;
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);
            const blob: GoogleCloudFile = bucket.file(file.name);

            const blobStream = blob.createWriteStream({
                resumable: false,
                gzip: true,
            });

            blobStream.on('error', (err) => console.log('error: ', err));
            blobStream.on('finish', () =>
                console.log('finished uploading file')
            );
            blobStream.end(buffer, () => console.log('ended stream'));
        } catch (e) {
            console.log('wtf error? ', e);
        }
    } else {
        console.log('No form data');
    }
}
