

document.addEventListener("DOMContentLoaded", () => {
    const faders = document.querySelectorAll('.fade-section');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.2 });

    faders.forEach(section => observer.observe(section));

    

    const container = document.querySelector('.cca-right');
    const cards = document.querySelectorAll('.cca-card');

    cards.forEach(card => {
    const pin = card.querySelector('.pin');
    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    // Start dragging when mouse is pressed down on pin
    pin.addEventListener('mousedown', e => {
        e.stopPropagation();
        isDragging = true;
        offsetX = e.clientX - card.offsetLeft;
        offsetY = e.clientY - card.offsetTop;
        card.style.zIndex = 1000; // bring to front
    });

    // Move card only while isDragging is true
    document.addEventListener('mousemove', e => {
        if (!isDragging) return; // do nothing if not holding mouse

            e.preventDefault(); // prevent text/image selection


        let left = e.clientX - offsetX;
        let top = e.clientY - offsetY;

        const containerRect = container.getBoundingClientRect();
        const cardRect = card.getBoundingClientRect();

        // constrain within container
        if (left < 0) left = 0;
        if (left + cardRect.width > containerRect.width) left = containerRect.width - cardRect.width;
        if (top < 0) top = 0;
        if (top + cardRect.height > containerRect.height) top = containerRect.height - cardRect.height;

        card.style.left = left + 'px';
        card.style.top = top + 'px';
    });

    // Stop dragging when mouse button is released anywhere
    document.addEventListener('mouseup', () => {
        if (isDragging) {
        isDragging = false;
        card.style.zIndex = 1; // reset stacking order
        }
    });
    });

    document.querySelectorAll('.mini-card .pin').forEach(pin => {
    const card = pin.parentElement;
    let isDragging = false, offsetX, offsetY;

    pin.addEventListener('mousedown', e => {
        isDragging = true;
        offsetX = e.clientX - card.offsetLeft;
        offsetY = e.clientY - card.offsetTop;
        card.style.cursor = 'grabbing';
    });

    document.addEventListener('mousemove', e => {
        if (!isDragging) return;
        card.style.left = (e.clientX - offsetX) + 'px';
        card.style.top = (e.clientY - offsetY) + 'px';
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        card.style.cursor = 'grab';
    });
});

const cards1 = document.querySelectorAll('.cca-card');

// Store original positions
const initialPositions = [];

cards1.forEach((card, index) => {
    initialPositions[index] = {
        left: card.style.left,
        right: card.style.right,
        top: card.style.top
    };
});

// Reset button
document.getElementById('resetPins').addEventListener('click', () => {
    cards1.forEach((card, index) => {
        card.style.left = initialPositions[index].left;
        card.style.right = initialPositions[index].right;
        card.style.top = initialPositions[index].top;
    });
});




});