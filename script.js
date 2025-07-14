// --- Animate on Scroll Initialization ---
AOS.init({
	duration: 1000, // Animation duration in milliseconds
	once: true, // Whether animation should happen only once - while scrolling down
	offset: 100, // Offset (in px) from the original trigger point
	easing: "ease-in-out", // Default easing for AOS animations
});

// --- Animate ALL Headings with the .animated-heading class ---
document.addEventListener("DOMContentLoaded", () => {
	const animatedHeadings = document.querySelectorAll(".animated-heading");

	animatedHeadings.forEach((heading) => {
		const text = heading.textContent.trim();
		const words = text.split(" ");

		heading.innerHTML = ""; // Clear the original text

		words.forEach((word) => {
			const wordContainer = document.createElement("span");
			wordContainer.className = "word";

			const characters = word.split("");
			characters.forEach((char, index) => {
				const letterSpan = document.createElement("span");
				letterSpan.className = "letter";
				letterSpan.textContent = char;
				letterSpan.style.animationDelay = `${index * 50}ms`;
				wordContainer.appendChild(letterSpan);
			});

			heading.appendChild(wordContainer);
			heading.appendChild(document.createTextNode(" "));
		});
	});

	// --- Celebrity Lookalike Mobile Tap Functionality ---
	const lookalikeContainer = document.querySelector(".lookalike-container");
	if (lookalikeContainer) {
		lookalikeContainer.addEventListener("click", () => {
			lookalikeContainer.classList.toggle("is-flipped");
		});
	}
});
