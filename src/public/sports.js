
document.addEventListener("DOMContentLoaded", () => {

    const navbar = document.getElementById("navbar");

    if (navbar) {
        const updateNavbarSize = () => {
            navbar.classList.toggle("navbar-small", window.scrollY > 70);
        };

        updateNavbarSize();
        window.addEventListener("scroll", updateNavbarSize, { passive: true });
    }

    // =====================================
    // 1. Fade animations for sections and items
    // =====================================

    const faders = document.querySelectorAll(
        '.fade-section, .fade-card, .mini-card, .logo-container, .photo, .portfolio-details, .description, .activity-detail, .story-image'
    );

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.target.matches('.cca-section')) {
                entry.target.classList.toggle('scrolled-out', !entry.isIntersecting);
                return;
            }

            entry.target.classList.toggle('visible', entry.isIntersecting);
        });
    }, { threshold: 0.2 });

    faders.forEach(section => observer.observe(section));


    const draggableItems = [];

    const enableDragging = (card, handle, boundary) => {
        draggableItems.push({ card, boundary });

        let activePointerId = null;
        let startX = 0;
        let startY = 0;
        let startLeft = 0;
        let startTop = 0;

        const stopDragging = event => {
            if (event.pointerId !== activePointerId) return;

            activePointerId = null;
            card.style.zIndex = '';
        };

        handle.addEventListener('pointerdown', event => {
            if (activePointerId !== null || !event.isPrimary || event.button !== 0) return;

            event.preventDefault();
            activePointerId = event.pointerId;
            startX = event.clientX;
            startY = event.clientY;

            const boundaryRect = boundary.getBoundingClientRect();
            const cardRect = card.getBoundingClientRect();
            startLeft = cardRect.left - boundaryRect.left;
            startTop = cardRect.top - boundaryRect.top;

            card.style.left = `${startLeft}px`;
            card.style.right = 'auto';
            card.style.top = `${startTop}px`;
            card.style.zIndex = '1000';

            handle.setPointerCapture(event.pointerId);
        });

        handle.addEventListener('pointermove', event => {
            if (event.pointerId !== activePointerId) return;

            const maxLeft = Math.max(0, boundary.clientWidth - card.offsetWidth);
            const maxTop = Math.max(0, boundary.clientHeight - card.offsetHeight);
            const left = Math.min(maxLeft, Math.max(0, startLeft + event.clientX - startX));
            const top = Math.min(maxTop, Math.max(0, startTop + event.clientY - startY));

            card.style.left = `${left}px`;
            card.style.top = `${top}px`;
        });

        handle.addEventListener('pointerup', stopDragging);
        handle.addEventListener('pointercancel', stopDragging);
        handle.addEventListener('lostpointercapture', stopDragging);
    };

    const constrainDraggedCards = () => {
        draggableItems.forEach(({ card, boundary }) => {
            if (!card.style.left && !card.style.top) return;

            const maxLeft = Math.max(0, boundary.clientWidth - card.offsetWidth);
            const maxTop = Math.max(0, boundary.clientHeight - card.offsetHeight);
            const left = Math.min(maxLeft, Math.max(0, parseFloat(card.style.left) || 0));
            const top = Math.min(maxTop, Math.max(0, parseFloat(card.style.top) || 0));

            card.style.left = `${left}px`;
            card.style.top = `${top}px`;
        });
    };

    const board = document.querySelector('.cca-board');
    const cards = document.querySelectorAll('.cca-card');

    cards.forEach(card => {
        const pin = card.querySelector('.pin');

        if (!pin || !board) return;

        enableDragging(card, pin, board);
        card.addEventListener('click', event => {
            if (pin.contains(event.target)) event.preventDefault();
        });
    });

    document.querySelectorAll('.mini-card .pin').forEach(pin => {
        const card = pin.closest('.mini-card');
        const miniBoard = pin.closest('.mini-board');

        if (card && miniBoard) enableDragging(card, pin, miniBoard);
    });

    const resizeObserver = new ResizeObserver(constrainDraggedCards);
    new Set(draggableItems.map(({ boundary }) => boundary))
        .forEach(boundary => resizeObserver.observe(boundary));

    const resetButton = document.getElementById('resetPins');

    if (resetButton) {
        resetButton.addEventListener('click', () => {
            cards.forEach(card => {
                card.style.removeProperty('left');
                card.style.removeProperty('right');
                card.style.removeProperty('top');
                card.style.removeProperty('z-index');
            });
        });
    }


});
