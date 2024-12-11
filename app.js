let circle = document.querySelector('.circle');
let slider = document.querySelector('.slider');
let list = document.querySelector('.list');
let prev = document.getElementById('prev');
let next = document.getElementById('next');
let items = document.querySelectorAll('.list .item');
let count = items.length;
let active = 0;
let leftTransform = 0;
let width_item = items[active].offsetWidth;

let rateButton = document.querySelector('.slider .content button');
let modalOverlay = document.querySelector('.modal-overlay');
let closeButton = document.querySelector('.modal .close-btn');

// Show the modal when the "Rate us" button is clicked
rateButton.onclick = () => {
    modalOverlay.style.display = 'flex'; // Show the modal
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
};

// Close the modal when the close button is clicked
closeButton.onclick = () => {
    modalOverlay.style.display = 'none'; // Hide the modal
    document.body.style.overflow = 'auto'; // Re-enable scrolling
};

// Dish names for the circle text
const dishNames = [
    'Pump-king Soup | Pump-king Soup | Pump-king Soup | Pump-king Soup | Pump-king Soup | ',
    'Paneer Pockets | Paneer Pockets | Paneer Pockets | Paneer Pockets | Paneer Pockets | ',
    'Parmesan Makh-rooms | Parmesan Makh-rooms | Parmesan Makh-rooms | Parmesan Makh-rooms | ',
    'Eggs-quisite Tomato | Eggs-quisite Tomato | Eggs-quisite Tomato | Eggs-quisite Tomato | ',
    "Muffin' to Worry About | Muffin' to Worry About | Muffin' to Worry About | Muffin' to Worry About | ",
    'Berry Good Vibes | Berry Good Vibes | Berry Good Vibes | Berry Good Vibes | Berry Good Vibes | '
];

// Function to move to the next slide
defaultSlider = () => {
    active = (active + 1) % count; // Loop back to the first item after the last
    runCarousel();
};

// Function to run the carousel logic
function runCarousel() {
    prev.style.display = active === 0 ? 'none' : 'block';
    next.style.display = active === count - 1 ? 'none' : 'block';

    let old_active = document.querySelector('.item.active');
    if (old_active) old_active.classList.remove('active');
    items[active].classList.add('active');

    leftTransform = width_item * (active - 1) * -1;
    list.style.transform = `translateX(${leftTransform}px)`;

    // Update the circle text
    updateCircleText(dishNames[active]);
}

// Function to update the circle text
function updateCircleText(text) {
    circle.innerHTML = '';
    const textCircle = text.split('');
    textCircle.forEach((value, key) => {
        let newSpan = document.createElement('span');
        newSpan.innerText = value;
        let rotateThisSpan = (360 / textCircle.length) * (key + 1);
        newSpan.style.setProperty('--rotate', rotateThisSpan + 'deg');
        circle.appendChild(newSpan);
    });
}

// Set an interval to automatically swipe every 4 seconds
let autoSwipe = setInterval(defaultSlider, 2000);

// Button click functionality remains for manual swiping
next.onclick = () => {
    active = active >= count - 1 ? count - 1 : active + 1;
    runCarousel();
};

prev.onclick = () => {
    active = active <= 0 ? active : active - 1;
    runCarousel();
};

runCarousel();
