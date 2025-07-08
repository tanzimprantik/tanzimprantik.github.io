/**
 * Portfolio Website Script - Professional Version
 *
 * This script handles all the interactive elements of the website:
 * 1. Mobile Navigation Toggle: Opens and closes the menu on mobile.
 * 2. Theme Toggler: Switches between dark and light modes and saves the preference.
 * 3. Scroll to Top Button: Shows a button to scroll to the top after a certain scroll distance.
 * 4. Achievement Modal: Opens a popup to display achievement details.
 * 5. Advanced Contact Form Handling (NEW):
 * - Live, client-side email validation.
 * - Disables the submit button during submission to prevent duplicates.
 * - Provides clear, interactive feedback for success and error states.
 */
document.addEventListener('DOMContentLoaded', () => {

    // 1. MOBILE NAVIGATION TOGGLE
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mainNav = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.main-nav a');

    if (hamburgerMenu && mainNav) {
        hamburgerMenu.addEventListener('click', () => {
            hamburgerMenu.classList.toggle('active');
            mainNav.classList.toggle('mobile-nav-open');
        });
    }
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mainNav.classList.contains('mobile-nav-open')) {
                hamburgerMenu.classList.remove('active');
                mainNav.classList.remove('mobile-nav-open');
            }
        });
    });


    // 2. THEME TOGGLER (DARK/LIGHT MODE)
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const currentTheme = localStorage.getItem('theme') || 'dark';

    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'light') {
        themeToggleBtn.classList.replace('ph-sun', 'ph-moon');
    }

    themeToggleBtn.addEventListener('click', () => {
        let newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        themeToggleBtn.classList.toggle('ph-moon');
        themeToggleBtn.classList.toggle('ph-sun');
    });


    // 3. SCROLL TO TOP BUTTON
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });


    // 4. ACHIEVEMENT MODAL
    const modal = document.getElementById('achievementModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const closeModalBtn = document.querySelector('.close-btn');
    const achievementItems = document.querySelectorAll('.achievement-item');

    achievementItems.forEach(item => {
        item.addEventListener('click', () => {
            modalImage.src = item.querySelector('img').src;
            modalTitle.textContent = item.dataset.title;
            modalDescription.textContent = item.dataset.description;
            modal.classList.add('visible');
        });
    });

    const closeModal = () => modal.classList.remove('visible');
    closeModalBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });


    // 5. ADVANCED CONTACT FORM HANDLING
    const form = document.getElementById('contact-form');
    const emailInput = form.querySelector('input[name="email"]');
    const submitButton = form.querySelector('button[type="submit"]');
    const formStatus = document.getElementById('form-status');

    // Function to validate email format using a regular expression
    function isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    // Live validation for the email field
    emailInput.addEventListener('input', () => {
        if (isValidEmail(emailInput.value)) {
            emailInput.style.borderColor = 'var(--color-primary)';
            formStatus.textContent = ""; // Clear previous error messages
        } else {
            emailInput.style.borderColor = '#f43f5e'; // Error color
        }
    });

    async function handleSubmit(event) {
        event.preventDefault(); // Stop the default browser submission

        // Final check before submitting
        if (!isValidEmail(emailInput.value)) {
            formStatus.textContent = "Please enter a valid email address.";
            formStatus.style.color = "#f43f5e";
            emailInput.focus();
            return;
        }

        const data = new FormData(event.target);
        
        // Change button to "Sending..." and disable it
        submitButton.textContent = "Sending...";
        submitButton.disabled = true;
        formStatus.textContent = ""; // Clear status

        try {
            const response = await fetch(event.target.action, {
                method: form.method,
                body: data,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                formStatus.textContent = "Thanks for your message!";
                formStatus.style.color = "var(--color-primary)";
                form.reset(); // Clear the form fields
                emailInput.style.borderColor = 'var(--color-border)'; // Reset border
            } else {
                const responseData = await response.json();
                if (Object.hasOwn(responseData, 'errors')) {
                    formStatus.textContent = responseData["errors"].map(error => error["message"]).join(", ");
                } else {
                    formStatus.textContent = "Oops! There was a problem submitting your form.";
                }
                 formStatus.style.color = "#f43f5e";
            }
        } catch (error) {
            formStatus.textContent = "Oops! There was a network error. Please check your connection.";
            formStatus.style.color = "#f43f5e";
        } finally {
            // Re-enable the button and reset its text regardless of outcome
            submitButton.textContent = "Send Message";
            submitButton.disabled = false;
        }
    }
    form.addEventListener("submit", handleSubmit);
});
