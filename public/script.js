document.addEventListener('DOMContentLoaded', function() {
    const affirmationText = document.getElementById('affirmationText');  
    const refreshButton = document.getElementById('refreshButton');  
    const affirmationIcon = document.getElementById('affirmationIcon'); // Ensure this ID matches your image ID in the HTML

    async function fetchAffirmation() {
        try {
            // Update the endpoint to match the Vercel serverless function route
            const response = await fetch('/api/affirmation');
            if (!response.ok) { 
                throw new Error(`HTTP error! status: ${response.status}`); 
            }
            const data = await response.json();  
            affirmationText.textContent = data.text;
        } catch (error) {
            console.error('Error fetching affirmation:', error);
            // Handle errors, such as by displaying a default message or an error message
            affirmationText.textContent = 'An error occurred. Please try again.';
        }
    }

    // Fetch an affirmation when the page loads  
    fetchAffirmation(); 
    
    refreshButton.addEventListener('click', function() {
        fetchAffirmation(); // Fetch a new affirmation when the refresh button is clicked
    });

    affirmationIcon.addEventListener('click', function() { 
        fetchAffirmation(); // Fetch a new affirmation when the lotus icon is clicked 
    });
});
