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

// Prevent double-click behavior (optional, as single-click is already handled)
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('dblclick', function(e) {
        e.preventDefault(); // Prevent any default double-click action
    });
});