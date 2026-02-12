const slides = document.querySelector(".slides");
let images = document.querySelectorAll(".slides img");

let index = 1;
let slideWidth;

// Clone first and last images
const firstClone = images[0].cloneNode(true);
const lastClone = images[images.length - 1].cloneNode(true);

slides.appendChild(firstClone);
slides.insertBefore(lastClone, images[0]);

images = document.querySelectorAll(".slides img");

function updateSlideWidth() {
    slideWidth = images[0].clientWidth + 20; // width + margin
}

updateSlideWidth();
window.addEventListener("resize", updateSlideWidth);

// Start at first real image
slides.style.transform = `translateX(-${slideWidth * index}px)`;

function moveToNextSlide() {
    if (index >= images.length - 1) return;

    index++;
    slides.style.transition = "transform 1s ease-in-out";
    slides.style.transform = `translateX(-${slideWidth * index}px)`;
}

slides.addEventListener("transitionend", () => {
    // If at cloned first image
    if (images[index].isSameNode(firstClone)) {
        slides.style.transition = "none";
        index = 1;
        slides.style.transform = `translateX(-${slideWidth * index}px)`;
    }

    // If at cloned last image
    if (images[index].isSameNode(lastClone)) {
        slides.style.transition = "none";
        index = images.length - 2;
        slides.style.transform = `translateX(-${slideWidth * index}px)`;
    }
});

setInterval(moveToNextSlide, 3000);

const text = "This is my first website but my last girlfriend! Do not be too impressed, this barely took me 30 minutes to make. AI has made romance so easy. Might add more features. Love youuu soooo muchhhhhh ❤️";
const typedText = document.getElementById("typed-text");

let charIndex = 0;

function typeEffect() {
    if (charIndex < text.length) {
        typedText.innerHTML += text.charAt(charIndex);
        charIndex++;
        setTimeout(typeEffect, 50);
    }
}

typeEffect();

function createHeart() {
    const heart = document.createElement("div");
    heart.innerHTML = "💗";
    heart.style.position = "fixed";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.bottom = "-10px";
    heart.style.fontSize = Math.random() * 20 + 15 + "px";
    heart.style.animation = "floatUp 6s linear";
    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 6000);
}

setInterval(createHeart, 800);


// 🌌 STARFIELD ANIMATION

const canvas = document.getElementById("starfield");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initStars();
});

let stars = [];
const numberOfStars = 150;

class Star {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 6 + 1.5;
        this.speed = Math.random() * 0.5 + 0.2;
        this.opacity = Math.random();
    }

    update() {
        this.y += this.speed;

        if (this.y > canvas.height) {
            this.reset();
            this.y = 0;
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 182, 193, ${this.opacity})`; // soft pink stars
        ctx.fill();
    }
}

function initStars() {
    stars = [];
    for (let i = 0; i < numberOfStars; i++) {
        stars.push(new Star());
    }
}

function animateStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    stars.forEach(star => {
        star.update();
        star.draw();
    });

    requestAnimationFrame(animateStars);
}

initStars();
animateStars();
