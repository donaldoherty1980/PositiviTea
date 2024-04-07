import { MongoClient } from 'mongodb';

let client;
let clientPromise;

const uri = process.env.MONGO_URI;

// Function to connect to the database
function connectToDatabase(uri) {
  if (!clientPromise) {
    client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    clientPromise = client.connect();
  }
  return clientPromise;
}

// Async function to handle the API endpoint call.
export default async function handler(req, res) {
  try {
    await connectToDatabase(uri);
    const collection = client.db('affirmations').collection('affirmationsbyid');

    const [randomDocument] = await collection.aggregate([
      { $sample: { size: 1 } },
    ]).toArray();

    if (!randomDocument) {
      return res.status(404).json({ error: 'No affirmations found' });
    }

    return res.status(200).json({ affirmation: randomDocument.affirmations });
  } catch (error) {
    console.error('An error occurred:', error.stack);
    return res.status(500).json({ error: 'An error occurred while fetching affirmations.' });
  }
}
