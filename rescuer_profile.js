document.addEventListener('DOMContentLoaded', () => {
    // Availability Toggle Logic
    const toggle = document.getElementById('avail-toggle');
    const statusDesc = document.getElementById('status-desc');
    const statusDot = document.querySelector('.active-status-dot');

    toggle.addEventListener('change', () => {
        if (toggle.checked) {
            statusDesc.innerText = 'Available for active deployment';
            statusDesc.style.color = 'var(--text-muted)';
            statusDot.style.background = '#00e676';
            statusDot.style.boxShadow = '0 0 10px rgba(0,230,118,0.5)';
        } else {
            statusDesc.innerText = 'Currently Busy / Off-duty';
            statusDesc.style.color = '#ff3d00';
            statusDot.style.background = '#ff3d00';
            statusDot.style.boxShadow = '0 0 10px rgba(255,61,0,0.5)';
        }
    });

    // Logout Modal Logic
    const logoutBtn = id('logout-btn');
    const modal = id('logout-modal');
    const cancelLogout = id('cancel-logout');
    const confirmLogout = id('confirm-logout');

    logoutBtn.addEventListener('click', () => {
        modal.classList.add('active');
    });

    cancelLogout.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    confirmLogout.addEventListener('click', () => {
        confirmLogout.innerHTML = '<i class="ph-bold ph-spinner-gap spin"></i> Logging out...';
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    });

    // Mode Switcher
    const switchBtn = id('switch-mode');
    switchBtn.addEventListener('click', () => {
        switchBtn.innerHTML = '<i class="ph-bold ph-spinner-gap spin"></i> Switching...';
        setTimeout(() => {
            window.location.href = 'report.html';
        }, 800);
    });

    // Helper
    function id(name) { return document.getElementById(name); }
});
