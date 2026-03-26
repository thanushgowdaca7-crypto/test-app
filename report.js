document.addEventListener('DOMContentLoaded', () => {
    // --- Map Implementation ---
    const map = L.map('map', {
        zoomControl: false,
        attributionControl: false
    }).setView([0, 0], 2); // default world view

    // Use CartoDB Positron (Light) tiles to make it "white color"
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 19
    }).addTo(map);

    // Make the map container redirect to Google Maps on click for "accurate results"
    document.getElementById('map').addEventListener('click', () => {
        if (userMarker) {
            const pos = userMarker.getLatLng();
            window.open(`https://www.google.com/maps/search/?api=1&query=${pos.lat},${pos.lng}`, '_blank');
        }
    });

    // Custom pulsing marker icon
    const pulsingDotIcon = L.divIcon({
        className: 'custom-div-icon',
        html: `
            <div class="pulsing-dot-container" style="transform: translate(-50%, -50%); position: absolute; pointer-events: none;">
                <div class="pulse-ring"></div>
                <div class="pulse-dot"></div>
                <span class="pulse-label" style="white-space: nowrap;">You are here</span>
            </div>
        `,
        iconSize: [0, 0],
        iconAnchor: [0, 0]
    });

    let userMarker = null;

    // Get accurate location
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            const accuracy = position.coords.accuracy;

            map.setView([lat, lng], 15);
            
            userMarker = L.marker([lat, lng], { icon: pulsingDotIcon }).addTo(map);
            
            // Optional: Circle for accuracy range
            L.circle([lat, lng], {
                radius: accuracy,
                color: '#ff3b3b',
                fillColor: '#ff3b3b',
                fillOpacity: 0.1,
                weight: 1
            }).addTo(map);

        }, (error) => {
            console.error("Geolocation error:", error);
            // Fallback to a default city if user denies
            map.setView([12.9716, 77.5946], 12); // Bangalore as default example
        }, {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        });
    }

    // --- Disaster Selection & Form Handling ---
    const disasterCards = document.querySelectorAll('.disaster-card');
    const nextBtn = document.getElementById('next-btn');

    const selectedDisasters = new Set();

    disasterCards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('selected');
            
            if (card.classList.contains('selected')) {
                selectedDisasters.add(card.id);
            } else {
                selectedDisasters.delete(card.id);
            }

            // Enable "Next" button if at least one is selected
            nextBtn.disabled = selectedDisasters.size === 0;
            
            if (!nextBtn.disabled) {
                // Subtle pop animation when enabling
                nextBtn.style.animation = 'none';
                nextBtn.offsetHeight;
                nextBtn.style.animation = 'fadeIn 0.4s var(--transition-bounce)';
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

    nextBtn.addEventListener('click', () => {
        if (selectedDisasters.size === 0) return;

        // Show spinner state
        const originalText = nextBtn.innerHTML;
        nextBtn.innerHTML = '<i class="ph-bold ph-spinner-gap" style="animation: spin 1s linear infinite;"></i> Processing...';
        
        setTimeout(() => {
            window.location.href = 'priority.html';
        }, 1200);
    });
});
