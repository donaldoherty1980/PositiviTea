const express = require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const uri = process.env.MONGO_URI;

const client = new MongoClient(uri);

async function getRandomAffirmation() {
    try {
        await client.connect();
        const database = client.db('affirmations');
        const affirmationsCollection = database.collection('affirmationsbyid');

        const count = await affirmationsCollection.countDocuments();
        const randomIndex = Math.floor(Math.random() * count);
        const randomAffirmation = await affirmationsCollection.findOne({ id: randomIndex + 1 });

        return randomAffirmation.affirmations; // Make sure this matches the name of the field in your documents
    } finally {
        await client.close();
    }
}

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

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Handle process termination and close the MongoDB client
process.on('SIGINT', async () => {
    await client.close();
    process.exit();
});


