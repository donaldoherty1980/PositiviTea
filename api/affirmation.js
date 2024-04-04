// Since node-fetch is an ES module, we are using dynamic import here.
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

module.exports = async (req, res) => {
    // Define the MongoDB Data API URL
    const baseUrl = 'https://eu-west-2.aws.data.mongodb-api.com/app/data-bydap/endpoint/data/v1/action/findOne';
    
    // Setup the data payload
    const dataPayload = {
        collection: 'affirmationsbyid',
        database: 'affirmations',
        dataSource: 'ZenCluster',
        projection: { "_id": 0, "affirmation": 1 }
    };
    
    // Set up the headers
    const headers = {
        'Content-Type': 'application/json',
        'api-key': 'zTuU87EBcMMe6YlXLozEQGihqNvEoQc4Yar7zEXeDHPQ9vB9PGSiFb2ai4u1cFBP'
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
        
        // Assuming the affirmation text is directly in the response's document property, modify as needed.
        res.status(200).json({ text: data.document.affirmation });

    } catch (error) {
        console.error('Error fetching affirmation:', error);
        res.status(500).json({ error: 'Error fetching affirmation' });
    }
};
