// affirmation.js

// Import MongoClient from the mongodb package.
import { MongoClient } from 'mongodb';

// Async function to handle the API endpoint call.
export default async function handler(req, res) {
    const uri = process.env.MONGO_URI; // Make sure this is the same variable name you have in your .env file
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const collection = client.db('affirmations').collection('affirmationsbyid');
        
        const [randomDocument] = await collection.aggregate([
            { $sample: { size: 1 } }
        ]).toArray();

        if (!randomDocument) {
            res.status(404).send({ error: 'No affirmations found' });
            return;
        }

        res.status(200).send({ affirmation: randomDocument.affirmations });
    } catch (error) {
        console.error('An error occurred:', error.stack); // During development it's helpful to log the stack
        res.status(500).send({ error: 'An error occurred while fetching affirmations.' });
    } finally {
        await client.close();
    }
}
