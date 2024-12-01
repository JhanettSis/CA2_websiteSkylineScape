document.addEventListener("DOMContentLoaded", function() {
    const submenuToggle = document.querySelector('.submenu-toggle');
    const submenuBody = document.querySelector('.submenu-body');

    if (submenuToggle && submenuBody) {
        submenuToggle.addEventListener('click', function(event) {
            event.preventDefault();
            submenuBody.style.display = (submenuBody.style.display === "block") ? "none" : "block";
        });
    } else {
        console.error('Submenu elements not found.');
    }

    const items = document.querySelectorAll('.carousel-item');
    const totalItems = items.length;

    if (totalItems === 0) {
        console.error("No carousel items found.");
        return;
    }

    let currentIndex = 0;
    const intervalTime = 4000;
    let autoSlide = setInterval(nextSlide, intervalTime);

    function showSlide(index) {
        items.forEach((item, i) => {
            item.classList.remove('active');
            if (i === index) {
                item.classList.add('active');
            }
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalItems;
        showSlide(currentIndex);
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        showSlide(currentIndex);
    }

    document.getElementById('nextBtn')?.addEventListener('click', (event) => {
        event.preventDefault();
        clearInterval(autoSlide);
        nextSlide();
        autoSlide = setInterval(nextSlide, intervalTime);
    });

    document.getElementById('prevBtn')?.addEventListener('click', (event) => {
        event.preventDefault();
        clearInterval(autoSlide);
        prevSlide();
        autoSlide = setInterval(nextSlide, intervalTime);
    });

    
    // Counter functionality
    let counter = 0;
    document.getElementById('plusBtn')?.addEventListener('click', function() {
        counter += 1;
        document.getElementById("counter").value = counter;
    });

    document.getElementById('minusBtn')?.addEventListener('click', function() {
        if (counter > 0) counter -= 1;
        document.getElementById("counter").value = counter;
    });


});

// Testimonials
  // JavaScript for rotating through testimonials
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial');
const totalTestimonials = testimonials.length;

function showTestimonial(index) {
    testimonials.forEach((testimonial, i) => {
        testimonial.style.display = i === index ? 'flex' : 'none';  // Only display the current testimonial
    });
}

// Show the first testimonial by default
showTestimonial(currentTestimonial);

document.getElementById('next-btn').addEventListener('click', function() {
    currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
    showTestimonial(currentTestimonial);
});

document.getElementById('prev-btn').addEventListener('click', function() {
    currentTestimonial = (currentTestimonial - 1 + totalTestimonials) % totalTestimonials;
    showTestimonial(currentTestimonial);
});









