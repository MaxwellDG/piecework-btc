import mongoose from 'mongoose';

const url = 'mongodb://localhost:27017/workforbitcoin';

export async function connectToDb() {
    console.log('Connecting to MongoDB...');
    if (
        mongoose.connection.readyState === mongoose.ConnectionStates.connected
    ) {
        return mongoose.connection.asPromise();
    }

    return await mongoose.connect(url);
}

export default connectToDb;
