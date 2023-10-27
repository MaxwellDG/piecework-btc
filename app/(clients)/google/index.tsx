import { Storage, StorageOptions } from '@google-cloud/storage';

const credentials = {
    type: 'service_account',
    project_id: 'piecework-btc',
    private_key_id: process.env.GCS_PRIVATE_KEY_ID,
    private_key: process.env.GCS_PRIVATE_KEY,
    client_email: 'tmp-921@piecework-btc.iam.gserviceaccount.com',
    client_id: '116488633130304170253',
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_x509_cert_url:
        'https://www.googleapis.com/robot/v1/metadata/x509/tmp-921%40piecework-btc.iam.gserviceaccount.com',
    universe_domain: 'googleapis.com',
};

const options: StorageOptions = {
    projectId: process.env.GCS_PROJECT_ID,
    credentials,
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
