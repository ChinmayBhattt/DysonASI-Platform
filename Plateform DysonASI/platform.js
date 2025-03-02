function copyCode(button) {
    const codeBlock = button.previousElementSibling; // Get the pre.code-block before the button
    const text = codeBlock.textContent;
    navigator.clipboard.writeText(text).then(() => {
        button.textContent = "Copied!";
        setTimeout(() => button.textContent = "Copy", 2000); // Reset after 2 seconds
    }).catch(err => console.error("Failed to copy:", err));
}

// Smooth scroll function for navbar links
function scrollToSection(sectionId) {
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}
// Slider Initialization
document.addEventListener("DOMContentLoaded", () => {
    const slider = document.querySelector(".slider");
    const cards = document.querySelectorAll(".card");
    const cardCount = cards.length;

    // Calculate the total width of one set of cards
    const cardWidth = 360 + 30; // Card width (360px) + total margin (15px each side = 30px)
    const totalOriginalWidth = cardWidth * cardCount;

    // Duplicate cards once to ensure seamless looping
    cards.forEach(card => {
        const clone = card.cloneNode(true);
        slider.appendChild(clone);
    });

    // Set the animation to move by the total width of the original card set
    const translatePercentage = (totalOriginalWidth / (totalOriginalWidth * 2)) * 100; // Half the total width after duplication
    slider.style.setProperty('--translate-end', `-${translatePercentage}%`);
    slider.style.animation = `slide 20s linear infinite`; // Base speed (20s)

    // Update the keyframes dynamically (optional, but ensures compatibility)
    const styleSheet = document.styleSheets[0];
    const keyframeRule = `@keyframes slide {
        0% { transform: translateX(0); }
        100% { transform: translateX(var(--translate-end)); }
    }`;
    // Remove any existing slide keyframe rule to avoid duplicates
    for (let i = 0; i < styleSheet.cssRules.length; i++) {
        if (styleSheet.cssRules[i].name === "slide") {
            styleSheet.deleteRule(i);
            break;
        }
    }
    styleSheet.insertRule(keyframeRule, styleSheet.cssRules.length);

    // Pause slider on click and handle popup
    slider.addEventListener("click", (e) => {
        const card = e.target.closest(".card");
        if (card) {
            slider.classList.toggle("paused");
            const readMoreLink = card.querySelector(".read-more");
            if (e.target === readMoreLink) {
                e.preventDefault();
                const title = card.querySelector("h3").textContent;
                let text = "";
                if (title === "The Future of AI-Powered Conversations") {
                    text = "DysonASI’s AI chatbot is built to revolutionize how we interact with technology. Leveraging advanced natural language processing and real-time data, it provides seamless, context-aware responses that adapt to user needs. Whether you’re seeking answers, brainstorming ideas, or automating tasks, DysonASI is your intelligent companion.";
                } else if (title === "Partnering for Progress: Our $6B Milestone") {
                    text = "Our recent $6B funding milestone marks a significant step forward in our journey. This investment empowers us to deepen collaborations with global leaders across industries like healthcare, space exploration, and renewable energy. Together, we’re driving innovation that tackles humanity’s biggest challenges.";
                } else if (title === "Exploring the Cosmos with AI") {
                    text = "DysonASI empowers space exploration by simulating complex missions and optimizing trajectories with AI. From designing rockets to predicting cosmic events, our platform accelerates humanity’s journey to the stars, blending cutting-edge technology with the dream of interplanetary discovery.";
                }
                openPopup(title, text);
            }
        }
    });
});
// Prevent double-click behavior (optional, as single-click is already handled)
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('dblclick', function(e) {
        e.preventDefault(); // Prevent any default double-click action
    });
});