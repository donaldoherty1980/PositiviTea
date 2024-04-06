import { MongoClient } from 'mongodb';

export default async (req, res) => {
    const client = new MongoClient(process.env.MONGO_URI);

    try {
        await client.connect();
        const database = client.db('affirmations');
        const affirmations = database.collection('affirmationsbyid');
        const projection = { "_id": 0, "affirmations": 1 };
        
        // Assuming you want to get a random document from the collection
        const count = await affirmations.countDocuments();
        const random = Math.floor(Math.random() * count);
        const randomAffirmation = await affirmations.findOne({}, { projection }).skip(random);

        res.status(200).json({ text: randomAffirmation.affirmations });
    } catch (error) {
        console.error('Error fetching affirmation:', error);
        res.status(500).json({ error: error.message });
    } finally {
        await client.close();
    }
};

