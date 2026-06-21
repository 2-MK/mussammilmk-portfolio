/* ==========================================================================
   Cozy Minimalist Portfolio JavaScript
   Mohammed Mussammil MK
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initCursor();
    initNavbar();
    initScrollReveal();
    initHRDeck();
    initSkillsTooltip();
    initTerminal();
    initBuilderWidget();
    initContactForm();
});

/* --- 1. Custom Cursor & Mouse Glow --- */
function initCursor() {
    const cursor = document.getElementById('custom-cursor');
    const cursorDot = document.getElementById('custom-cursor-dot');
    const mouseGlow = document.getElementById('mouse-glow');
    
    // Check if device supports touch pointer coarse (like mobile)
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    
    if (!isTouchDevice) {
        document.body.classList.add('cursor-active');
        
        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Instantly move the dot and glow
            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;
            
            mouseGlow.style.left = `${mouseX}px`;
            mouseGlow.style.top = `${mouseY}px`;
        });
        
        // Smooth lag effect for the outer cursor circle
        function animateCursor() {
            // Linear interpolation (Lerp) for smooth tracking
            cursorX += (mouseX - cursorX) * 0.15;
            cursorY += (mouseY - cursorY) * 0.15;
            
            cursor.style.left = `${cursorX}px`;
            cursor.style.top = `${cursorY}px`;
            
            requestAnimationFrame(animateCursor);
        }
        animateCursor();
        
        // Add hover triggers on interactive elements
        const hoverElements = document.querySelectorAll('a, button, .hr-card, .skill-item, input, label, .checkbox-label');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('hover');
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('hover');
            });
        });
    }
}

/* --- 2. Navbar Scrolling & Mobile Menu --- */
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinks = document.getElementById('nav-links');
    
    // Sticky navbar on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile toggle
    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        
        // Close menu on clicking links
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }
}

/* --- 3. Scroll Reveal --- */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.scroll-reveal, .education-card, .skills-category-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target); // Reveal once
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(el => {
        observer.observe(el);
    });
}

/* --- 4. HR Card Deck --- */
function initHRDeck() {
    const deck = document.getElementById('hr-deck');
    const cards = document.querySelectorAll('.hr-card');
    const prevBtn = document.getElementById('prev-card');
    const nextBtn = document.getElementById('next-card');
    const dotsContainer = document.getElementById('deck-dots');
    
    let currentIndex = 0;
    const totalCards = cards.length;
    
    function updateDeck() {
        cards.forEach((card, index) => {
            // Reset classes
            card.classList.remove('active', 'next', 'next-next', 'prev-stacked');
            
            // Calculate offsets relative to the active card
            let relativeIndex = (index - currentIndex + totalCards) % totalCards;
            
            if (relativeIndex === 0) {
                card.classList.add('active');
            } else if (relativeIndex === 1) {
                card.classList.add('next');
            } else if (relativeIndex === 2) {
                card.classList.add('next-next');
            } else {
                card.classList.add('prev-stacked');
            }
        });
        
        // Update navigation dots
        const dots = dotsContainer.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    // Set up initial deck state
    updateDeck();
    
    // Prev Button
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + totalCards) % totalCards;
        updateDeck();
    });
    
    // Next Button
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % totalCards;
        updateDeck();
    });
    
    // Dot Clicking
    dotsContainer.querySelectorAll('.dot').forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateDeck();
        });
    });
    
    // clicking on cards directly advances the deck
    cards.forEach(card => {
        card.addEventListener('click', () => {
            if (card.classList.contains('next') || card.classList.contains('active')) {
                currentIndex = (currentIndex + 1) % totalCards;
                updateDeck();
            }
        });
    });
}

/* --- 5. Skills Matrix Description Tooltip --- */
function initSkillsTooltip() {
    const skillItems = document.querySelectorAll('.skill-item');
    const tooltipContainer = document.getElementById('tooltip-container');
    const defaultText = tooltipContainer.innerHTML;
    
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const contextText = item.getAttribute('data-tooltip');
            tooltipContainer.innerHTML = contextText;
            tooltipContainer.classList.add('active');
        });
        
        item.addEventListener('mouseleave', () => {
            tooltipContainer.innerHTML = defaultText;
            tooltipContainer.classList.remove('active');
        });
    });
}

