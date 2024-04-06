document.addEventListener('DOMContentLoaded', function() { 
    const affirmationText = document.getElementById('affirmationText');  
    const refreshButton = document.getElementById('refreshButton');  
    const affirmationIcon = document.getElementById('affirmationIcon'); // Ensure this ID matches your image ID in the HTML

    async function fetchAffirmation() {  try {  
    // Update the endpoint to match the Vercel serverless function route  
    const response = await fetch('/api/affirmation');  
    if (!response.ok) {  
        throw new Error(`HTTP error! status: ${response.status}`);  
    }  const data = await response.json();  
    affirmationText.textContent = data.text;

    fetchAffirmation(); // Fetch an affirmation when the page loads

    refreshButton.addEventListener('click', function() {
        fetchAffirmation(); // Fetch a new affirmation when the refresh button is clicked
    });
    
    affirmationIcon.addEventListener('click', function() {
        fetchAffirmation(); // Fetch a new affirmation when the lotus icon is clicked
    });
});
