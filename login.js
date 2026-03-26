document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const loginBtn = document.getElementById('login-btn');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const originalText = loginBtn.innerHTML;
        loginBtn.innerHTML = '<i class="ph-bold ph-spinner-gap" style="animation: spin 1s linear infinite;"></i> Authenticating...';
        loginBtn.disabled = true;

        // Simulate login process
        setTimeout(() => {
            // Shake effect on success/progress
            loginBtn.style.background = '#00c853';
            loginBtn.innerHTML = '<i class="ph-fill ph-check-circle"></i> Login Successful';
            
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        }, 1500);
    });
});
