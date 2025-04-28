const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');
const chatContainer = document.getElementById('chat-container');
const switchModeButton = document.getElementById('switch-mode');

let currentMode = 'chat'; // 'chat' or 'image'
let trainingMode = false;

// Capture Enter key
userInput.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    e.preventDefault();
    sendMessage();
  }
});

sendButton.addEventListener('click', () => {
  sendMessage();
});

switchModeButton.addEventListener('click', () => {
  if (currentMode === 'chat') {
    currentMode = 'image';
    switchModeButton.innerText = 'Switch to Chat';
  } else {
    currentMode = 'chat';
    switchModeButton.innerText = 'Switch to Image';
  }
});

function sendMessage() {
  const text = userInput.value.trim();
  if (text === '') return;
  
  addMessage('user', text);
  
  if (text.includes('0e9(dno')) {
    trainingMode = !trainingMode;
    addMessage('bot', trainingMode ? "Training Mode Activated! 🔥" : "Training Mode Deactivated.");
    userInput.value = '';
    return;
  }

  processMessage(text);
  userInput.value = '';
}

function addMessage(sender, text) {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
  messageDiv.innerText = text;
  chatContainer.appendChild(messageDiv);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

function processMessage(text) {
  if (currentMode === 'image') {
    generateImage(text);
    return;
  }

  if (trainingMode) {
    trainingAsk(text);
    return;
  }

  if (text.toLowerCase().includes('please') || text.toLowerCase().includes('thank you')) {
    addMessage('bot', "Thank you for being polite! 😊 Here's your answer:");
  }

  if (bannedWords.some(word => text.toLowerCase().includes(word))) {
    addMessage('bot', "I'm sorry, I cannot respond to that.");
    return;
  }

  // Simulate web search and internal understanding
  simulatedWebSearch(text).then(response => {
    addBotResponse(response);
  });
}

function addBotResponse(responseText) {
  const botDiv = document.createElement('div');
  botDiv.classList.add('bot-message');

  const heartButton = document.createElement('button');
  heartButton.innerText = '❤️';
  heartButton.style.background = 'none';
  heartButton.style.border = 'none';
  heartButton.style.cursor = 'pointer';
  heartButton.style.fontSize = '1.5rem';
  heartButton.addEventListener('click', () => {
    learnFromLike(responseText);
    heartButton.remove();
  });

  botDiv.innerText = responseText;
  botDiv.appendChild(heartButton);

  chatContainer.appendChild(botDiv);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}
