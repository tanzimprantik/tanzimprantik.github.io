document.addEventListener('DOMContentLoaded', () => {

    // --- MOBILE NAVIGATION TOGGLE ---
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mainNav = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.main-nav a');

    hamburgerMenu.addEventListener('click', () => {
        hamburgerMenu.classList.toggle('active');
        mainNav.classList.toggle('mobile-nav-open');
    });
    
    // Close mobile nav when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mainNav.classList.contains('mobile-nav-open')) {
                hamburgerMenu.classList.remove('active');
                mainNav.classList.remove('mobile-nav-open');
            }
        });
    });


    // --- THEME TOGGLER (DARK/LIGHT MODE) ---
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const currentTheme = localStorage.getItem('theme') || 'dark';

    // Set initial theme on page load
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'light') {
        themeToggleBtn.classList.replace('ph-sun', 'ph-moon');
    }

    themeToggleBtn.addEventListener('click', () => {
        let newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);

        // Change icon
        if (newTheme === 'light') {
            themeToggleBtn.classList.replace('ph-sun', 'ph-moon');
        } else {
            themeToggleBtn.classList.replace('ph-moon', 'ph-sun');
        }
    });


    // --- SCROLL TO TOP BUTTON ---
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });


    // --- ACHIEVEMENT MODAL ---
    const modal = document.getElementById('achievementModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const closeModalBtn = document.querySelector('.close-btn');
    const achievementItems = document.querySelectorAll('.achievement-item');

    achievementItems.forEach(item => {
        item.addEventListener('click', () => {
            const imgSrc = item.querySelector('img').src;
            const title = item.dataset.title;
            const description = item.dataset.description;

            modalImage.src = imgSrc;
            modalTitle.textContent = title;
            modalDescription.textContent = description;

            modal.classList.add('visible');
        });
    });

    const closeModal = () => {
        modal.classList.remove('visible');
    };

    closeModalBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
});
