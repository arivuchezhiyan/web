/**
 * Pop the Balloon Game — script.js
 */

document.addEventListener("DOMContentLoaded", () => {
    const gameSky = document.getElementById("game-sky");
    const scoreDisplay = document.getElementById("score-display");
    const livesDisplay = document.getElementById("lives-display");
    const levelDisplay = document.getElementById("level-display");
    const startBtn = document.getElementById("start-btn");
    const overlayStartBtn = document.getElementById("overlay-start-btn");
    const restartBtn = document.getElementById("restart-btn");
    const startOverlay = document.getElementById("start-overlay");
    const gameOverOverlay = document.getElementById("game-over-overlay");
    const finalScoreVal = document.getElementById("final-score-val");

    let score = 0;
    let lives = 3;
    let level = 1;
    let isPlaying = false;
    let spawnTimer = null;
    let activeBalloons = [];

    // Web Audio Pop Sound
    const playPopSound = (isBomb = false, isGold = false) => {
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            if (isBomb) {
                osc.type = "sawtooth";
                osc.frequency.setValueAtTime(150, ctx.currentTime);
                gain.gain.setValueAtTime(0.2, ctx.currentTime);
            } else if (isGold) {
                osc.type = "sine";
                osc.frequency.setValueAtTime(880, ctx.currentTime);
                gain.gain.setValueAtTime(0.15, ctx.currentTime);
            } else {
                osc.type = "triangle";
                osc.frequency.setValueAtTime(520, ctx.currentTime);
                gain.gain.setValueAtTime(0.12, ctx.currentTime);
            }

            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + 0.12);
        } catch (e) {}
    };

    const balloonTypes = [
        { type: "red", points: 10, prob: 0.28 },
        { type: "blue", points: 10, prob: 0.28 },
        { type: "green", points: 10, prob: 0.20 },
        { type: "purple", points: 10, prob: 0.12 },
        { type: "gold", points: 25, emoji: "⭐", prob: 0.08 },
        { type: "bomb", points: -1, emoji: "💣", prob: 0.04 }
    ];

    function getRandomBalloonType() {
        const rand = Math.random();
        let cumulative = 0;
        for (const b of balloonTypes) {
            cumulative += b.prob;
            if (rand <= cumulative) return b;
        }
        return balloonTypes[0];
    }

    function spawnBalloon() {
        if (!isPlaying) return;

        const spec = getRandomBalloonType();
        const balloon = document.createElement("div");
        balloon.className = `balloon balloon-${spec.type}`;

        if (spec.emoji) {
            const emojiEl = document.createElement("span");
            emojiEl.className = "balloon-emoji";
            emojiEl.textContent = spec.emoji;
            balloon.appendChild(emojiEl);
        }

        // Random horizontal position (5% to 85%)
        const skyWidth = gameSky.clientWidth || 500;
        const posX = Math.random() * (skyWidth - 70) + 10;
        balloon.style.left = `${posX}px`;

        // Floating speed based on level
        const baseSpeed = Math.max(2.2, 5.5 - level * 0.4);
        const floatDuration = (Math.random() * 1.5 + baseSpeed);
        balloon.style.transition = `bottom ${floatDuration}s linear`;

        gameSky.appendChild(balloon);
        activeBalloons.push(balloon);

        // Animate floating up
        setTimeout(() => {
            balloon.style.bottom = `${gameSky.clientHeight + 80}px`;
        }, 30);

        // Click to POP
        balloon.addEventListener("mousedown", (e) => {
            if (!isPlaying || balloon.classList.contains("popping")) return;
            e.stopPropagation();

            balloon.classList.add("popping");
            activeBalloons = activeBalloons.filter((b) => b !== balloon);

            if (spec.type === "bomb") {
                // Hit Bomb
                playPopSound(true);
                loseLife();
                showFloatingText("-1 ❤️", posX, balloon.offsetTop, "#ef4444");
            } else {
                // Hit Normal or Gold Balloon
                const isGold = spec.type === "gold";
                playPopSound(false, isGold);
                score += spec.points;
                scoreDisplay.textContent = score;

                // Level up every 100 points
                const newLevel = Math.floor(score / 100) + 1;
                if (newLevel !== level) {
                    level = newLevel;
                    levelDisplay.textContent = level;
                }

                showFloatingText(`+${spec.points}`, posX, balloon.offsetTop, isGold ? "#f59e0b" : "#ffffff");
            }

            setTimeout(() => balloon.remove(), 160);
        });

        // Check if balloon escaped off the top
        setTimeout(() => {
            if (balloon.parentNode && !balloon.classList.contains("popping")) {
                balloon.remove();
                activeBalloons = activeBalloons.filter((b) => b !== balloon);
                if (spec.type !== "bomb" && isPlaying) {
                    loseLife();
                }
            }
        }, floatDuration * 1000);
    }

    function showFloatingText(text, x, y, color = "#fff") {
        const floatEl = document.createElement("div");
        floatEl.className = "floating-score";
        floatEl.textContent = text;
        floatEl.style.left = `${x + 10}px`;
        floatEl.style.top = `${y}px`;
        floatEl.style.color = color;
        gameSky.appendChild(floatEl);
        setTimeout(() => floatEl.remove(), 600);
    }

    function loseLife() {
        lives--;
        updateLivesDisplay();
        if (lives <= 0) {
            endGame();
        }
    }

    function updateLivesDisplay() {
        let hearts = "";
        for (let i = 0; i < lives; i++) hearts += "❤️";
        for (let i = lives; i < 3; i++) hearts += "🤍";
        livesDisplay.textContent = hearts;
    }

    function startGame() {
        score = 0;
        lives = 3;
        level = 1;
        scoreDisplay.textContent = "0";
        levelDisplay.textContent = "1";
        updateLivesDisplay();

        isPlaying = true;
        startOverlay.style.display = "none";
        gameOverOverlay.style.display = "none";
        startBtn.textContent = "Playing...";
        startBtn.disabled = true;

        // Clear existing balloons
        activeBalloons.forEach((b) => b.remove());
        activeBalloons = [];

        // Spawn interval
        clearInterval(spawnTimer);
        spawnTimer = setInterval(() => {
            spawnBalloon();
        }, Math.max(600, 1400 - level * 100));
    }

    function endGame() {
        isPlaying = false;
        clearInterval(spawnTimer);
        activeBalloons.forEach((b) => b.remove());
        activeBalloons = [];

        finalScoreVal.textContent = score;
        gameOverOverlay.style.display = "flex";
        startBtn.textContent = "Start Game";
        startBtn.disabled = false;
    }

    overlayStartBtn.addEventListener("click", startGame);
    startBtn.addEventListener("click", startGame);
    restartBtn.addEventListener("click", startGame);
});
