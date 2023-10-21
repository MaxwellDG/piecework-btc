import { Storage, StorageOptions } from '@google-cloud/storage';

const options: StorageOptions = {
    projectId: process.env.GCP_PROJECT_ID,
    keyFilename: process.env.GCP_FILE_PATH,
};

const storage = new Storage(options);

export const bucket = storage.bucket(process.env.GCP_BUCKET_NAME as string);

export const getBucketFileUrls = async (folder: string, projectId: string) => {
    const files = await bucket.getFiles({ prefix: `${folder}/${projectId}/` });
    return files[0].map(
        (file) => `${process.env.NEXT_PUBLIC_GCP_BUCKET_FULL_PATH}/${file.name}`
    );
};

export const deleteBucketFile = async (
    folder: string,
    projectId: string,
    fileName: string
) => {
    const res = await bucket
        .file(`${folder}/${projectId}/${fileName}`)
        .delete();
    console.log('deletres: ', res);
    return res;
};

export default storage;
