Array.from(document.getElementsByClassName('images')).forEach(img => {
    img.setAttribute('loading', 'lazy');
});

// data.val[0] = non-recyclable, data.val[1] = recyclable
const data = {"09/13/2025": [13.44, 3.86],
    "09/28/2025": [14.85, 2.62],
    "10/05/2025": [13.46, 8.92],
    "10/19/2025": [26.47, 3.22],
    "10/26/2025": [2.13, 2.52],
    "11/02/2025": [13.32, 11.45],
    "11/16/2025": [10.88, 7.31],
    "11/23/2025": [21.64, 22.72],
    "11/30/2025": [30.98, 7.6]
}

const imageSources = {"09/28/2025": "images/IMG_1.webp", 
    "10/05/2025": "images/IMG_2.webp",
    "10/19/2025": "images/IMG_4.webp", 
    "11/02/2025": "images/IMG_5.webp",
    "11/23/2025": "images/IMG_6.webp", 
    "11/30/2025": "images/IMG_7.webp"}

const imageOrientations = {"09/28/2025": "landscape", 
    "10/05/2025": "landscape",
    "10/19/2025": "landscape", 
    "11/02/2025": "landscape",
    "11/23/2025": "portrait", 
    "11/30/2025": "landscape"}

const imageDates = ["09/28/2025", 
    "10/05/2025", 
    "10/19/2025", 
    "11/02/2025",
    "11/23/2025", 
    "11/30/2025"];
const values = Object.values(data).flat();
const maxValue = 35;

//load in the dates
Array.from(document.getElementsByClassName('date')).forEach((barFill, index) => {
    dateStr = imageDates[index];
    const dateObj = new Date(dateStr);
    const formatter = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    barFill.innerHTML = formatter.format(dateObj);
});

//load in the images
Array.from(document.getElementsByClassName('images')).forEach((img, index) => {
    img.src = imageSources[imageDates[index]];
    img.alt = `Gallery Image ${index + 1}`;
    if (imageOrientations[imageDates[index]] === "landscape") {
        img.classList.add("images-landscape");
    } else {
        img.classList.add("images-portrait");
    }
});

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