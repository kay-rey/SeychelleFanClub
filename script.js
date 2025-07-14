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
