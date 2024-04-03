document.addEventListener('DOMContentLoaded', function() {
    const affirmationText = document.getElementById('affirmationText');
    const refreshButton = document.getElementById('refreshButton'); // Get the refresh button by its ID

    const baseUrl = window.location.hostname.includes('localhost')
  ? 'http://localhost:3000'
  : 'https://zen-pi.vercel.app';

async function fetchAffirmation() {
    try {
        const response = await fetch(`${baseUrl}/affirmation`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        affirmationText.textContent = data.text;
    } catch (error) {
        console.error('Fetch error:', error);
        affirmationText.textContent = "Failed to load affirmation. Please try again.";
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
