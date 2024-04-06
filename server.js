import express from 'express';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const uri = process.env.MONGO_URI;

const client = new MongoClient(uri);

let affirmationsCollection;

async function main() {
    try {
        await client.connect();
        console.log('Database connected successfully');
        const database = client.db(process.env.DB_NAME);
        affirmationsCollection = database.collection('affirmationsbyid');

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (err) {
        console.error('Database connection failed', err);
        process.exit(1);
    }
}

main();

app.use(express.static('public'));

app.get('/affirmation', async (req, res) => {
    try {
        const affirmation = await getRandomAffirmation();
        res.status(200).json({ text: affirmation });
    } catch (e) {
        console.error('Error fetching affirmation:', e);
        res.status(500).json({ error: 'Error fetching affirmation' });
    }
});

app.get('/favicon.ico', (req, res) => res.status(204).end());

async function getRandomAffirmation() {
    try {
        const count = await affirmationsCollection.countDocuments();
        const randomIndex = Math.floor(Math.random() * count);
        const randomAffirmation = await affirmationsCollection.findOne({}, { skip: randomIndex });
        return randomAffirmation.affirmations;
    } catch (error) {
        console.error('Error fetching random affirmation:', error);
        throw error;
    }
}

// Handle process termination and close the MongoDB client
process.on('SIGINT', async () => {
    await client.close();
    process.exit();
});
