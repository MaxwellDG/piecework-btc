import { Storage, StorageOptions } from '@google-cloud/storage';

const options: StorageOptions = {
    projectId: process.env.GCS_PROJECT_ID,
    keyFilename: process.env.GCS_FILE_PATH,
};

const storage = new Storage(options);

export const bucket = storage.bucket(
    process.env.NEXT_PUBLIC_GCS_BUCKET_NAME as string
);

export const getBucketFileUrls = async (directoryPath: string) => {
    const files = await bucket.getFiles({ prefix: directoryPath });
    return files[0].map(
        (file) => `${process.env.NEXT_PUBLIC_GCS_BUCKET_FULL_PATH}/${file.name}`
    );
};

export const deleteBucketFile = async (filePath: string) => {
    const res = await bucket.file(filePath).delete();
    return res;
};

export const moveBucketFiles = async (
    oldFilePaths: string[],
    newFilePaths: string[]
) => {
    try {
        oldFilePaths.forEach(async (filePath: string, i: number) => {
            const oldPath = filePath.split(
                `${process.env.NEXT_PUBLIC_GCS_BUCKET_NAME}/`
            );
            const newPath = newFilePaths[i].split(
                `${process.env.NEXT_PUBLIC_GCS_BUCKET_NAME}/`
            );
            await bucket.file(oldPath[1]).move(newPath[1]);
        });
        return true;
    } catch (e) {
        return false;
    }
};

export default storage;
