/**
 * Sliding Photo Carousel — script.js
 */

document.addEventListener("DOMContentLoaded", () => {
    const track = document.getElementById("slides-track");
    const slides = document.querySelectorAll(".slide");
    const dots = document.querySelectorAll(".dot");
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");
    const autoplayBtn = document.getElementById("autoplay-btn");
    const currentNum = document.getElementById("current-slide-num");
    const totalNum = document.getElementById("total-slides-num");
    const progressBar = document.getElementById("progress-bar");
    const carousel = document.getElementById("carousel");

    const totalSlides = slides.length;
    totalNum.textContent = totalSlides;

    let currentIndex = 0;
    let isAutoplay = true;
    let autoInterval = null;
    let progressTimer = null;
    let progressElapsed = 0;
    const SLIDE_DURATION = 3500; // 3.5 seconds

    function updateCarousel() {
        // Move slides track
        track.style.transform = `translateX(-${currentIndex * 100}%)`;

        // Update dots
        dots.forEach((dot, idx) => {
            dot.classList.toggle("active", idx === currentIndex);
        });

        // Update counter
        currentNum.textContent = currentIndex + 1;

        // Reset progress bar
        resetProgressBar();
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateCarousel();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateCarousel();
    }

    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
    }

    // Auto-play progress bar
    function resetProgressBar() {
        clearInterval(progressTimer);
        progressElapsed = 0;
        progressBar.style.width = "0%";

        if (!isAutoplay) return;

        const updateInterval = 50;
        progressTimer = setInterval(() => {
            progressElapsed += updateInterval;
            const pct = Math.min(100, (progressElapsed / SLIDE_DURATION) * 100);
            progressBar.style.width = `${pct}%`;

            if (progressElapsed >= SLIDE_DURATION) {
                clearInterval(progressTimer);
                nextSlide();
            }
        }, updateInterval);
    }

    function toggleAutoplay() {
        isAutoplay = !isAutoplay;
        if (isAutoplay) {
            autoplayBtn.textContent = "⏸ Pause Auto-Play";
            resetProgressBar();
        } else {
            autoplayBtn.textContent = "▶ Resume Auto-Play";
            clearInterval(progressTimer);
            progressBar.style.width = "0%";
        }
    }

    // Event listeners
    nextBtn.addEventListener("click", () => {
        nextSlide();
    });

    prevBtn.addEventListener("click", () => {
        prevSlide();
    });

    dots.forEach((dot) => {
        dot.addEventListener("click", () => {
            const idx = parseInt(dot.getAttribute("data-slide"), 10);
            goToSlide(idx);
        });
    });

    autoplayBtn.addEventListener("click", toggleAutoplay);

    // Pause on hover
    carousel.addEventListener("mouseenter", () => {
        if (isAutoplay) {
            clearInterval(progressTimer);
        }
    });

    carousel.addEventListener("mouseleave", () => {
        if (isAutoplay) {
            resetProgressBar();
        }
    });

    // Keyboard navigation (Left / Right arrow keys)
    window.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft") prevSlide();
        if (e.key === "ArrowRight") nextSlide();
    });

    // Start initial progress
    updateCarousel();
});
