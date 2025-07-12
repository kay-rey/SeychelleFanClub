// --- Animate on Scroll Initialization ---
AOS.init({
    duration: 1000, // Animation duration in milliseconds
    once: true,     // Whether animation should happen only once - while scrolling down
    offset: 100,    // Offset (in px) from the original trigger point
    easing: 'ease-in-out', // Default easing for AOS animations
});


// --- Hero Headline Letter Animation ---
document.addEventListener('DOMContentLoaded', () => {
    const headline = document.querySelector('.hero-headline');
    if (headline) {
        const text = headline.textContent;
        const characters = text.split('');

        headline.innerHTML = ''; // Clear the original text

        characters.forEach((char, index) => {
            const span = document.createElement('span');
            // If the character is a space, use a non-breaking space
            span.innerHTML = char === ' ' ? '&nbsp;' : char;
            // Stagger the animation delay for each letter
            span.style.animationDelay = `${index * 50}ms`;
            headline.appendChild(span);
        });
    }
});