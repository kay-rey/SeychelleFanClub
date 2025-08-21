// Scroll animations and interactive elements
document.addEventListener("DOMContentLoaded", function () {
	// Intersection Observer for scroll animations
	const observerOptions = {
		threshold: 0.1,
		rootMargin: "0px 0px -50px 0px",
	};

	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add("visible");
			}
		});
	}, observerOptions);

	// Observe all sections
	document.querySelectorAll("section").forEach((section) => {
		observer.observe(section);
	});

	// Logo circle interactive effects
	const logoCircle = document.querySelector(".logo-circle");
	if (logoCircle) {
		logoCircle.addEventListener("mouseenter", function () {
			this.style.animationPlayState = "paused";
			createHeartBurst(this);
		});

		logoCircle.addEventListener("mouseleave", function () {
			this.style.animationPlayState = "running";
		});

		// Click effect
		logoCircle.addEventListener("click", function () {
			this.style.transform = "scale(0.9) rotate(-5deg)";
			createConfetti(this);
			setTimeout(() => {
				this.style.transform = "";
			}, 150);
		});
	}

	// Service items hover effects
	document.querySelectorAll(".service-item").forEach((item, index) => {
		item.addEventListener("mouseenter", function () {
			this.style.animationDelay = "0s";
			this.style.animation = "pulse 0.6s ease-in-out";
			createFloatingHearts(this);
		});

		item.addEventListener("mouseleave", function () {
			this.style.animation = "";
		});

		// Staggered animation on page load
		setTimeout(() => {
			item.style.opacity = "0";
			item.style.transform = "translateY(20px)";
			item.style.transition = "all 0.5s ease";

			setTimeout(() => {
				item.style.opacity = "1";
				item.style.transform = "translateY(0)";
			}, index * 100);
		}, 1000);
	});

	// About text hover effects
	document.querySelectorAll(".about-text p").forEach((paragraph, index) => {
		paragraph.addEventListener("mouseenter", function () {
			this.style.transitionDelay = "0s";
			createThoughtBubbles(this);
		});

		// Staggered appearance
		setTimeout(() => {
			paragraph.style.opacity = "0";
			paragraph.style.transform = "translateX(-20px)";
			paragraph.style.transition = "all 0.6s ease";

			setTimeout(() => {
				paragraph.style.opacity = "1";
				paragraph.style.transform = "translateX(0)";
			}, index * 200);
		}, 1500);
	});

	// CTA button effects
	const ctaButton = document.querySelector(".cta-button");
	if (ctaButton) {
		ctaButton.addEventListener("mouseenter", function () {
			this.style.animation = "bounce 0.6s ease-in-out";
			createRocketTrail(this);
		});

		ctaButton.addEventListener("mouseleave", function () {
			this.style.animation = "";
		});

		// Click ripple effect
		ctaButton.addEventListener("click", function (e) {
			const ripple = document.createElement("span");
			const rect = this.getBoundingClientRect();
			const size = Math.max(rect.width, rect.height);
			const x = e.clientX - rect.left - size / 2;
			const y = e.clientY - rect.top - size / 2;

			ripple.style.width = ripple.style.height = size + "px";
			ripple.style.left = x + "px";
			ripple.style.top = y + "px";
			ripple.classList.add("ripple");

			this.appendChild(ripple);

			setTimeout(() => {
				ripple.remove();
			}, 600);
		});
	}

	// Projects and contact list hover effects
	document
		.querySelectorAll(".projects-list li, .contact-list li")
		.forEach((item, index) => {
			// Staggered appearance
			setTimeout(() => {
				item.style.opacity = "0";
				item.style.transform = "translateY(20px)";
				item.style.transition = "all 0.5s ease";

				setTimeout(() => {
					item.style.opacity = "1";
					item.style.transform = "translateY(0)";
				}, index * 100);
			}, 2000);

			// Hover sound effect simulation
			item.addEventListener("mouseenter", function () {
				this.style.animation = "pulse 0.3s ease-in-out";
				createStarBurst(this);
			});

			item.addEventListener("mouseleave", function () {
				this.style.animation = "";
			});
		});

	// Parallax effect for hero section
	window.addEventListener("scroll", function () {
		const scrolled = window.pageYOffset;
		const heroSection = document.querySelector(".hero-section");
		if (heroSection) {
			const rate = scrolled * -0.5;
			heroSection.style.transform = `translateY(${rate}px)`;
		}
	});

	// Smooth scroll for anchor links
	document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
		anchor.addEventListener("click", function (e) {
			e.preventDefault();
			const target = document.querySelector(this.getAttribute("href"));
			if (target) {
				target.scrollIntoView({
					behavior: "smooth",
					block: "start",
				});
			}
		});
	});

	// Add some random floating elements in the background
	createFloatingElements();
	createFloatingHearts();
	createFloatingStars();

	// Add rainbow cursor trail
	createRainbowTrail();
});

