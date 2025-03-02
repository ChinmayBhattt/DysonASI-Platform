
        function copyCode(button) {
            const codeBlock = button.previousElementSibling;
            const text = codeBlock.textContent;
            navigator.clipboard.writeText(text).then(() => {
                button.textContent = "Copied!";
                setTimeout(() => button.textContent = "Copy", 2000);
            }).catch(err => console.error("Failed to copy:", err));
        }

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
                    text = 'DysonASI’s AI chatbot is built to revolutionize how we interact with technology. Leveraging advanced natural language processing and real-time data, it provides seamless, context-aware responses that adapt to user needs. Whether you’re seeking answers, brainstorming ideas, or automating tasks, DysonASI is your intelligent companion.';
                } else if (title === 'Partnering for Progress: Our $6B Milestone') {
                    text = 'Our recent $6B funding milestone marks a significant step forward in our journey. This investment empowers us to deepen collaborations with global leaders across industries like healthcare, space exploration, and renewable energy. Together, we’re driving innovation that tackles humanity’s biggest challenges.';
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
