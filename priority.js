document.addEventListener('DOMContentLoaded', () => {
    const list = document.getElementById('priority-list');
    const submitBtn = document.getElementById('submit-btn');

    // Initialize SortableJS
    if (typeof Sortable !== 'undefined') {
        const sortable = new Sortable(list, {
            animation: 350,
            ghostClass: 'sortable-ghost',
            chosenClass: 'sortable-chosen',
            dragClass: 'sortable-drag',
            onEnd: () => {
                updateBadges();
            }
        });
    } else {
        console.error('SortableJS not loaded. Check CDN or internet connection.');
    }

    // Function to update badge text and colors based on order
    function updateBadges() {
        const cards = list.querySelectorAll('.priority-card');
        cards.forEach((card, index) => {
            const badge = card.querySelector('.priority-badge');
            const priorityNum = index + 1;
            
            badge.innerText = `#${priorityNum} Priority`;
            
            // The first card always gets the red treatment via CSS (:first-child)
            // But we can add dynamic feedback here if needed
        });
    }

    // Submit Action
    submitBtn.addEventListener('click', () => {
        const order = Array.from(list.querySelectorAll('.priority-card')).map(card => {
            return {
                id: card.getAttribute('data-id'),
                label: card.querySelector('.card-label').innerText,
                icon: card.querySelector('.card-icon').innerText
            };
        });
        
        // Save to localStorage for the dashboard to read
        localStorage.setItem('reliefRoute_priority', JSON.stringify(order));
        
        // Show kinetic feedback
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="ph-bold ph-spinner-gap" style="animation: spin 1s linear infinite;"></i> Submitting...';
        
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1200);
    });
});
