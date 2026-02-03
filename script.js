document.addEventListener("DOMContentLoaded", () => {
    
    // --- COUNTDOWN ---
    // Atentie: Luna in JS incepe de la 0. Ian=0, Feb=1.
    // Setam pentru 18 Februarie 2026, ora 20:00 (seara)
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
            document.querySelector(".countdown-container").innerHTML = "<h2>VERSIUNEA BETA ESTE LIVE!</h2>";
        }
    }, 1000);

    // --- PROGRESS BARS ---
    const progressSection = document.querySelector("#roadmap");
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
                
                // Culoarea depinde de card (Portocaliu daca e active-work, Cyan daca e default)
                let isWorking = circle.parentElement.classList.contains('active-work');
                let color = isWorking ? '#ff9f43' : '#00d2ff';

                if(progressEndValue === 0) {
                    circle.style.background = `conic-gradient(#333 360deg, #333 0deg)`;
                    return;
                }

                let progress = setInterval(() => {
                    progressValue++;
                    circle.querySelector(".percentage").textContent = `${progressValue}%`;
                    circle.style.background = `conic-gradient(${color} ${progressValue * 3.6}deg, #2a2a2a 0deg)`;

                    if (progressValue == progressEndValue) {
                        clearInterval(progress);
                    }
                }, speed);
            });
        }
    }, { threshold: 0.5 });

    observer.observe(progressSection);
	
	// --- 3. MOBILE MENU TOGGLE ---
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-links");

    // Cand dai click pe hamburger
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    });

    // Cand dai click pe un link, sa se inchida meniul automat
    document.querySelectorAll(".nav-links a").forEach(n => n.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    }));
});