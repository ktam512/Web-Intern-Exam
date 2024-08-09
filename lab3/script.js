// JavaScript for modal functionality
const galleryItems = document.querySelectorAll('.gallery-item');
const modal = document.getElementById('myModal');
const fullImage = document.getElementById('fullImage');
const caption = document.getElementById('caption');
const close = document.querySelector('.close');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');

let currentIndex = 0;

galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        modal.style.display = "flex";
        fullImage.src = item.src;
        caption.textContent = item.alt;
        currentIndex = index;
    });

    item.addEventListener('mouseenter', () => {
        galleryItems.forEach((el, i) => {
            if (i !== index) el.classList.add('blur');
        });
    });

    item.addEventListener('mouseleave', () => {
        galleryItems.forEach((el) => {
            el.classList.remove('blur');
        });
    });
});

close.addEventListener('click', () => {
    modal.style.display = "none";
});

prev.addEventListener('click', () => {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : galleryItems.length - 1;
    updateModal();
});

next.addEventListener('click', () => {
    currentIndex = (currentIndex < galleryItems.length - 1) ? currentIndex + 1 : 0;
    updateModal();
});

function updateModal() {
    fullImage.src = galleryItems[currentIndex].src;
    caption.textContent = galleryItems[currentIndex].alt;
}