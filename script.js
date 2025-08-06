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

// --- Interactive Photo Gallery Lightbox ---
document.addEventListener("DOMContentLoaded", () => {
	const galleryPhotos = Array.from(document.querySelectorAll(".gallery-photo"));
	const lightbox = document.getElementById("lightbox");
	const lightboxImg = document.getElementById("lightbox-img");
	const lightboxClose = document.getElementById("lightbox-close");
	const lightboxPrev = document.getElementById("lightbox-prev");
	const lightboxNext = document.getElementById("lightbox-next");
	let currentIndex = 0;

	function openLightbox(index) {
		currentIndex = index;
		lightboxImg.src = galleryPhotos[index].src;
		lightbox.style.display = "flex";
		document.body.style.overflow = "hidden";
	}

	function closeLightbox() {
		lightbox.style.display = "none";
		document.body.style.overflow = "";
	}

	function showPrev() {
		currentIndex =
			(currentIndex - 1 + galleryPhotos.length) % galleryPhotos.length;
		lightboxImg.src = galleryPhotos[currentIndex].src;
	}

	function showNext() {
		currentIndex = (currentIndex + 1) % galleryPhotos.length;
		lightboxImg.src = galleryPhotos[currentIndex].src;
	}

	galleryPhotos.forEach((img, idx) => {
		img.addEventListener("click", () => openLightbox(idx));
		img.addEventListener("keydown", (e) => {
			if (e.key === "Enter" || e.key === " ") openLightbox(idx);
		});
	});

	lightboxClose.addEventListener("click", closeLightbox);
	lightboxPrev.addEventListener("click", showPrev);
	lightboxNext.addEventListener("click", showNext);

	// Keyboard navigation
	document.addEventListener("keydown", (e) => {
		if (lightbox.style.display === "flex") {
			if (e.key === "ArrowLeft") showPrev();
			if (e.key === "ArrowRight") showNext();
			if (e.key === "Escape") closeLightbox();
		}
	});

	// Click outside image to close
	lightbox.addEventListener("click", (e) => {
		if (e.target === lightbox) closeLightbox();
	});

	// Swipe support for mobile
	let startX = null;
	lightboxImg.addEventListener("touchstart", (e) => {
		startX = e.touches[0].clientX;
	});
	lightboxImg.addEventListener("touchend", (e) => {
		if (startX === null) return;
		let endX = e.changedTouches[0].clientX;
		if (endX - startX > 50) showPrev();
		if (startX - endX > 50) showNext();
		startX = null;
	});
});

// --- Poem Creator Functionality ---
document.addEventListener("DOMContentLoaded", () => {
	const poemButton = document.getElementById("poem-button");
	const poemContainer = document.getElementById("poem-container");
	const poemOutput = document.getElementById("poem-output");
	const loader = document.getElementById("loader");

	// Generate poem
	poemButton.addEventListener("click", generatePoem);

	async function generatePoem() {
		// 1. Disable button and show loading state
		poemButton.disabled = true;
		poemButton.textContent = "✨ Thinking...";
		poemOutput.innerHTML =
			'<div style="display: flex; align-items: center; justify-content: center;"><p>Creating your poem...</p><div class="spinner"></div></div>';

		// 2. Use a premade prompt for the Gemini API
		const prompt = `Write a short, heartfelt, and romantic poem for my wife Seychelle. The poem must be exactly 4 lines long and express love, admiration, and appreciation. Make it sweet and personal.`;

		// 3. Call the Gemini API
		try {
			const generatedText = await callGemini(prompt);
			poemOutput.textContent = generatedText;
		} catch (error) {
			console.error("Error calling Gemini API:", error);
			poemOutput.textContent =
				"Sorry, my poetic inspiration failed me. Please try again.";
		} finally {
			// 4. Reset the button
			resetButton();
		}
	}

	function resetButton() {
		poemButton.disabled = false;
		poemButton.textContent = "✨ Write Another Poem for Seychelle";
	}

	// --- Gemini API Call with Exponential Backoff ---
	async function callGemini(prompt, maxRetries = 3) {
		const apiKey = ""; // API key will be injected by the environment
		const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

		const payload = {
			contents: [
				{
					role: "user",
					parts: [{ text: prompt }],
				},
			],
		};

		for (let i = 0; i < maxRetries; i++) {
			try {
				const response = await fetch(apiUrl, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(payload),
				});

				if (!response.ok) {
					throw new Error(`API request failed with status ${response.status}`);
				}

				const result = await response.json();

				if (
					result.candidates &&
					result.candidates.length > 0 &&
					result.candidates[0].content &&
					result.candidates[0].content.parts &&
					result.candidates[0].content.parts.length > 0
				) {
					return result.candidates[0].content.parts[0].text;
				} else {
					throw new Error("Invalid response structure from API.");
				}
			} catch (error) {
				console.error(`Attempt ${i + 1} failed:`, error);
				if (i === maxRetries - 1) throw error; // Rethrow last error
				const delay = Math.pow(2, i) * 1000; // 1s, 2s, 4s
				await new Promise((res) => setTimeout(res, delay));
			}
		}
	}
});
