require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_CLUSTER}.t0meamb.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`;

if (!MONGODB_URI) {
    throw new Error(
        'Please define the MONGODB_URI environment variable inside .env.local'
    );
}

/*
    - adds viewedBySuperAdmin property to all tasks, projects, and companies
    - removes deprecated updateViewedByAdmin property from companies 
*/

(async () => {
    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    try {
        const tasksCollection = client
            .db(process.env.MONGO_DB_NAME)
            .collection('tasks');
        const projectsCollection = client
            .db(process.env.MONGO_DB_NAME)
            .collection('projects');
        const companyCollection = client
            .db(process.env.MONGO_DB_NAME)
            .collection('companies');

        await tasksCollection.updateMany(
            { viewedBySuperAdmin: null },
            { $set: { viewedBySuperAdmin: false } }
        );
        await projectsCollection.updateMany(
            { viewedBySuperAdmin: null },
            { $set: { viewedBySuperAdmin: false } }
        );
        await companyCollection.updateMany(
            { viewedBySuperAdmin: null },
            {
                $set: { viewedBySuperAdmin: false },
                $unset: { updateViewedByAdmin: null },
            }
        );
    } catch (e) {
        console.log(e);
    } finally {
        await client.close();
    }
})();
