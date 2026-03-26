document.addEventListener('DOMContentLoaded', () => {
    const runBtn = document.getElementById('run-optimizer');
    const resultsSection = document.getElementById('optimizer-results');

    runBtn.addEventListener('click', () => {
        // Initial feedback
        runBtn.innerHTML = '<i class="ph-bold ph-spinner-gap" style="animation: spin 1s linear infinite;"></i> Processing Data...';
        runBtn.disabled = true;

        // Fake processing steps
        setTimeout(() => {
            runBtn.innerHTML = '<i class="ph-bold ph-spinner-gap" style="animation: spin 1s linear infinite;"></i> Mapping Resource Distances...';
        }, 800);

        setTimeout(() => {
            runBtn.innerHTML = '<i class="ph-bold ph-spinner-gap" style="animation: spin 1s linear infinite;"></i> Generating Optimal Clusters...';
        }, 1600);

        // Show results
        setTimeout(() => {
            runBtn.innerHTML = '<i class="ph-fill ph-check-circle"></i> Optimization Complete';
            runBtn.style.background = '#00c853';
            runBtn.style.color = '#fff';
            
            resultsSection.style.display = 'block';
            resultsSection.style.animation = 'fadeIn 1s ease both';
            
            // Scroll to results
            resultsSection.scrollIntoView({ behavior: 'smooth' });
        }, 2500);
    });

    // Accept & Assign Logic
    const acceptBtns = document.querySelectorAll('.accept-btn');
    acceptBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.innerHTML = '<i class="ph-bold ph-spinner-gap" style="animation: spin 1s linear infinite;"></i> Deploying';
            btn.style.opacity = '0.7';
            setTimeout(() => {
                btn.innerHTML = '<i class="ph-fill ph-check-circle"></i> Deployed';
                btn.style.opacity = '1';
                btn.disabled = true;
                
                // Show floating notification
                showToast('Allocation sent to field team!');
            }, 1200);
        });
    });

    function showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'glass-card toast-notice';
        toast.style.position = 'fixed';
        toast.style.bottom = '100px';
        toast.style.left = '50%';
        toast.style.transform = 'translateX(-50%)';
        toast.style.padding = '12px 24px';
        toast.style.background = '#00c853';
        toast.style.color = 'white';
        toast.style.fontWeight = '700';
        toast.style.borderRadius = '30px';
        toast.style.zIndex = '5000';
        toast.style.animation = 'slideUp 0.3s ease both';
        toast.innerText = message;
        
        document.body.appendChild(toast);
        setTimeout(() => {
            toast.style.animation = 'slideDown 0.3s ease reverse';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
});