// Create floating background elements
function createFloatingElements() {
	const heroSection = document.querySelector(".hero-section");
	if (!heroSection) return;

	for (let i = 0; i < 12; i++) {
		const element = document.createElement("div");
		element.className = "floating-element";
		element.style.cssText = `
            position: absolute;
            width: ${Math.random() * 30 + 15}px;
            height: ${Math.random() * 30 + 15}px;
            background: radial-gradient(circle, rgba(255, 182, 193, 0.3) 0%, transparent 70%);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 4 + 3}s ease-in-out infinite;
            animation-delay: ${Math.random() * 3}s;
            pointer-events: none;
            z-index: 0;
        `;
		heroSection.appendChild(element);
	}
}

// Create floating hearts
function createFloatingHearts() {
	const body = document.body;
	for (let i = 0; i < 8; i++) {
		setTimeout(() => {
			const heart = document.createElement("div");
			heart.innerHTML = "💖";
			heart.style.cssText = `
                position: fixed;
                font-size: ${Math.random() * 20 + 15}px;
                left: ${Math.random() * 100}%;
                top: 100%;
                z-index: 1000;
                pointer-events: none;
                animation: floatUp 4s ease-in-out infinite;
                opacity: 0.7;
            `;
			body.appendChild(heart);

			setTimeout(() => {
				heart.remove();
			}, 4000);
		}, i * 500);
	}
}

// Create floating stars
function createFloatingStars() {
	const body = document.body;
	for (let i = 0; i < 6; i++) {
		setTimeout(() => {
			const star = document.createElement("div");
			star.innerHTML = "⭐";
			star.style.cssText = `
                position: fixed;
                font-size: ${Math.random() * 15 + 10}px;
                left: ${Math.random() * 100}%;
                top: 100%;
                z-index: 1000;
                pointer-events: none;
                animation: floatUp 6s ease-in-out infinite;
                opacity: 0.8;
            `;
			body.appendChild(star);

			setTimeout(() => {
				star.remove();
			}, 6000);
		}, i * 800);
	}
}

// Create heart burst effect
function createHeartBurst(element) {
	const rect = element.getBoundingClientRect();
	for (let i = 0; i < 8; i++) {
		const heart = document.createElement("div");
		heart.innerHTML = "💖";
		heart.style.cssText = `
            position: absolute;
            font-size: 20px;
            left: ${rect.width / 2}px;
            top: ${rect.height / 2}px;
            pointer-events: none;
            z-index: 1000;
            animation: heartBurst 1s ease-out forwards;
        `;
		element.appendChild(heart);

		setTimeout(() => {
			heart.remove();
		}, 1000);
	}
}

// Create confetti effect
function createConfetti(element) {
	const rect = element.getBoundingClientRect();
	const colors = ["#ffd1dc", "#fffacd", "#a0d2db", "#e6e6fa", "#ffdab9"];

	for (let i = 0; i < 20; i++) {
		const confetti = document.createElement("div");
		confetti.style.cssText = `
            position: absolute;
            width: 8px;
            height: 8px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            left: ${rect.width / 2}px;
            top: ${rect.height / 2}px;
            pointer-events: none;
            z-index: 1000;
            animation: confettiFall 2s ease-out forwards;
        `;
		element.appendChild(confetti);

		setTimeout(() => {
			confetti.remove();
		}, 2000);
	}
}

// Create floating hearts on hover
function createFloatingHearts(element) {
	const rect = element.getBoundingClientRect();
	for (let i = 0; i < 3; i++) {
		setTimeout(() => {
			const heart = document.createElement("div");
			heart.innerHTML = "💖";
			heart.style.cssText = `
                position: fixed;
                font-size: 16px;
                left: ${rect.left + Math.random() * rect.width}px;
                top: ${rect.top}px;
                z-index: 1000;
                pointer-events: none;
                animation: floatUp 3s ease-in-out forwards;
                opacity: 0.8;
            `;
			document.body.appendChild(heart);

			setTimeout(() => {
				heart.remove();
			}, 3000);
		}, i * 200);
	}
}

