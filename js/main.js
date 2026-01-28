// Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    console.log('Basmet Etmam site loaded.');

    // Add any custom interactivity here
    
    // Example: Navbar scroll effect
    const navbar = document.querySelector('.site-header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('shadow-md');
        } else {
            navbar.classList.remove('shadow-md');
        }
    });
});
