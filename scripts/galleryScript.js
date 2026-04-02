Array.from(document.getElementsByClassName('images')).forEach(img => {
    img.setAttribute('loading', 'lazy');
});