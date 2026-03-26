document.addEventListener('DOMContentLoaded', () => {
    // 1. Populate Priority List from localStorage
    const miniList = document.getElementById('mini-list');
    const savedPriority = JSON.parse(localStorage.getItem('reliefRoute_priority') || '[]');

    if (savedPriority.length > 0) {
        savedPriority.forEach((item, index) => {
            const div = document.createElement('div');
            div.className = 'mini-item';
            div.innerHTML = `
                <span class="mini-badge">#${index+1}</span>
                <span class="mini-icon">${item.icon}</span>
                <span class="mini-label">${item.label}</span>
            `;
            miniList.appendChild(div);
        });
    } else {
        miniList.innerHTML = '<p style="font-size:12px; color:rgba(255,255,255,0.4)">No needs selected yet.</p>';
    }

    // 2. Initialize Map
    const map = L.map('live-map', {
        zoomControl: false,
        attributionControl: false
    }).setView([12.9716, 77.5946], 15); // Default start

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png').addTo(map);

    // Get User location
    let userLatLng = null;
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
            userLatLng = [position.coords.latitude, position.coords.longitude];
            map.setView(userLatLng, 15);
            
            // User pulsing dot
            const userIcon = L.divIcon({
                className: 'custom-user-icon',
                html: '<div style="width:12px; height:12px; background:#00c853; border-radius:50%; border:2px solid white; box-shadow: 0 0 10px #00c853;"></div>',
                iconSize: [12, 12]
            });
            L.marker(userLatLng, {icon: userIcon}).addTo(map);

            // Simulate Rescue Team converging
            initRescueSimulation(userLatLng, map);
        });
    }

    function initRescueSimulation(target, map) {
        // Start team slightly away
        const startOffset = 0.005; 
        let teamLatLng = [target[0] + startOffset, target[1] + startOffset];
        
        const teamIcon = L.divIcon({
            className: 'team-marker',
            html: '<div style="background:#ff3b3b; color:white; padding:4px; border-radius:4px; font-weight:800; font-size:10px; box-shadow:0 4px 10px rgba(255,59,59,0.5)">TEAM ALPHA</div>',
            iconSize: [60, 20]
        });

        const teamMarker = L.marker(teamLatLng, {icon: teamIcon}).addTo(map);
        
        // Dashed line path
        const pathLine = L.polyline([teamLatLng, target], {
            color: '#ff3b3b',
            dashArray: '5, 10',
            weight: 2,
            opacity: 0.5
        }).addTo(map);

        // Simple animation loop (converging)
        let progress = 0;
        const interval = setInterval(() => {
            progress += 0.01;
            if (progress >= 1) {
                clearInterval(interval);
                return;
            }

            const currentLat = teamLatLng[0] + (target[0] - teamLatLng[0]) * progress;
            const currentLng = teamLatLng[1] + (target[1] - teamLatLng[1]) * progress;
            
            teamMarker.setLatLng([currentLat, currentLng]);
            pathLine.setLatLngs([[currentLat, currentLng], target]);
        }, 1000);
    }
});
