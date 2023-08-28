import mongoose from "mongoose";

const url = "mongodb://localhost:27017/workforbitcoin";

export async function connectToDb() {
  if (
    mongoose.connection &&
    mongoose.connection?.readyState === mongoose.ConnectionStates?.connected
  ) {
    await mongoose.connection?.asPromise();
  }

  await mongoose.connect(url);
}

export default connectToDb;
