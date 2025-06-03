document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');
    const allNavLinks = document.querySelectorAll('.nav-links li a'); // For closing nav on link click

    // Toggle nav
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('nav-active');
            hamburger.classList.toggle('toggle');

            // ARIA attribute for accessibility
            const isExpanded = navLinks.classList.contains('nav-active');
            hamburger.setAttribute('aria-expanded', isExpanded);

            // Prevent body scroll when nav is open
            if (isExpanded) {
                document.body.style.overflowY = 'hidden'; // Use overflowY to allow potential horizontal scroll on body if needed
            } else {
                document.body.style.overflowY = 'auto';
            }
        });
    }

    // Close nav when a link is clicked (for single-page navigation)
    allNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('nav-active')) {
                navLinks.classList.remove('nav-active');
                hamburger.classList.remove('toggle');
                hamburger.setAttribute('aria-expanded', 'false');
                document.body.style.overflowY = 'auto';
            }
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            // Ensure it's a valid ID selector and not just "#"
            if (href.length > 1 && href.startsWith('#')) {
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    e.preventDefault();
                    const header = document.querySelector('.site-header');
                    const headerOffset = header ? header.offsetHeight : 0;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });
                }
            }
        });
    });

    // Update current year in footer
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
});