// Create thought bubbles
function createThoughtBubbles(element) {
	const rect = element.getBoundingClientRect();
	const thoughts = ["💭", "💡", "🤔", "💭"];

	for (let i = 0; i < thoughts.length; i++) {
		setTimeout(() => {
			const bubble = document.createElement("div");
			bubble.innerHTML = thoughts[i];
			bubble.style.cssText = `
                position: fixed;
                font-size: 20px;
                left: ${rect.right + 20}px;
                top: ${rect.top - 20 - i * 30}px;
                z-index: 1000;
                pointer-events: none;
                animation: thoughtFloat 2s ease-in-out forwards;
                opacity: 0;
            `;
			document.body.appendChild(bubble);

			setTimeout(() => {
				bubble.remove();
			}, 2000);
		}, i * 300);
	}
}

// Create rocket trail
function createRocketTrail(element) {
	const rect = element.getBoundingClientRect();
	for (let i = 0; i < 5; i++) {
		setTimeout(() => {
			const trail = document.createElement("div");
			trail.innerHTML = "💫";
			trail.style.cssText = `
                position: fixed;
                font-size: 16px;
                left: ${rect.left - 20 - i * 15}px;
                top: ${rect.top + rect.height / 2}px;
                z-index: 1000;
                pointer-events: none;
                animation: trailFade 1s ease-out forwards;
                opacity: 0.8;
            `;
			document.body.appendChild(trail);

			setTimeout(() => {
				trail.remove();
			}, 1000);
		}, i * 100);
	}
}

// Create star burst
function createStarBurst(element) {
	const rect = element.getBoundingClientRect();
	for (let i = 0; i < 6; i++) {
		const star = document.createElement("div");
		star.innerHTML = "⭐";
		star.style.cssText = `
            position: absolute;
            font-size: 16px;
            left: ${rect.width / 2}px;
            top: ${rect.height / 2}px;
            pointer-events: none;
            z-index: 1000;
            animation: starBurst 1s ease-out forwards;
        `;
		element.appendChild(star);

		setTimeout(() => {
			star.remove();
		}, 1000);
	}
}

// Create rainbow cursor trail
function createRainbowTrail() {
	let trail = [];
	const colors = ["#ffd1dc", "#fffacd", "#a0d2db", "#e6e6fa", "#ffdab9"];

	document.addEventListener("mousemove", (e) => {
		if (trail.length > 8) {
			trail[0].remove();
			trail.shift();
		}

		const dot = document.createElement("div");
		dot.style.cssText = `
            position: fixed;
            width: 8px;
            height: 8px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            border-radius: 50%;
            left: ${e.clientX - 4}px;
            top: ${e.clientY - 4}px;
            pointer-events: none;
            z-index: 9999;
            opacity: 0.8;
            transition: all 0.1s ease;
        `;

		document.body.appendChild(dot);
		trail.push(dot);

		setTimeout(() => {
			dot.style.opacity = "0";
			dot.style.transform = "scale(0.5)";
		}, 50);
	});
}

// Add CSS for new animations
const style = document.createElement("style");
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 182, 193, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .floating-element {
        opacity: 0.6;
    }
    
    .floating-element:hover {
        opacity: 1;
    }
    
    @keyframes floatUp {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.8;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes heartBurst {
        0% {
            transform: translate(0, 0) scale(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translate(${Math.random() * 200 - 100}px, ${
	Math.random() * 200 - 100
}px) scale(1) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes confettiFall {
        0% {
            transform: translate(0, 0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translate(${Math.random() * 300 - 150}px, ${
	Math.random() * 300 - 150
}px) rotate(720deg);
            opacity: 0;
        }
    }
    
    @keyframes thoughtFloat {
        0% {
            transform: translateY(0) scale(0);
            opacity: 0;
        }
        50% {
            transform: translateY(-20px) scale(1);
            opacity: 1;
        }
        100% {
            transform: translateY(-40px) scale(0);
            opacity: 0;
        }
    }
    
    @keyframes trailFade {
        0% {
            transform: translateX(0) scale(1);
            opacity: 0.8;
        }
        100% {
            transform: translateX(-30px) scale(0.5);
            opacity: 0;
        }
    }
    
    @keyframes starBurst {
        0% {
            transform: translate(0, 0) scale(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translate(${Math.random() * 100 - 50}px, ${
	Math.random() * 100 - 50
}px) scale(1) rotate(180deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
