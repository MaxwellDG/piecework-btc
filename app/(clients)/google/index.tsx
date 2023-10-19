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

export default storage;
