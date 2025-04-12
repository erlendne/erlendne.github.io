// This file contains JavaScript code for handling dynamic behavior on the webpage.

document.addEventListener('DOMContentLoaded', function() {
    const menuItems = document.querySelectorAll('.menu-item');
    const menuBar = document.querySelector('.menu-bar') || document.querySelector('nav');

    // Set fixed dimensions for the menu bar for consistency
    if (menuBar) {
        menuBar.style.height = '60px';
        menuBar.style.width = '100%';
    }
    
    // Ensure menu items display horizontally
    menuItems.forEach(item => {
        item.style.display = 'inline-block';
        item.style.marginRight = '20px';
        
        item.addEventListener('click', function() {
            // Add active class to the clicked menu item
            menuItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Function to maintain consistent menu bar size when resizing
    window.addEventListener('resize', function() {
        if (menuBar) {
            menuBar.style.height = '60px';
            menuBar.style.width = '100%';
        }
    });
});