/* --- 6. Unix Interactive Terminal --- */
function initTerminal() {
    const input = document.getElementById('terminal-input');
    const body = document.getElementById('terminal-body');
    const terminalWindow = document.querySelector('.terminal-window');
    
    if (!input || !body) return;
    
    // Focus terminal input when clicking anywhere in terminal window
    terminalWindow.addEventListener('click', () => {
        input.focus();
    });
    
    const dossier = {
        name: "Mohammed Mussammil MK",
        role: "Software Developer | MCA Graduate",
        location: "Kerala, India",
        email: "mkmhdmussammil@gmail.com",
        phone: "+91 9074577857",
        linkedin: "linkedin.com/in/muzammil-mk-48461533a",
        github: "github.com/2-MK",
        skills: `
• Backend: Python, Django MVC Framework, SQL/MySQL, Basic C++, Java.
• Frontend: HTML5, CSS3, Bootstrap, jQuery, JavaScript.
• Network & Systems: Network Administration, DBMS, Git version control.`,
        experience: `
• Intern Web Developer (1 Year) | Sinet Institute
  - Python & Django focus. Obtained S-grade.
• Junior Project Supervisor
  - Guided 3+ projects, resolved database structures, debugged templates.
• Vacsp (Vaccine Support System)
  - Full-stack centralized vaccine administration app using Django/MySQL.`,
        education: `
• Master of Computer Applications (MCA) | APJ Abdul Kalam Technological Univ.
  - Specialization in Advanced programming and networking.
• Bachelor of Computer Applications (BCA) | University of Calicut
  - Software foundations & applications.`
    };
    
    const jokes = [
        "Why did the Django developer stay calm during the server crash?\nBecause they knew how to handle Exceptions! (And they had middleware for everything else.)",
        "Why do developers prefer dark mode?\nBecause light attracts bugs! (Good thing my portfolio is cozy dark!)",
        "Why did the database administrator get angry at the diner?\nBecause he requested a JOIN but they gave him separate plates.",
        "How do you describe a junior developer?\nAn engine of pure curiosity powered by coffee, seeking their first compile. Let's hit Run!",
        "Why did the Python function go to therapy?\nBecause it had too many parameters, suffered from indentation issues, and couldn't find its 'self'."
    ];
    
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const command = input.value.trim().toLowerCase();
            input.value = '';
            
            // Append typed line
            writeLine(`guest@mussammil-port:~$ ${command}`, 'term-muted');
            
            if (command === '') return;
            
            // Parse Command
            switch (command) {
                case 'help':
                    writeLine(`Available Commands:
  help       - Display options
  about      - Bio and profile summary
  skills     - Detailed tech stack overview
  experience - Internship & supervised projects
  education  - Academic credentials
  contact    - Retrieve phone, mail, & social coordinates
  joke       - Run a funny developer/fresher joke
  clear      - Wipe terminal history`, 'term-success');
                    break;
                case 'about':
                    writeLine(`${dossier.name}
Role: ${dossier.role}
Location: ${dossier.location}
Dossier: Highly driven Master of Computer Applications (MCA) student specializing in Python, Django, MySQL databases, and advanced computer networking. Dedicated to developing scalable solutions and ready to tackle challenges under professional guidelines.`);
                    break;
                case 'skills':
                    writeLine(dossier.skills, 'term-success');
                    break;
                case 'experience':
                    writeLine(dossier.experience);
                    break;
                case 'education':
                    writeLine(dossier.education);
                    break;
                case 'contact':
                case 'hire':
                    writeLine(`Feel free to reach out directly:
Email:    ${dossier.email}
Phone:    ${dossier.phone}
LinkedIn: ${dossier.linkedin}
GitHub:   ${dossier.github}`);
                    break;
                case 'joke':
                    const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
                    writeLine(randomJoke);
                    break;
                case 'clear':
                    body.innerHTML = '';
                    break;
                default:
                    writeLine(`command not found: ${command}. Type 'help' to show all options.`, 'term-highlight');
            }
            
            // Scroll to bottom
            setTimeout(() => {
                body.scrollTop = body.scrollHeight;
            }, 10);
        }
    });
    
    function writeLine(text, className = '') {
        const line = document.createElement('div');
        line.className = 'terminal-line ' + className;
        line.innerText = text;
        body.appendChild(line);
    }
}

