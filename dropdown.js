document.addEventListener("DOMContentLoaded", function() {
    // Select the dropdown button and content
    const menuButton = document.querySelector(".dropdown"); // Menu button
    const dropdownContent = document.querySelector(".dropdown-content"); // Dropdown menu
    const close = document.querySelector(".close-button");

    // Toggle dropdown when clicking the menu button
    menuButton.addEventListener("click", function(event) {
        dropdownContent.classList.toggle("active");
        event.stopPropagation(); // Prevents event from bubbling up
    });

    // Close dropdown when clicking outside
    close.addEventListener("click", function(event) {
        dropdownContent.classList.remove("active");
        event.stopPropagation(); 
    })
    document.addEventListener("click", function(event) {
        if (!menuButton.contains(event.target) && !dropdownContent.contains(event.target)) {
            dropdownContent.classList.remove("active");
        }
    });
});
