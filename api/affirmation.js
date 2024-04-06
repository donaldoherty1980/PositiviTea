// affirmation.js

// Import MongoClient from the mongodb package.
import { MongoClient } from 'mongodb';

// Async function to handle the API endpoint call.
export default async function handler(req, res) {
    // Create a new MongoClient
    const client = new MongoClient(process.env.MONGO_URI);

    try {
        // Connect to the client
        await client.connect();

        // Connect to the correct database and collection
        const collection = client.db('affirmations').collection('affirmationsbyid');

        // Create a cursor for a random document
        const cursor = collection.aggregate([
            { $sample: { size: 1 } }
        ]);

        // Get the random document
        const randomDocument = await cursor.toArray();

        // If no document is found, return a 404
        if (!randomDocument.length) {
            res.status(404).json({ error: 'No affirmations found' });
            return;
        }

        // Send back the random affirmation
        res.status(200).json({ affirmation: randomDocument[0].affirmations });

    } catch (error) {
        // If an error occurs, log it and send back a 500 error
        console.error(error);
        res.status(500).json({ error: error.message });
    } finally {
        // Ensure that the client will close when you finish/error
        await client.close();
    }
}

