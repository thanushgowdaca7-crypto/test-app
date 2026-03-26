document.addEventListener('DOMContentLoaded', () => {
    const markSafeBtn = document.getElementById('mark-safe-btn');
    const modalOverlay = document.getElementById('safe-modal');
    const cancelSafe = document.getElementById('cancel-safe');
    const confirmSafe = document.getElementById('confirm-safe');

    markSafeBtn.addEventListener('click', () => {
        modalOverlay.classList.add('active');
    });

    cancelSafe.addEventListener('click', () => {
        modalOverlay.classList.remove('active');
    });

    confirmSafe.addEventListener('click', () => {
        // Handle marking as safe
        modalOverlay.innerHTML = `
            <div class="modal-content glass-card">
                <i class="ph-fill ph-check-circle modal-icon" style="color: #00c853"></i>
                <h3>Status: Safe</h3>
                <p>Relief request closed. Stay vigilant.</p>
                <button class="modal-btn yes" style="width: 100%" onclick="window.location.href='index.html'">Return Home</button>
            </div>
        `;
    });

    // Close modal on escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modalOverlay.classList.remove('active');
        }
    });

    // Special logic for Location Sharing button
    const shareBtn = document.querySelector('.share-location-btn');
    shareBtn.addEventListener('click', () => {
        const originalText = shareBtn.innerHTML;
        shareBtn.innerHTML = '<i class="ph-bold ph-spinner-gap" style="animation: spin 1s linear infinite;"></i> Sharing...';
        
        setTimeout(() => {
            shareBtn.innerHTML = '<i class="ph-fill ph-check"></i> Location Shared with Rescuers';
            shareBtn.style.background = '#00c853';
            shareBtn.style.boxShadow = '0 8px 25px rgba(0, 200, 83, 0.4)';
        }, 1500);
    });
});
