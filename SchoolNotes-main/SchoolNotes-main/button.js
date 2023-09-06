const images = [
  '../NotesWebpage/Image/tentonM.png', // Relative path to the "images" directory
  '../NotesWebpage/Image/stanton.jpg',
  '../NotesWebpage/Image/gunna-gunna-wunna (1).gif',
];

let currentImageIndex = 0;

const bodyElement = document.body;
const changeBgButton = document.getElementById('changeBgButton');

function changeBackground() {
  bodyElement.style.backgroundImage = `url(${images[currentImageIndex]})`;
  currentImageIndex = (currentImageIndex + 1) % images.length;
}

changeBgButton.addEventListener('click', changeBackground);
