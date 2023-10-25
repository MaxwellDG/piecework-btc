require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

// require the necessary libraries

const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_CLUSTER}.t0meamb.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`;

if (!MONGODB_URI) {
    throw new Error(
        'Please define the MONGODB_URI environment variable inside .env.local'
    );
}

console.log('this exist? ', process.env.MONGO_USER);

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
            company: 'testing',
        };

        await companiesCollection.updateOne(
            { company: 'testing' },
            { $set: testCompany },
            {
                upsert: true, // option to add if doesn't exist
            }
        );

        const company = await companiesCollection.findOne({
            company: 'testing',
        });

        const adminAccount = {
            username: 'admin',
            password: 'password',
            company: company._id,
        };

        await accountsCollection.updateOne(
            { username: 'admin', company: company._id },
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
