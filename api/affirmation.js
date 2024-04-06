// affirmation.js (Placed in the /api directory to be deployed as a Vercel Serverless Function)

const fetch = require('node-fetch');  
const MongoClient = require('mongodb').MongoClient;  
const assert = require('assert');

module.exports = async (req, res) => {
    // Define the MongoDB Data API URL
    const baseUrl = process.env.MONGODB_API_URL;  
    const apiKey = process.env.MONGODB_API_KEY;  
    const dbName = process.env.MONGODB_DATABASE_NAME;

    // Setup the data payload
    const dataPayload = {
        collection: 'affirmationsbyid',
        database: 'affirmations',
        dataSource: 'ZenCluster',
        filter: {}, // Add a filter if necessary or keep it to fetch random documents
        projection: { "_id": 0, "affirmation": 1 }
    };

    // Set up the headers
    const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*', // To handle CORS
        'api-key': apiKey,
    };

    try {
        const response = await fetch(baseUrl, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(dataPayload)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        // Assuming the affirmation text is directly in the response's document property
        res.status(200).json({ text: data.document.affirmation });
    } catch (error) {
        console.error('Error fetching affirmation:', error);
        res.status(500).json({ error: error.message });
    }
};
