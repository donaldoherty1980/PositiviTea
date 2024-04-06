const express = require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const uri = process.env.MONGO_URI;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let affirmationsCollection;

client.connect(err => {
    if(err) throw err;
    const database = client.db(process.env.DB_NAME); // Using an environment variable for the database name
    affirmationsCollection = database.collection('affirmationsbyid');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});

async function getRandomAffirmation() {
    try {
        const count = await affirmationsCollection.countDocuments();
        const randomIndex = Math.floor(Math.random() * count);
        const randomAffirmation = await affirmationsCollection.findOne({ id: randomIndex + 1 });
        return randomAffirmation.affirmations;
    } catch (error) {
        console.error('Error fetching random affirmation:', error);
        throw error; // rethrow the error so you can catch it outside this function
    }
}

app.use(express.static('public'));

app.get('/affirmation', async (req, res) => {
    try {
        const affirmation = await getRandomAffirmation();
        res.status(200).json({ text: affirmation });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching affirmation' });
    }
});

app.get('/favicon.ico', (req, res) => res.status(204).end());

// Handle process termination and close the MongoDB client
process.on('SIGINT', async () => {
    await client.close();
    process.exit();
});
