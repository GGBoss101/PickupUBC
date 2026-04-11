Array.from(document.getElementsByClassName('images')).forEach(img => {
    img.setAttribute('loading', 'lazy');
});

// data.waste[0] = non-recyclable, data.waste[1] = recyclable
const allGalleryData = [
    { date: "09/13/2025", waste: [13.44, 3.86] },
    { date: "09/28/2025", waste: [14.85, 2.62], images: ["images/IMG_1.webp"], orientations: ["landscape"] },
    { date: "10/05/2025", waste: [13.46, 8.92], images: ["images/IMG_2.webp"], orientations: ["landscape"] },
    { date: "10/19/2025", waste: [26.47, 3.22], images: ["images/IMG_4.webp"], orientations: ["landscape"] },
    { date: "11/02/2025", waste: [13.32, 11.45], images: ["images/IMG_5.webp"], orientations: ["landscape"] },
    { date: "11/16/2025", waste: [10.88, 7.31] },
    { date: "11/23/2025", waste: [21.64, 22.72], images: ["images/IMG_6.webp"], orientations: ["portrait"] },
    { date: "11/30/2025", waste: [30.98, 7.6], images: ["images/IMG_7.webp"], orientations: ["landscape"] },
    { date: "01/25/2026", waste: [0, 0], images: ["images/IMG_8.webp"], orientations: ["landscape"] },
    { date: "03/01/2026", waste: [0, 0], images: ["images/IMG_9.webp"], orientations: ["portrait"] },
    { date: "03/15/2026", waste: [0, 0], images: ["images/IMG_10.webp"], orientations: ["landscape"] },
    { date: "03/22/2026", waste: [0, 0], images: ["images/IMG_11.webp"], orientations: ["landscape"] },
    { date: "03/29/2026", waste: [0, 0], images: ["images/IMG_12.webp", "images/IMG_13.webp"], orientations: ["landscape", "portrait"] }
];

// Filter to only entries with images
const galleryData = allGalleryData.filter(entry => entry.images && entry.images.length > 0);

const maxValue = 35;

// Load dates
Array.from(document.getElementsByClassName('date')).forEach((dateEl, index) => {
    const { date } = galleryData[index];
    const dateObj = new Date(date);
    const formatter = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    dateEl.innerHTML = formatter.format(dateObj);
});

// Load images
Array.from(document.getElementsByClassName('images')).forEach((img, index) => {
    // Find which gallery entry this image belongs to
    const allImgs = Array.from(document.getElementsByClassName('images'));
    const galleryIndex = galleryData.findIndex((entry, gIdx) => {
        const imagesInGalleryBefore = galleryData.slice(0, gIdx).reduce((sum, e) => sum + (e.images ? e.images.length : 0), 0);
        const imagesInCurrentGallery = entry.images ? entry.images.length : 0;
        return index >= imagesInGalleryBefore && index < imagesInGalleryBefore + imagesInCurrentGallery;
    });
    
    const { images, orientations } = galleryData[galleryIndex];
    const imageIndexInGallery = index - galleryData.slice(0, galleryIndex).reduce((sum, e) => sum + (e.images ? e.images.length : 0), 0);
    
    img.src = images[imageIndexInGallery];
    img.alt = `Gallery Image - ${galleryData[galleryIndex].date}`;
    img.classList.add(orientations[imageIndexInGallery] === 'portrait' ? 'images-portrait' : 'images-landscape');
});

/*

//animation should play out every time window loads
window.addEventListener('load', function() {
    //initialize the bar fills to 0 width for animation
    Array.from(document.getElementsByClassName('chart-bar-fill')).forEach((barFill) => {
        barFill.style.width = `0%`;
    });

    //load in the bar fills
    Array.from(document.getElementsByClassName('chart-bar-fill')).forEach((barFill, index) => {
        let isRecyclable = index % 2; // Odd indices are recyclable
        let value = data[imageDates[Math.floor(index / 2)]][isRecyclable];
        barFill.style.width = `${(value / maxValue) * 100}%`;
    });
});

//load in the bar labels
Array.from(document.getElementsByClassName('chart-value')).forEach((barLabel, index) => {
    let isRecyclable = index % 2; // Odd indices are recyclable
    let dateIndex = Math.floor(index / 2);
    let date = imageDates[dateIndex];
    let value = data[date][isRecyclable];
    let valueString = String(value.toFixed(2)) + " lb";
    valueString = valueString.padStart(8, '\u2007'); // Pad with spaces to ensure consistent width
    barLabel.innerHTML = valueString;
});

*/