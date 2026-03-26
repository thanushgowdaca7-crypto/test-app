document.addEventListener('DOMContentLoaded', () => {
    // Tab Switching Logic
    const tabs = document.querySelectorAll('.tab-btn');
    const contents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.tab;
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById(`tab-${target}`).classList.add('active');
        });
    });

    // Status Dropdown Toggle
    const updateBtns = document.querySelectorAll('.update-status-btn');
    updateBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const dropdown = btn.nextElementSibling;
            
            // Close others first
            document.querySelectorAll('.status-dropdown').forEach(d => {
                if (d !== dropdown) d.classList.remove('active');
            });

            dropdown.classList.toggle('active');
        });
    });

    // Close dropdown on outside click
    window.addEventListener('click', () => {
        document.querySelectorAll('.status-dropdown').forEach(d => d.classList.remove('active'));
    });

    // Handle Status Selection
    const statusOptions = document.querySelectorAll('.status-dropdown button');
    statusOptions.forEach(opt => {
        opt.addEventListener('click', () => {
            const newStatus = opt.dataset.status;
            const card = opt.closest('.allocation-card');
            const badge = card.querySelector('.status-badge');
            
            badge.innerText = newStatus;
            badge.className = 'status-badge ' + (newStatus === 'Delivered' || newStatus === 'Complete' ? 'green' : 'pulse-orange');
            
            // Simulation feedback
            const btn = card.querySelector('.update-status-btn');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="ph-bold ph-spinner-gap spin"></i> Updating...';
            
            setTimeout(() => {
                btn.innerHTML = originalText;
                if (newStatus === 'Complete') {
                    card.style.opacity = '0.5';
                    card.style.pointerEvents = 'none';
                    setTimeout(() => card.remove(), 1000);
                }
            }, 800);
        });
    });

    // Live Tracking (Mini Map)
    const trackBtns = document.querySelectorAll('.track-btn');
    trackBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const card = btn.closest('.allocation-card');
            const mapContainer = card.querySelector('.mini-map-container');
            const isVisible = mapContainer.style.display !== 'none';
            
            mapContainer.style.display = isVisible ? 'none' : 'block';
            
            if (!isVisible) {
                const mapId = mapContainer.querySelector('.mini-map').id;
                initMiniMap(mapId);
            }
        });
    });

    function initMiniMap(id) {
        // Leaflet init
        const map = L.map(id, {
            zoomControl: false,
            dragging: false,
            touchZoom: false,
            scrollWheelZoom: false
        }).setView([12.99, 80.24], 14);

        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png').addTo(map);

        L.circleMarker([12.99, 80.24], {
            radius: 8,
            fillColor: '#ff8f00',
            color: '#fff',
            weight: 2,
            fillOpacity: 1
        }).addTo(map);
    }

    // Export Logic
    const exportBtn = document.querySelector('.fab-export');
    exportBtn.addEventListener('click', () => {
        exportBtn.innerHTML = '<i class="ph-bold ph-spinner-gap spin"></i> Preparing CSV...';
        setTimeout(() => {
            exportBtn.innerHTML = '<i class="ph-bold ph-check-circle"></i> Downloaded';
            setTimeout(() => {
                exportBtn.innerHTML = '<i class="ph-bold ph-file-csv"></i> <span>Export Report</span>';
            }, 2000);
        }, 1500);
    });
});
