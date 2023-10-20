import { Storage, StorageOptions } from '@google-cloud/storage';

console.log(
    'project id: ',
    process.env.GCP_PROJECT_ID,
    process.env.GCP_FILE_PATH
);

const options: StorageOptions = {
    projectId: process.env.GCP_PROJECT_ID,
    keyFilename: process.env.GCP_FILE_PATH,
};

const storage = new Storage(options);

export const bucket = storage.bucket(process.env.GCP_BUCKET_NAME as string);

export default storage;
