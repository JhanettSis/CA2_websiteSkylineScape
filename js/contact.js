// Wait for the form to be submitted
document.getElementById('contact_form').addEventListener('submit', function(event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Capture and trim input values
    const firstName = document.getElementById('first_name').value.trim();
    const lastName = document.getElementById('last_name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const terms = document.getElementById('terms').checked;

    // Define regular expressions for validation
    const namePattern = /^[A-Za-z\s]{3,20}$/;  // Only letters and spaces, 3 to 20 characters
    const phonePattern = /^\+\d{1,15}$/;       // Phone number starts with +, up to 15 digits
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;  // Basic email format

    // Validate first name
    if (!namePattern.test(firstName)) {
        alert('Please enter a valid first name (3-20 letters only).');
        return;
    }

    // Validate last name
    if (!namePattern.test(lastName)) {
        alert('Please enter a valid last name (3-20 letters only).');
        return;
    }

    // Validate phone number
    if (!phonePattern.test(phone)) {
        alert('Please enter a valid phone number (e.g., +123456789, max 15 digits).');
        return;
    }

    // Validate email format
    if (!emailPattern.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    // Ensure message is not empty
    if (message === '') {
        alert('Please enter a message.');
        return;
    }

    // Check if terms are accepted
    if (!terms) {
        alert('You must agree to the terms and conditions.');
        return;
    }

    // Package form data for submission
    const formData = new FormData(event.target);

    // Submit the form data using fetch (HTTPS)
    fetch('https://localhost:3000/submit', {
        method: 'POST',
        body: new URLSearchParams(formData)  // URL-encoded form data
    })
    .then(response => response.text())
    .then(data => {
        alert('Your message has been sent successfully!');
        event.target.reset();  // Reset the form after successful submission
    })
    .catch((error) => {
        console.error('Error sending data:', error);
        alert('An error occurred while sending the message. Please try again.');
    });
});


// Modal functionality
const modal = document.getElementById("modal");
const openModalButton = document.getElementById("open-modal");
const closeModalButton = document.getElementById("close-modal");

// Open modal
openModalButton.addEventListener("click", function(event) {
    event.preventDefault(); // Prevent default anchor click behavior
    modal.style.display = "block";
});

// Close modal
closeModalButton.addEventListener("click", function() {
    modal.style.display = "none";
});

// Close modal when clicking outside of the modal content
window.addEventListener("click", function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});