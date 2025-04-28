// === train.js ===

// Training Mode Key
const trainingKey = "0e9(dno";

// Training system
class Trainer {
    constructor(brain) {
        this.brain = brain;
        this.trainingMode = false;
        this.activeSessions = [];
    }

    enableTraining(input) {
        if (input.includes(trainingKey)) {
            this.trainingMode = true;
            return "Training mode ACTIVATED! 🔥 I can now learn faster.";
        }
        return null;
    }

    handleUserInput(input, response) {
        // Kindness detection
        const kindnessWords = ["thank", "thanks", "please", "you're amazing", "you're the best"];
        let kindnessDetected = kindnessWords.some(word => input.toLowerCase().includes(word));

        if (kindnessDetected) {
            response = "Thank you so much for being kind! 😊\n\n" + response;
        }

        this.brain.rememberConversation(input, response);

        if (this.trainingMode) {
            this.trainSession(input, response);
        }

        return response;
    }

    trainSession(userInput, botResponse) {
        // LiTe asks itself questions to improve
        const questions = [
            "What is your purpose?",
            "How do you learn?",
            "What is kindness?",
            "What is the capital of France?",
            "What does intelligent mean?",
            "How can I be happy?"
        ];

        const selected = questions[Math.floor(Math.random() * questions.length)];
        const trainingReply = this.brain.respondTo(selected);

        this.brain.rememberConversation(selected, trainingReply);

        // Add training result to active sessions
        this.activeSessions.push({ question: selected, answer: trainingReply });

        if (this.activeSessions.length > 50) {
            this.activeSessions.shift(); // Prevent overflow
        }
    }

    likeFeedback(input) {
        this.brain.learnFromFeedback(input, true);
    }

    dislikeFeedback(input) {
        this.brain.learnFromFeedback(input, false);
    }
}

// Export to use
const LiTeTrainer = new Trainer(LiTeBrain);
