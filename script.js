/**
 * Portfolio Website Script
 *
 * This script handles all the interactive elements of the website:
 * 1. Mobile Navigation Toggle: Opens and closes the menu on mobile.
 * 2. Theme Toggler: Switches between dark and light modes and saves the preference.
 * 3. Scroll to Top Button: Shows a button to scroll to the top after a certain scroll distance.
 * 4. Achievement Modal: Opens a popup to display achievement details.
 * 5. Contact Form Submission: Sends form data to a backend service (Formspree) without a page reload.
 */
document.addEventListener('DOMContentLoaded', () => {

    // 1. MOBILE NAVIGATION TOGGLE
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mainNav = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.main-nav a');

    if (hamburgerMenu && mainNav) {
        hamburgerMenu.addEventListener('click', () => {
            // Toggle 'active' class on hamburger icon for animation
            hamburgerMenu.classList.toggle('active');
            // Toggle 'mobile-nav-open' on the nav menu to show/hide it
            mainNav.classList.toggle('mobile-nav-open');
        });
    }
    
    // Close mobile nav when a link is clicked for smooth single-page navigation
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
    // Check for saved theme in localStorage, default to 'dark'
    const currentTheme = localStorage.getItem('theme') || 'dark';

    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'light') {
        themeToggleBtn.classList.replace('ph-sun', 'ph-moon');
    }

    themeToggleBtn.addEventListener('click', () => {
        // Switch theme
        let newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme); // Save the new theme

        // Switch icon
        themeToggleBtn.classList.toggle('ph-moon');
        themeToggleBtn.classList.toggle('ph-sun');
    });


    // 3. SCROLL TO TOP BUTTON
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    
    window.addEventListener('scroll', () => {
        // Show button if user scrolls more than 300px
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
            // Populate modal with data from the clicked item's `data-*` attributes
            modalImage.src = item.querySelector('img').src;
            modalTitle.textContent = item.dataset.title;
            modalDescription.textContent = item.dataset.description;
            modal.classList.add('visible'); // Show the modal
        });
    });

    const closeModal = () => modal.classList.remove('visible');
    closeModalBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        // Close if clicking on the dark overlay (outside the content)
        if (e.target === modal) closeModal();
    });


    // 5. CONTACT FORM SUBMISSION (using Fetch for AJAX)
    const form = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    async function handleSubmit(event) {
        event.preventDefault(); // Prevent the default page reload
        const data = new FormData(event.target);
        
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
            } else {
                // Handle server-side errors
                const responseData = await response.json();
                if (Object.hasOwn(responseData, 'errors')) {
                    formStatus.textContent = responseData["errors"].map(error => error["message"]).join(", ");
                } else {
                    formStatus.textContent = "Oops! There was a problem submitting your form.";
                }
                 formStatus.style.color = "#f43f5e"; // An error color
            }
        } catch (error) {
            // Handle network errors
            formStatus.textContent = "Oops! There was a network error.";
            formStatus.style.color = "#f43f5e";
        }
    }
    form.addEventListener("submit", handleSubmit);
});
