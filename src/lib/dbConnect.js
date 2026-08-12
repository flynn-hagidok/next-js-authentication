import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.URI);
const dbName = process.env.DB_NAME;

export const dbConnect = (cName) => {
    // const database = client.db(dbName);
    // return database.collection(cName);
    return client.db(dbName).collection(cName);
};

