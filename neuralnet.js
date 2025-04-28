

class NeuralNet {
    constructor() {
        this.wordKnowledge = {};
        this.sentencePatterns = [];
        this.conversationHistory = [];
        this.likesMemory = {};
        this.wordAssociations = {};

        this.buildBasicDictionary();
        this.learningRate = 0.05; // How quickly it adjusts
        this.maxMemory = 100000; // Maximum stored conversations
    }

    buildBasicDictionary() {
        // Common English words — truncated, but will be expanded as it learns
        const basicWords = [
            "hello", "hi", "how", "are", "you", "what", "is", "the", "meaning",
            "of", "life", "good", "bad", "happy", "sad", "help", "learn", "understand",
            "please", "thank", "you", "weather", "today", "time", "world", "smart",
            "intelligent", "who", "where", "when", "why", "how", "name", "LiTe",
            "chat", "love", "friend", "kind", "awesome", "cool", "computer", "science",
            "brain", "knowledge", "memory", "fun", "interesting", "robot", "engineer",
            "future", "amazing", "great", "fantastic", "beautiful", "question", "answer"
        ];

        basicWords.forEach(word => {
            this.wordKnowledge[word] = {
                definition: "A basic word in English.",
                usageCount: 0,
                positiveSentiment: true
            };
        });
    }

    spellCheck(input) {
        // Very basic spell check — suggest if misspelled
        const words = input.toLowerCase().split(/\s+/);
        return words.map(word => {
            if (this.wordKnowledge[word]) return word;
            else {
                // Suggest closest
                return Object.keys(this.wordKnowledge).reduce((a, b) => {
                    return this.levenshteinDistance(word, a) < this.levenshteinDistance(word, b) ? a : b;
                });
            }
        }).join(' ');
    }

    levenshteinDistance(a, b) {
        const matrix = [];
        for (let i = 0; i <= b.length; i++) {
            matrix[i] = [i];
        }
        for (let j = 0; j <= a.length; j++) {
            matrix[0][j] = j;
        }
        for (let i = 1; i <= b.length; i++) {
            for (let j = 1; j <= a.length; j++) {
                if (b.charAt(i-1) === a.charAt(j-1)) {
                    matrix[i][j] = matrix[i-1][j-1];
                } else {
                    matrix[i][j] = Math.min(matrix[i-1][j-1] + 1, matrix[i][j-1] + 1, matrix[i-1][j] + 1);
                }
            }
        }
        return matrix[b.length][a.length];
    }

    analyzeSentence(sentence) {
        const corrected = this.spellCheck(sentence);
        const words = corrected.toLowerCase().split(/\s+/);

        let sentimentScore = 0;
        words.forEach(word => {
            if (this.wordKnowledge[word]) {
                this.wordKnowledge[word].usageCount += 1;
                sentimentScore += this.wordKnowledge[word].positiveSentiment ? 1 : -1;
            }
        });

        const pattern = words.join(' ');
        this.sentencePatterns.push(pattern);

        return {
            correctedSentence: corrected,
            sentimentScore: sentimentScore
        };
    }

    respondTo(sentence) {
        const analysis = this.analyzeSentence(sentence);

        if (analysis.sentimentScore > 2) {
            return "I'm so happy to talk to you! 😊 What would you like to discuss?";
        } else if (analysis.sentimentScore < -2) {
            return "I'm here to help even if things seem tough.";
        } else {
            return "Thanks for chatting! What would you like to know?";
        }
    }

    learnFromFeedback(sentence, positive) {
        const words = sentence.toLowerCase().split(/\s+/);
        words.forEach(word => {
            if (this.wordKnowledge[word]) {
                this.wordKnowledge[word].positiveSentiment = positive;
            }
        });
    }

    rememberConversation(sentence, response) {
        if (this.conversationHistory.length >= this.maxMemory) {
            this.conversationHistory.shift(); // Remove oldest
        }
        this.conversationHistory.push({ user: sentence, bot: response });
    }

    trainFromConversationSet(conversations) {
        conversations.forEach(convo => {
            this.analyzeSentence(convo.user);
            this.analyzeSentence(convo.bot);
        });
    }

    suggestLearningTopics() {
        const leastUsed = Object.entries(this.wordKnowledge)
            .sort((a, b) => a[1].usageCount - b[1].usageCount)
            .slice(0, 5)
            .map(entry => entry[0]);

        return "Maybe we can talk about: " + leastUsed.join(', ');
    }
}

// Export to use
const LiTeBrain = new NeuralNet();
