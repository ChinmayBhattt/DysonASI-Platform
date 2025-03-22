function scrollToSection(sectionId) {
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('dblclick', function(e) {
        e.preventDefault();
    });
});

function openPopup(title, text) {
    document.getElementById('popup-title').textContent = title;
    document.getElementById('popup-text').textContent = text;
    document.getElementById('popup').style.display = 'flex';
}

function closePopup() {
    document.getElementById('popup').style.display = 'none';
}

document.querySelectorAll('.card a.read-more').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const title = this.parentElement.querySelector('h3').textContent;
        let text = '';
        if (title === 'The Future of AI-Powered Conversations') {
            text = 'DysonASI AI chatbot is built to revolutionize how we interact with technology. Leveraging advanced natural language processing and real-time data, it provides seamless, context-aware responses that adapt to user needs. Whether you re seeking answers, brainstorming ideas, or automating tasks, DysonASI is your intelligent companion.';
        } else if (title === 'Partnering for Progress: Our $6B Milestone') {
            text = 'Our recent $6B funding milestone marks a significant step forward in our journey. This investment empowers us to deepen collaborations with global leaders across industries like healthcare, space exploration, and renewable energy. Together, were driving innovation that tackles humanity biggest challenges.';
        } else if (title === 'Exploring the Cosmos with AI') {
            text = 'DysonASI empowers the future of space exploration by simulating and optimizing mission parameters. From trajectory planning to resource management, our AI tools help engineers and scientists design more efficient and ambitious interplanetary missions.';
        }
        openPopup(title, text);
    });
});

document.getElementById('popup').addEventListener('click', function(e) {
    if (e.target === this) {
        closePopup();
    }
});

// Duplicate slider content for infinite scroll
const slider = document.querySelector('.slider');
slider.innerHTML += slider.innerHTML; // Duplicate the cards

// Add hamburger menu button to HTML
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

document.addEventListener('DOMContentLoaded', function() {
    // Create and append overlay
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    document.body.appendChild(overlay);

    // Create sidebar
    const sidebar = document.createElement('div');
    sidebar.className = 'sidebar';
    sidebar.innerHTML = `
        <div class="sidebar-links">
            <a href="#hero" onclick="scrollToSection('hero')">DYSONASI</a>
            <a href="#chat-api" onclick="scrollToSection('chat-api')">API</a>
            <a href="#documentation" onclick="scrollToSection('documentation')">DOCS</a>
            <a href="#about" onclick="scrollToSection('about')">ABOUT</a>
            <a href="#careers" onclick="scrollToSection('careers')">INSTALLATIONS</a>
        </div>
    `;
    document.body.appendChild(sidebar);

    // Get toggle button
    const toggleButton = document.querySelector('.sidebar-toggle');

    // Toggle sidebar function
    function toggleSidebar() {
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.classList.toggle('sidebar-active');
        const isOpen = sidebar.classList.contains('active');
        toggleButton.innerHTML = isOpen ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    }

    // Event listeners
    if (toggleButton) {
        toggleButton.addEventListener('click', toggleSidebar);
    }
    
    overlay.addEventListener('click', toggleSidebar);

    // Close sidebar when clicking a link
    const sidebarLinks = sidebar.querySelectorAll('a');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', () => {
            toggleSidebar();
        });
    });

    // Close sidebar when pressing Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && sidebar.classList.contains('active')) {
            toggleSidebar();
        }
    });

    // Handle resize events
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            // Remove mobile elements if screen becomes larger than mobile breakpoint
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
            document.body.classList.remove('sidebar-active');
        }
    });
});