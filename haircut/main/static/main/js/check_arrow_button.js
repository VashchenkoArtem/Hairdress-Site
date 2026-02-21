const buttonsRight = document.querySelectorAll('.button-right');
const buttonsLeft = document.querySelectorAll('.button-left');

const firstPhotos = document.querySelectorAll('.first-people-example');
const secondPhotos = document.querySelectorAll('.second-people-example');

const images = [
    ["people_example3.png", "people_example4.png"],
    ["people_example_first.jpg", "people_example_second.jpg"],
    ["people_example_third.jpg", "people_example_fourth.jpg"],
    ["people_example_fifth.jpg", "people_example_sixth.jpg"],
    ["people_example_seventh.jpg", "people_example_eight.jpg"],
    ["people_example_nine.jpg", "people_example_ten.jpg"],
    ["people_example_eleven.jpg", "people_example_twelve.jpg"],
    ["people_example_thirteen.jpg", "people_example_fourteen.jpg"],
];

let currentPhotoIndex = 0;

function updateImages() {
    firstPhotos.forEach((firstPhoto) => {
        firstPhoto.src = `static/main/images/people_example/${images[currentPhotoIndex][0]}`;
    })
    secondPhotos.forEach((secondPhoto) => {
        secondPhoto.src = `static/main/images/people_example/${images[currentPhotoIndex][1]}`;
    })
}
buttonsRight.forEach((buttonRight) => {
    buttonRight.addEventListener('click', () => {
        currentPhotoIndex++;
        if (currentPhotoIndex >= images.length) {
            currentPhotoIndex = 0;
        }
        updateImages();
    });
})
buttonsLeft.forEach((buttonLeft) => {
    buttonLeft.addEventListener('click', () => {
        currentPhotoIndex--;
        if (currentPhotoIndex < 0) {
            currentPhotoIndex = images.length - 1;
        }
        updateImages();
    });
})