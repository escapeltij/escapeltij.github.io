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

    const carouselContainer = document.querySelector(".carousel-container");
    
    if (carouselContainer) {
        const slides = document.querySelectorAll(".carousel-slide");
        const prevBtn = document.getElementById("prevSlide");
        const nextBtn = document.getElementById("nextSlide");
        const dotsContainer = document.getElementById("carouselDots");
        let currentSlide = 0;

        slides.forEach((_, index) => {
            const dot = document.createElement("button");
            dot.classList.add("carousel-dot");
            if (index === 0) dot.classList.add("active");
            dot.addEventListener("click", () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });

        const dots = document.querySelectorAll(".carousel-dot");

        function updateSlides() {
            slides.forEach((slide, index) => {
                slide.classList.remove("active", "next", "prev", "hidden");
                dots[index].classList.remove("active");
                
                if (index === currentSlide) {
                    slide.classList.add("active");
                } else if (index === (currentSlide + 1) % slides.length) {
                    slide.classList.add("next");
                } else if (index === (currentSlide - 1 + slides.length) % slides.length) {
                    slide.classList.add("prev");
                } else {
                    slide.classList.add("hidden");
                }
            });
            dots[currentSlide].classList.add("active");
        }

        function goToSlide(index) {
            currentSlide = index;
            updateSlides();
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            updateSlides();
        }

        function prevSlide() {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            updateSlides();
        }

        nextBtn.addEventListener("click", nextSlide);
        prevBtn.addEventListener("click", prevSlide);

        let startX = 0;
        let endX = 0;

        carouselContainer.addEventListener("touchstart", (e) => {
            startX = e.touches[0].clientX;
        });

        carouselContainer.addEventListener("touchend", (e) => {
            endX = e.changedTouches[0].clientX;
            if (startX - endX > 50) {
                nextSlide();
            } else if (endX - startX > 50) {
                prevSlide();
            }
        });

        updateSlides();
    }
});