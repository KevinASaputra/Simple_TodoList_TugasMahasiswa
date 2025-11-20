import mongoose from 'mongoose';

const MONGOODB_URI = process.env.MONGOODB_URI as string;

if (!MONGOODB_URI) {
  throw new Error(
    'Missing MONGOODB_URI in env vriable please add it to .env file',
  );
}

let isConnected = false;

export const connectToDb = async () => {
  if (isConnected) return;

  try {
    await mongoose.connect(MONGOODB_URI, {
      dbName: 'todolist_mahasiswa',
    });
    isConnected = true;
  } catch (error) {
    console.log(error);
  }
};
