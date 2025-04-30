// Wait for page to load and hide loader
window.addEventListener("load", () => {
  const loader = document.querySelector(".loader");
  loader.classList.add("fade-out");
  setTimeout(() => loader.style.display = "none", 2500);
});

const inputField = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");
const chatWindow = document.querySelector(".chat-window");
const imageModeBtn = document.getElementById("image-mode-btn");
const imageGenSection = document.querySelector(".image-gen");
const promptField = document.getElementById("prompt");
const imageBtn = document.getElementById("generate-image");
const imageResult = document.getElementById("img-result");

let trainingMode = false;
let lastUserMessage = "";

// Button to toggle image/text mode
imageModeBtn.addEventListener("click", () => {
  imageGenSection.classList.toggle("hidden");
});

// Handle Enter key to send
inputField.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendBtn.click();
  }
});

// Message sending logic
sendBtn.addEventListener("click", () => {
  const msg = inputField.value.trim();
  if (msg === "") return;

  addMessage("user", msg);
  inputField.value = "";
  lastUserMessage = msg;

  if (msg.includes("0e9(dno")) {
    trainingMode = true;
    botReply("Training mode activated. I'm ready to learn!");
    return;
  }

  generateResponse(msg);
});

// Add messages to chat
function addMessage(sender, text, liked = false) {
  const msgDiv = document.createElement("div");
  msgDiv.classList.add("message");
  msgDiv.classList.add(sender === "user" ? "user-msg" : "bot-msg");

  msgDiv.innerHTML = `<span>${text}</span>`;

  if (sender === "bot" && !liked) {
    const heart = document.createElement("button");
    heart.innerText = "❤️";
    heart.style.marginLeft = "10px";
    heart.onclick = () => {
      heart.remove();
      // Learn from liked reply
      learnedResponses[lastUserMessage] = text;
    };
    msgDiv.appendChild(heart);
  }

  chatWindow.appendChild(msgDiv);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

// Response generator (uses memory or simple fallback)
let learnedResponses = {
  "hi": "Hello! How can I help you?",
  "hello": "Hi there! Ask me anything.",
  "how are you": "I'm always learning! Thanks for asking.",
};

function generateResponse(input) {
  const cleanInput = input.toLowerCase().replace(/[^a-z0-9 ]/gi, "").trim();

  // Spell correct basic input
  const corrected = autoCorrect(cleanInput);

  if (learnedResponses[corrected]) {
    botReply(learnedResponses[corrected]);
  } else {
    fetchWebResult(corrected).then(res => {
      if (res) {
        botReply(res);
      } else {
        botReply("Sorry, I couldn’t find a good answer. Try ChatGPT?");
      }
    });
  }
}

// Bot reply
function botReply(text) {
  if (trainingMode) {
    addMessage("bot", `💡 Thought: ${text}`);
  } else {
    addMessage("bot", text);
  }
}

// Simulate web fetch
async function fetchWebResult(query) {
  // Simulated knowledge base (you’ll later plug into real APIs)
  const dummyWeb = {
    "what is javascript": "JavaScript is a programming language used to create dynamic website behavior.",
    "who made chatgpt": "ChatGPT was created by OpenAI.",
  };

  return dummyWeb[query] || null;
}

// Auto correct system (basic)
function autoCorrect(input) {
  if (input.includes("helo")) return "hello";
  if (input.includes("js")) return "javascript";
  return input;
}

// Image generation placeholder
imageBtn.addEventListener("click", () => {
  const prompt = promptField.value.trim();
  if (!prompt) return;
  imageResult.innerHTML = `<p>🔮 Generating image for: <em>${prompt}</em></p>`;
  setTimeout(() => {
    imageResult.innerHTML += `<p>[Image generator coming soon]</p>`;
  }, 1000);
});
