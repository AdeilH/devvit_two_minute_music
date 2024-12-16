function playTone(frequency) {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  oscillator.type = 'square'; // 8-bit sound
  oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
  oscillator.connect(audioContext.destination);
  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.5); // Play for 0.5 seconds
}

// Countdown timer function
function startCountdown() {
  let timeLeft = 60; // 60 seconds
  const timerElement = document.getElementById('timer');

  const countdown = setInterval(() => {
    timerElement.innerText = timeLeft; // Update the timer display
    timeLeft--;

    if (timeLeft < 0) {
      clearInterval(countdown); // Stop the countdown when it reaches 0
      timerElement.innerText = "Time's up!"; // Display a message

      // Record the counter and send it to the main application
      const currentCounter = Number(document.getElementById('counter').innerText);
      window.parent?.postMessage(
        { type: 'setCounter', data: { newCounter: currentCounter } },
        '*'
      );

      // Optionally, navigate back to the main screen
      // This can be done by hiding the current view or redirecting
      // For example, you might want to close the webview or navigate to a different URL
      localStorage.setItem('finalScore', currentCounter); // Store the final score in local storage
      window.parent?.postMessage(
        { type: 'setCounter', data: { newCounter: Number(0) } },
        '*'
      );
      console.log('finalScore', localStorage.getItem('finalScore'));
      window.location.href = 'finalscore.html';
    }
  }, 1000); // Update every second
}

// Function to display a random character
function displayRandomCharacter() {
  const characters = ['c', 'd', 'e', 'f', 'g', 'a', 'b', '2'];
  const randomIndex = Math.floor(Math.random() * characters.length);
  const randomCharacter = characters[randomIndex];

  // Clear the current character
  document.getElementById('randomCharacter').innerText = "-";

  // Set a timeout to display the new character after a brief moment
  setTimeout(() => {
    document.getElementById('randomCharacter').innerText = randomCharacter;
  }, 50); // Adjust the delay (in milliseconds) as needed
}

// Function to check if the pressed key matches the expected character
function checkKeyMatch(pressedKey) {
  const currentCharacter = document.getElementById('randomCharacter').innerText;
  switch (pressedKey) {
    case 'c':
      playTone(261.63);
      break;
    case 'd':
      playTone(293.66);
      break;
    case 'e':
      playTone(329.63);
      break;
    case 'f':
      playTone(349.23);
      break;
    case 'g':
      playTone(392.00);
      break;
    case 'a':
      playTone(440.00);
      break;
    case 'b':
      playTone(493.88);
      break;
    case '2':
      playTone(523.25);
      break;
  }
  if (pressedKey === currentCharacter) {
    console.log('correct');
    // Increment the counter and send the new value
    const currentCounter = Number(document.getElementById('counter').innerText) + 1;
    document.getElementById('counter').innerText = currentCounter; // Update the displayed counter
    window.parent?.postMessage(
      { type: 'setCounter', data: { newCounter: currentCounter } },
      '*'
    );
    displayRandomCharacter(); // Display a new random character
  } else {
    console.log('incorrect');
    // Reset the counter or handle incorrect input
    window.parent?.postMessage(
      { type: 'setCounter', data: { newCounter: 0 } },
      '*'
    );
  }
}

class App {
  constructor() {
    const counterLabel = document.querySelector('#counter');
    const noteC = document.querySelector('#noteC');
    const noteD = document.querySelector('#noteD');
    const noteE = document.querySelector('#noteE');
    const noteF = document.querySelector('#noteF');
    const noteG = document.querySelector('#noteG');
    const noteA = document.querySelector('#noteA');
    const noteB = document.querySelector('#noteB');
    const noteC2 = document.querySelector('#noteC2');
    var counter = 0;

    // When the Devvit app sends a message with `context.ui.webView.postMessage`, this will be triggered
    window.addEventListener('message', (ev) => {
      const { type, data } = ev.data;

      // Reserved type for messages sent via `context.ui.webView.postMessage`
      if (type === 'devvit-message') {
        const { message } = data;

        // Load initial data
        if (message.type === 'initialData') {
          const { currentCounter } = message.data;
          counterLabel.innerText = counter = currentCounter;
        }

        // Update counter
        if (message.type === 'updateCounter') {
          const { currentCounter } = message.data;
          counterLabel.innerText = counter = currentCounter;
        }
      }
    });

    // Add keydown event listener
    window.addEventListener('keydown', (event) => {
      checkKeyMatch(event.key);
    });

    noteC.addEventListener('click', () => {
      checkKeyMatch('c');
    });

    noteD.addEventListener('click', () => {
      checkKeyMatch('d');
    });

    noteE.addEventListener('click', () => {
      checkKeyMatch('e');
    });

    noteF.addEventListener('click', () => {
      checkKeyMatch('f');
    });

    noteG.addEventListener('click', () => {
      checkKeyMatch('g');
    });

    noteA.addEventListener('click', () => {
      checkKeyMatch('a');
    });

    noteB.addEventListener('click', () => {
      checkKeyMatch('b');
    });

    noteC2.addEventListener('click', () => {
      checkKeyMatch('C');
    });

    // Set focus to the body when the page loads
    window.onload = () => {
      displayRandomCharacter();
      document.body.focus(); // Set focus to the bodyd
      startCountdown(); // Start the countdown timer
    };
  }
}

new App();
