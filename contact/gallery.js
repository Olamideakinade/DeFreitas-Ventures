const galleryImages = [
    {
        src: 'office-team.png',
        alt: 'DeFreitas Ventures team at work',
        caption: 'Our Team - Collaborating on strategic ventures'
    },
    {
        src: 'mining-site.png',
        alt: 'Mining operations in Suriname',
        caption: 'Mining Operations - Suriname Site, 2023'
    },
    {
        src: 'office-building.png',
        alt: 'DeFreitas Ventures headquarters',
        caption: 'Headquarters - Strategic operations center'
    },
    {
        src: 'consultation-meeting.png',
        alt: 'Business consultation meeting',
        caption: 'Client Consultations - Building partnerships'
    }
];

let currentImageIndex = 0;

function openLightbox(index) {
    currentImageIndex = index;
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxCaption = document.getElementById('lightbox-caption');
    
    const image = galleryImages[index];
    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    lightboxCaption.textContent = image.caption;
    
    lightbox.classList.add('show');
    document.body.style.overflow = 'hidden';
    
    // Add keyboard event listener
    document.addEventListener('keydown', handleKeyboard);
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('show');
    document.body.style.overflow = 'auto';
    
    // Remove keyboard event listener
    document.removeEventListener('keydown', handleKeyboard);
}

function changeImage(direction) {
    currentImageIndex += direction;
    
    if (currentImageIndex < 0) {
        currentImageIndex = galleryImages.length - 1;
    } else if (currentImageIndex >= galleryImages.length) {
        currentImageIndex = 0;
    }
    
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const image = galleryImages[currentImageIndex];
    
    // Add fade effect
    lightboxImage.style.opacity = '0';
    
    setTimeout(() => {
        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt;
        lightboxCaption.textContent = image.caption;
        lightboxImage.style.opacity = '1';
    }, 150);
}

function handleKeyboard(e) {
    switch(e.key) {
        case 'Escape':
            closeLightbox();
            break;
        case 'ArrowLeft':
            changeImage(-1);
            break;
        case 'ArrowRight':
            changeImage(1);
            break;
    }
}

// Prevent lightbox from closing when clicking on the image or content
document.addEventListener('DOMContentLoaded', function() {
    const lightboxContent = document.querySelector('.lightbox-content');
    if (lightboxContent) {
        lightboxContent.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
});

// Add swipe support for mobile
let startX, startY, endX, endY;

document.addEventListener('DOMContentLoaded', function() {
    const lightbox = document.getElementById('lightbox');
    
    lightbox.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    });
    
    lightbox.addEventListener('touchend', function(e) {
        endX = e.changedTouches[0].clientX;
        endY = e.changedTouches[0].clientY;
        
        const deltaX = endX - startX;
        const deltaY = endY - startY;
        
        // Only process horizontal swipes
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
            if (deltaX > 0) {
                changeImage(-1); // Swipe right - previous image
            } else {
                changeImage(1); // Swipe left - next image
            }
        }
    });
});

// Preload images for better performance
document.addEventListener('DOMContentLoaded', function() {
    galleryImages.forEach(image => {
        const img = new Image();
        img.src = image.src;
    });
});

