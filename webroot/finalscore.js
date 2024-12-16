// Function to retrieve the score from local storage and display it
function displayFinalScore() {
    const finalScore = localStorage.getItem('finalScore') || 0; // Get score from local storage
    document.getElementById('finalScore').innerText = finalScore; // Display the score
}

// Function to go back to the main screen
function goBack() {
    window.location.href = 'page.html'; // Change this to your main screen URL
}

// Function to post the score to Reddit
async function postScore() {
    console.log('postScoreiisnadks');
    const scoreContainer = document.getElementById('scoreContainer');
    const finalScore = document.getElementById('finalScore').innerText;
}

// Add event listener to the post score button
document.getElementById('postScoreButton').addEventListener('click', postScore);

// Call the function to display the final score when the page loads
window.onload = displayFinalScore;