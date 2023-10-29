require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_CLUSTER}.t0meamb.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`;

if (!MONGODB_URI) {
    throw new Error(
        'Please define the MONGODB_URI environment variable inside .env.local'
    );
}

const COMPANY_TESTING_NAME = 'testing';

async function seedDB() {
    const client = new MongoClient(MONGODB_URI);

    try {
        await client.connect();
        console.log('Connected correctly to server');

        const companiesCollection = client
            .db(process.env.MONGO_DB_NAME)
            .collection('companies');

        const accountsCollection = client
            .db(process.env.MONGO_DB_NAME)
            .collection('accounts');

        // collection.drop();

        const testCompany = {
            name: COMPANY_TESTING_NAME, // is unique
            updateViewedByAdmin: false,
            createdAt: new Date(Date.now()),
            updatedAt: new Date(Date.now()),
        };

        let companyId;
        const company = await companiesCollection.updateOne(
            { name: COMPANY_TESTING_NAME },
            { $set: testCompany },
            {
                upsert: true, // option to add if doesn't exist
            }
        );

        if (company?.upsertedId) {
            companyId = company.upsertedId._id;
        } else {
            const company = await companiesCollection.findOne({
                name: COMPANY_TESTING_NAME,
            });
            companyId = company._id;
        }

        const adminAccount = {
            username: 'admin',
            password: 'password',
            company: companyId,
        };

        await accountsCollection.updateOne(
            { username: 'admin', company: companyId },
            { $set: adminAccount },
            { upsert: true } // option to add if doesn't exist
        );

        console.log('Database seeded');
    } catch (e) {
        console.log(e);
    } finally {
        client.close();
    }
}

seedDB();
