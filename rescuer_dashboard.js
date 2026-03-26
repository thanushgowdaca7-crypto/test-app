document.addEventListener('DOMContentLoaded', () => {
    // Add micro-interactions for the Rescuer Dashboard
    const assignButtons = document.querySelectorAll('.assign-btn');

    assignButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const originalText = btn.innerText;
            btn.innerHTML = '<i class="ph-bold ph-spinner-gap" style="animation: spin 1s linear infinite;"></i> Assigning...';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerHTML = '<i class="ph-fill ph-check"></i> Assigned';
                btn.style.background = '#00e676';
                btn.style.color = '#000';
            }, 1200);
        });
    });

    // Handle nav items
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            navItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        });
    });
});

// Spin animation
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(styleSheet);
