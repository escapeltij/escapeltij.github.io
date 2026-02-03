document.addEventListener("DOMContentLoaded", () => {
    
    // ==================================================
    // 1. MENIUL DE MOBIL (HAMBURGER) - PRIORITATE MAXIMĂ
    // ==================================================
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-links");

    // Verificăm dacă există meniul pe pagină (ca să nu dea eroare)
    if (hamburger && navMenu) {
        // Când dai click pe hamburger
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
        });

        // Când dai click pe un link, închidem meniul
        document.querySelectorAll(".nav-links a").forEach(n => n.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navMenu.classList.remove("active");
        }));
    }

    // ==================================================
    // 2. COUNTDOWN TIMER (Doar dacă există pe pagină)
    // ==================================================
    const daysElement = document.getElementById("days");
    
    if (daysElement) { // Daca gasim elementul "zile", inseamna ca suntem pe Home
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

    // ==================================================
    // 3. PROGRESS BARS (Doar dacă există pe pagină)
    // ==================================================
    const progressSection = document.querySelector("#roadmap");
    
    if (progressSection) { // Rulam asta doar daca exista sectiunea Roadmap
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
                        // Verificam daca exista elementul text inainte sa scriem in el
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
});