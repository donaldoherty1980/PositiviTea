const { MongoClient } = require('mongodb');

module.exports = async (req, res) => {
    const uri = process.env.MONGO_URI;
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const database = client.db('affirmations');
        const affirmationsCollection = database.collection('affirmationsbyid');
        const count = await affirmationsCollection.countDocuments();
        const randomIndex = Math.floor(Math.random() * count);
        const queryOptions = { projection: {_id: 0, affirmations: 1} }; // Exclude the _id from results
        const randomAffirmation = await affirmationsCollection.findOne({}, queryOptions);
        res.status(200).json({ text: randomAffirmation.affirmations });
    } catch (e) {
        console.error('Error fetching affirmation:', e);
        res.status(500).json({ error: 'Error fetching affirmation' });
    } finally {
        await client.close();
    }
};
