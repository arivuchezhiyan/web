/**
 * Hamster Catching Game — script.js
 */

document.addEventListener("DOMContentLoaded", () => {
    const holes = document.querySelectorAll(".hole");
    const scoreVal = document.getElementById("score-val");
    const timeVal = document.getElementById("time-val");
    const highScoreVal = document.getElementById("high-score-val");
    const startBtn = document.getElementById("start-btn");
    const resetBtn = document.getElementById("reset-btn");
    const difficultySelect = document.getElementById("difficulty-select");

    const modal = document.getElementById("game-over-modal");
    const finalScore = document.getElementById("final-score");
    const highScoreMsg = document.getElementById("high-score-msg");
    const playAgainBtn = document.getElementById("play-again-btn");

    let lastHole = null;
    let timeUp = false;
    let score = 0;
    let countdown = 30;
    let timerId = null;
    let moleTimeout = null;

    // Load High Score from localStorage
    const savedHighScore = localStorage.getItem("hamster_high_score") || 0;
    highScoreVal.textContent = savedHighScore;

    // Simple Web Audio API Sound FX
    const playCatchSound = () => {
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = "sine";
            osc.frequency.setValueAtTime(587.33, ctx.currentTime);
            gain.gain.setValueAtTime(0.1, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + 0.1);
        } catch (e) {}
    };

    // Random hole generator without repeating consecutive hole
    function randomHole(holesList) {
        const idx = Math.floor(Math.random() * holesList.length);
        const hole = holesList[idx];
        if (hole === lastHole) {
            return randomHole(holesList);
        }
        lastHole = hole;
        return hole;
    }

    // Time ranges based on difficulty
    function getDifficultyTimes() {
        const diff = difficultySelect.value;
        if (diff === "easy") return { min: 800, max: 1400 };
        if (diff === "hard") return { min: 350, max: 700 };
        return { min: 500, max: 1000 }; // medium
    }

    // Pop hamster up
    function popHamster() {
        const { min, max } = getDifficultyTimes();
        const time = Math.round(Math.random() * (max - min) + min);
        const hole = randomHole(holes);

        hole.classList.add("up");
        hole.classList.remove("hit");

        moleTimeout = setTimeout(() => {
            hole.classList.remove("up");
            if (!timeUp) popHamster();
        }, time);
    }

    // Catch Hamster event
    function catchHamster(e) {
        const hole = this.closest(".hole");
        if (!hole.classList.contains("up") || hole.classList.contains("hit")) return;

        score += 10;
        scoreVal.textContent = score;

        hole.classList.add("hit");
        playCatchSound();

        // Hide hamster after hit
        setTimeout(() => {
            hole.classList.remove("up");
        }, 150);
    }

    holes.forEach((hole) => {
        const hamster = hole.querySelector(".hamster");
        hamster.addEventListener("click", catchHamster);
    });

    // Start Game
    function startGame() {
        // Reset state
        score = 0;
        scoreVal.textContent = score;
        countdown = 30;
        timeVal.textContent = `${countdown}s`;
        timeUp = false;
        startBtn.disabled = true;
        difficultySelect.disabled = true;
        modal.style.display = "none";

        // Start popup loop
        popHamster();

        // Start Countdown Timer
        clearInterval(timerId);
        timerId = setInterval(() => {
            countdown--;
            timeVal.textContent = `${countdown}s`;

            if (countdown <= 0) {
                clearInterval(timerId);
                clearTimeout(moleTimeout);
                timeUp = true;
                holes.forEach((h) => h.classList.remove("up"));
                endGame();
            }
        }, 1000);
    }

    // End Game
    function endGame() {
        startBtn.disabled = false;
        difficultySelect.disabled = false;
        finalScore.textContent = score;

        const currentHigh = parseInt(localStorage.getItem("hamster_high_score") || 0, 10);
        if (score > currentHigh) {
            localStorage.setItem("hamster_high_score", score);
            highScoreVal.textContent = score;
            highScoreMsg.textContent = "🏆 NEW HIGH SCORE! Outstanding reflexes!";
        } else {
            highScoreMsg.textContent = `High score remains: ${currentHigh}`;
        }

        modal.style.display = "flex";
    }

    // Reset Game
    function resetGame() {
        clearInterval(timerId);
        clearTimeout(moleTimeout);
        timeUp = true;
        score = 0;
        countdown = 30;
        scoreVal.textContent = "0";
        timeVal.textContent = "30s";
        startBtn.disabled = false;
        difficultySelect.disabled = false;
        holes.forEach((h) => h.classList.remove("up"));
        modal.style.display = "none";
    }

    startBtn.addEventListener("click", startGame);
    resetBtn.addEventListener("click", resetGame);
    playAgainBtn.addEventListener("click", startGame);
});