/* --- 7. Build-A-Developer Checklist Widget --- */
function initBuilderWidget() {
    const checkboxes = [
        document.getElementById('attr-mca'),
        document.getElementById('attr-python'),
        document.getElementById('attr-db'),
        document.getElementById('attr-git'),
        document.getElementById('attr-adaptable'),
        document.getElementById('attr-comms')
    ];
    
    const scoreElement = document.getElementById('match-percent');
    const descriptionElement = document.getElementById('match-description');
    const copyButton = document.getElementById('btn-copy-pitch');
    
    if (!scoreElement || !descriptionElement) return;
    
    // Add change listeners
    checkboxes.forEach(cb => {
        if (cb) {
            cb.addEventListener('change', calculateCompatibility);
        }
    });
    
    function calculateCompatibility() {
        const total = checkboxes.length;
        let checkedCount = 0;
        
        checkboxes.forEach(cb => {
            if (cb && cb.checked) {
                checkedCount++;
            }
        });
        
        const score = Math.round((checkedCount / total) * 100);
        scoreElement.innerText = `${score}%`;
        
        // Update description based on percentage
        if (score === 100) {
            descriptionElement.innerText = `"Superb selection! You have checked all requirements. Mohammed Mussammil MK represents the ideal fresher package: academic depth (MCA), specialized Python/Django capabilities, version-control compliance, and a highly adaptable, cooperative mindset."`;
        } else if (score >= 80) {
            descriptionElement.innerText = `"Strong potential! Mohammed offers core Django/Python engineering, academic qualifications, and key workflow habits. A highly cost-effective addition ready to master your stack rapidly."`;
        } else if (score >= 50) {
            descriptionElement.innerText = `"Practical fit. Mohammed provides solid Python fundamentals and master-level logical education. Perfect for companies looking to nurture and mold a junior developer."`;
        } else {
            descriptionElement.innerText = `"Baseline qualified. Mohammed's MCA postgraduate degree and S-grade Python certification are always guaranteed."`;
        }
    }
    
    // Copy selection message to clipboard
    if (copyButton) {
        copyButton.addEventListener('click', () => {
            const scoreText = scoreElement.innerText;
            const chosenQualities = [];
            
            checkboxes.forEach(cb => {
                if (cb && cb.checked) {
                    // Extract text
                    const labelText = cb.closest('label').querySelector('.check-text').innerText;
                    chosenQualities.push(labelText);
                }
            });
            
            const message = `Hi Mussammil, I checked out your portfolio and generated a ${scoreText} compatibility match. We are looking for a candidate with: ${chosenQualities.join(', ')}. Let's coordinate a quick call/interview!`;
            
            navigator.clipboard.writeText(message)
                .then(() => {
                    const originalText = copyButton.innerText;
                    copyButton.innerText = "Copied to Clipboard! ✓";
                    copyButton.style.backgroundColor = "var(--color-secondary)";
                    copyButton.style.color = "var(--color-bg)";
                    
                    setTimeout(() => {
                        copyButton.innerText = originalText;
                        copyButton.style.backgroundColor = "";
                        copyButton.style.color = "";
                    }, 2500);
                })
                .catch(err => {
                    console.error('Failed to copy text: ', err);
                });
        });
    }
    
    // Initial trigger
    calculateCompatibility();
}

/* --- 8. Contact Form Handler (Mailto Fallback) --- */
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('form-name').value;
        const email = document.getElementById('form-email').value;
        const subject = document.getElementById('form-subject').value || "Portfolio Connection";
        const message = document.getElementById('form-message').value;
        
        // Open user's email client
        const mailtoUrl = `mailto:mkmhdmussammil@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent("Name: " + name + "\nEmail: " + email + "\n\nMessage:\n" + message)}`;
        window.location.href = mailtoUrl;
        
        // Show visual feedback on the button
        const submitBtn = form.querySelector('.form-submit-btn');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = 'Opening Email Client... <i class="fa-solid fa-envelope-open-text"></i>';
        submitBtn.style.backgroundColor = 'var(--color-secondary)';
        submitBtn.style.color = 'var(--color-bg)';
        
        setTimeout(() => {
            submitBtn.innerHTML = 'Message Initiated! ✓';
            form.reset();
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.backgroundColor = '';
                submitBtn.style.color = '';
            }, 3000);
        }, 1500);
    });
}
