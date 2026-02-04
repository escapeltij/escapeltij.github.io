document.addEventListener("DOMContentLoaded", () => {
    
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-links");

    if (hamburger && navMenu) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
        });

        document.querySelectorAll(".nav-links a").forEach(n => n.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navMenu.classList.remove("active");
        }));
    }

    const daysElement = document.getElementById("days");
    
    if (daysElement) {
        const releaseDate = new Date("2026-02-18T20:00:00+02:00").getTime();

        const timer = setInterval(function() {
            const now = new Date().getTime();
            const distance = releaseDate - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById("days").innerText = days < 10 ? "0" + days : days;
            document.getElementById("hours").innerText = hours < 10 ? "0" + hours : hours;
            document.getElementById("minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
            document.getElementById("seconds").innerText = seconds < 10 ? "0" + seconds : seconds;

            if (distance < 0) {
                clearInterval(timer);
                const container = document.querySelector(".countdown-container");
                if(container) container.innerHTML = "<h2>VERSIUNEA BETA ESTE LIVE!</h2>";
            }
        }, 1000);
    }

    const progressSection = document.querySelector("#roadmap");
    
    if (progressSection) {
        const progressCircles = document.querySelectorAll(".circular-progress");
        let animated = false;

        const observer = new IntersectionObserver((entries) => {
            const [entry] = entries;
            if (entry.isIntersecting && !animated) {
                animated = true;
                progressCircles.forEach(circle => {
                    let progressValue = 0;
                    let progressEndValue = parseInt(circle.getAttribute("data-progress"));
                    let speed = 20;
                    
                    let isWorking = circle.parentElement.classList.contains('active-work');
                    let color = isWorking ? '#ff9f43' : '#00d2ff';

                    if(progressEndValue === 0) {
                        circle.style.background = `conic-gradient(#333 360deg, #333 0deg)`;
                        return;
                    }

                    let progress = setInterval(() => {
                        progressValue++;
                        const percentageText = circle.querySelector(".percentage");
                        if(percentageText) percentageText.textContent = `${progressValue}%`;
                        
                        circle.style.background = `conic-gradient(${color} ${progressValue * 3.6}deg, #2a2a2a 0deg)`;

                        if (progressValue == progressEndValue) {
                            clearInterval(progress);
                        }
                    }, speed);
                });
            }
        }, { threshold: 0.5 });

        observer.observe(progressSection);
    }

    // Slideshow functionality
    let currentSlideIndex = 0;
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.slide-dot');

    window.changeSlide = function(direction) {
        currentSlideIndex += direction;
        
        if (currentSlideIndex >= slides.length) {
            currentSlideIndex = 0;
        }
        if (currentSlideIndex < 0) {
            currentSlideIndex = slides.length - 1;
        }
        
        showSlide(currentSlideIndex);
    };

    window.currentSlide = function(index) {
        currentSlideIndex = index;
        showSlide(currentSlideIndex);
    };

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (dots[i]) dots[i].classList.remove('active');
        });
        
        if (slides[index]) slides[index].classList.add('active');
        if (dots[index]) dots[index].classList.add('active');
    }

    // Auto-advance slideshow every 5 seconds
    if (slides.length > 0) {
        setInterval(() => {
            changeSlide(1);
        }, 5000);
    }

});