document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    const continueBtn = document.getElementById('continue-btn');
    let selectedCardId = null;

    cards.forEach(card => {
        card.addEventListener('click', () => {
            // Remove selected class from all cards
            cards.forEach(c => c.classList.remove('selected'));
            
            // Add selected class to the clicked card
            card.classList.add('selected');
            selectedCardId = card.id;

            // Enable the continue button
            if (continueBtn.disabled) {
                continueBtn.disabled = false;
                // Add a subtle pop animation to the button
                continueBtn.style.animation = 'none';
                continueBtn.offsetHeight; // trigger reflow
                continueBtn.style.animation = 'fadeIn 0.4s var(--transition-bounce)';
            }
        });

        // Add keyboard support for accessibility
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.click();
            }
        });
    });

    continueBtn.addEventListener('click', () => {
        if (!selectedCardId) return;

        // Add an exciting kinetic animation before proceeding
        const originalText = continueBtn.innerHTML;
        continueBtn.innerHTML = '<i class="ph-bold ph-spinner-gap" style="animation: spin 1s linear infinite;"></i> Loading...';
        
        // Simulating navigation or action
        setTimeout(() => {
            if (selectedCardId === 'card-victim') {
                window.location.href = 'report.html';
            } else if (selectedCardId === 'card-rescuer') {
                window.location.href = 'rescuer_dashboard.html';
            }
        }, 1200);
    });
});

// Add a global spin animation for the spinner
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(styleSheet);
