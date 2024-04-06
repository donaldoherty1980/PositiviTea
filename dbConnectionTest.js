// dbConnectionTest.js
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

// Ensure that your MONGO_URI is defined in the .env file
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, {
  serverApi: ServerApiVersion.v1
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
