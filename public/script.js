document.addEventListener('DOMContentLoaded', function() {
    const affirmationText = document.getElementById('affirmationText');
    const refreshButton = document.getElementById('refreshButton'); // Get the refresh button by its ID

    async function fetchAffirmation() {
        try {
            const response = await fetch('/affirmation');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            affirmationText.textContent = data.text; // Set the text content of the affirmationText element to the fetched text
        } catch (error) {
            console.error('Fetch error:', error);
            affirmationText.textContent = "Failed to load affirmation. Please try again."; // Provide a fallback message
        }
    }

    fetchAffirmation(); // Fetch an affirmation when the page loads

    refreshButton.addEventListener('click', function() {
        fetchAffirmation(); // Fetch a new affirmation when the refresh button is clicked
    });
    
    // Fetch a new affirmation when the lotus icon is clicked
    affirmationIcon.addEventListener('click', function() {
        fetchAffirmation();
    });
});
