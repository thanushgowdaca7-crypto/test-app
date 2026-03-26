document.addEventListener('DOMContentLoaded', () => {
    // Tab Switching Logic
    const tabs = document.querySelectorAll('.tab-btn');
    const contents = document.querySelectorAll('.tab-content');
    let mapInitialized = false;
    let map;

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.tab;
            
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));
            
            tab.classList.add('active');
            document.getElementById(`tab-${target}`).classList.add('active');

            if (target === 'map') {
                setTimeout(() => {
                    initMap();
                }, 100);
            }
        });
    });

    // Map Initialization
    function initMap() {
        if (mapInitialized) return;
        
        map = L.map('requests-map').setView([12.99, 80.24], 12);
        
        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);

        // Sample Pins
        const pins = [
            { pos: [13.00, 80.25], title: 'Rescue Needed', color: '#ff3d00' },
            { pos: [12.97, 80.22], title: 'Medical Kits Needed', color: '#00e5ff' },
            { pos: [12.98, 80.26], title: 'Rescue Needed', color: '#ff3d00' }
        ];

        pins.forEach(pin => {
            const marker = L.circleMarker(pin.pos, {
                radius: 10,
                fillColor: pin.color,
                color: '#fff',
                weight: 2,
                opacity: 1,
                fillOpacity: 0.8
            }).addTo(map);

            marker.bindPopup(`
                <div style="background:#101a35; color:#fff; padding:10px; border-radius:8px;">
                    <strong style="display:block; margin-bottom:4px;">${pin.title}</strong>
                    <button style="background:#ff8f00; border:none; color:#000; padding:4px 8px; border-radius:4px; font-weight:800; cursor:pointer;" onclick="this.innerText='Assigned'; this.disabled=true;">Assign Now</button>
                </div>
            `);
        });

        mapInitialized = true;
    }

    // Allocate Button Logic
    const allocateBtns = document.querySelectorAll('.allocate-btn');
    allocateBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const originalText = btn.innerText;
            btn.innerHTML = '<i class="ph-bold ph-spinner-gap" style="animation: spin 1s linear infinite;"></i> Mapping...';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerHTML = '<i class="ph-fill ph-check-circle"></i> Allocated';
                btn.style.background = '#00e676';
                btn.style.borderColor = '#00e676';
                btn.style.color = '#000';
            }, 1200);
        });
    });

    // Refresh Logic
    const refreshBtn = document.querySelector('.fab-refresh');
    refreshBtn.addEventListener('click', () => {
        refreshBtn.innerHTML = '<i class="ph-bold ph-arrows-clockwise" style="animation: spin 1s linear infinite;"></i> Refreshing';
        setTimeout(() => {
            refreshBtn.innerHTML = '<i class="ph-bold ph-arrows-clockwise"></i> <span>Refresh</span>';
            // Visual feedback - clear and re-add or just reload
            location.reload();
        }, 1000);
    });

    // Populate "By Priority" tab (Simulation)
    const listFeed = document.querySelector('#tab-list .requests-feed').innerHTML;
    document.getElementById('rescue-group').innerHTML = listFeed; // All for now, but in real app we'd filter
});
