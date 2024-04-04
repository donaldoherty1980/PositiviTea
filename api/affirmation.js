// api/affirmation.js
const { MongoClient } = require('mongodb');

module.exports = async (req, res) => {
    // Retrieve the MongoDB URI from the environment variable
    const uri = process.env.MONGO_URI;

    // Add a console.log here to debug the value of uri, remove it after confirming it works
    // console.log('MongoDB URI:', uri); // Be cautious with logging sensitive information

    // Create a new MongoClient using the URI from the environment variables
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const database = client.db('affirmations');
        const affirmationsCollection = database.collection('affirmationsbyid');
        
        // Add your logic to fetch a random affirmation document
        // ...

        // Remember to close the client before sending the response
        await client.close();

        // Send the fetched affirmation back in the response
        res.status(200).json({ affirmation: /* ... */ });
    } catch (error) {
        // Handle any errors that occur during the request
        console.error('Error fetching affirmation:', error);

        // Close the client if an error occurs
        if (client.isConnected()) {
            await client.close();
        }

        // Send an error response
        res.status(500).json({ error: error.message });
    }
};
