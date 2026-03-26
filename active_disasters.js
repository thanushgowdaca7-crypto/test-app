document.addEventListener('DOMContentLoaded', () => {
    // Filter chip switching
    const chips = document.querySelectorAll('.chip');
    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            chips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            
            // Simulation of filtering
            const list = document.getElementById('disaster-list');
            if (chip.innerText !== 'All' && chip.innerText !== 'Flood' && chip.innerText !== 'Cyclone') {
                list.style.opacity = '0.5';
                setTimeout(() => {
                    list.innerHTML = `
                        <div style="text-align: center; padding: 40px 20px; color: rgba(255,255,255,0.4);">
                            <i class="ph ph-mask-sad" style="font-size: 48px; margin-bottom: 16px; display: block;"></i>
                            <p style="font-weight: 700; font-size: 18px; color: #fff;">No active ${chip.innerText} disasters in your area.</p>
                            <p style="font-size: 14px; margin-top: 8px;">Stay ready! Things can change quickly.</p>
                        </div>
                    `;
                    list.style.opacity = '1';
                }, 300);
            } else {
                // Restore or keep current list (simulation)
                location.reload();
            }
        });
    });

    // Assign Resources button feedback
    const assignBtns = document.querySelectorAll('.primary-btn-sm.orange');
    assignBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.innerHTML = '<i class="ph-bold ph-spinner-gap" style="animation: spin 1s linear infinite;"></i> Deploying...';
            btn.style.opacity = '0.7';
            setTimeout(() => {
                btn.innerHTML = '<i class="ph-fill ph-check-circle"></i> Resources Assigned';
                btn.style.background = '#00e676';
                btn.style.opacity = '1';
                btn.disabled = true;
            }, 1200);
        });
    });

    // FAB & Modal Logic
    const fab = document.querySelector('.fab-report');
    const modal = document.getElementById('report-modal');
    const closeModal = document.getElementById('close-report-modal');
    const form = document.getElementById('new-disaster-form');

    fab.addEventListener('click', () => {
        modal.classList.add('active');
    });

    closeModal.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const type = form.querySelector('input[name="disaster-type"]:checked').value;
        const loc = document.getElementById('disaster-loc').value;
        
        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.innerHTML = '<i class="ph-bold ph-spinner-gap" style="animation: spin 1s linear infinite;"></i> Broadcasting...';
        submitBtn.disabled = true;

        setTimeout(() => {
            modal.classList.remove('active');
            
            // Add new card (simulation)
            const list = document.getElementById('disaster-list');
            const newCard = document.createElement('div');
            newCard.className = 'disaster-full-card';
            newCard.style.animation = 'slideUp 0.6s ease both';
            
            const iconClass = type === 'Flood' ? 'ph-waves' : (type === 'Cyclone' ? 'ph-wind' : (type === 'Fire' ? 'ph-fire' : 'ph-warning-circle'));
            const colorClass = type.toLowerCase();

            newCard.innerHTML = `
                <div class="card-top">
                    <div class="disaster-title">
                        <i class="ph-fill ${iconClass} ${colorClass}"></i>
                        <div class="title-text">
                            <h3>${type} - ${loc}</h3>
                            <p>Started: Just Now</p>
                        </div>
                    </div>
                    <span class="status-tag pulse-red">Ongoing</span>
                </div>
                <div class="card-stats">
                    <div class="stat-item">
                        <span class="val">1</span>
                        <span class="lab">Victim Reported</span>
                    </div>
                </div>
                <div class="card-actions">
                    <button class="outline-btn-sm">View All Requests</button>
                    <button class="primary-btn-sm orange">Assign Resources</button>
                </div>
            `;
            list.prepend(newCard);
            form.reset();
            submitBtn.innerHTML = 'Broadcast Report';
            submitBtn.disabled = false;
        }, 1500);
    });
});
