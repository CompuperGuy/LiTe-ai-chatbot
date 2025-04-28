// === imagegen.js ===

class ImageGenerator {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.context = this.canvas.getContext("2d");
    }

    generateImage() {
        this.clearCanvas();
        
        // Draw random background color
        const bgColor = this.getRandomColor();
        this.canvas.style.backgroundColor = bgColor;

        // Randomly choose a shape
        const shapeType = Math.random() > 0.5 ? "circle" : "square";
        this.drawShape(shapeType);

        // Draw a random pattern of lines
        this.drawRandomLines();

        return this.canvas.toDataURL(); // Return generated image as data URL
    }

    clearCanvas() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    getRandomColor() {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    drawShape(shape) {
        const x = Math.random() * this.canvas.width;
        const y = Math.random() * this.canvas.height;
        const size = Math.random() * 100;

        this.context.fillStyle = this.getRandomColor();

        if (shape === "circle") {
            this.context.beginPath();
            this.context.arc(x, y, size / 2, 0, Math.PI * 2);
            this.context.fill();
        } else {
            this.context.fillRect(x, y, size, size);
        }
    }

    drawRandomLines() {
        const lineCount = Math.floor(Math.random() * 10) + 5;
        this.context.lineWidth = Math.random() * 5 + 1;

        for (let i = 0; i < lineCount; i++) {
            this.context.beginPath();
            this.context.moveTo(Math.random() * this.canvas.width, Math.random() * this.canvas.height);
            this.context.lineTo(Math.random() * this.canvas.width, Math.random() * this.canvas.height);
            this.context.strokeStyle = this.getRandomColor();
            this.context.stroke();
        }
    }
}

// Export for use
const imageGen = new ImageGenerator('imageCanvas'); // Canvas ID to create art
