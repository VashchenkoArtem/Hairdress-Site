const buttonRight = document.querySelector('.button-right');
const buttonLeft = document.querySelector('.button-left');
const firstPhoto = document.querySelector('.first-people-example');
const secondPhoto = document.querySelector('.second-people-example');
const buttonRightPhone = document.querySelector(".button-right-phone");
const buttonLeftPhone = document.querySelector(".button-left-phone");
const secondPeoplePhone = document.querySelector(".second-people-example-phone");
const firstPeoplePhone = document.querySelector(".first-people-example-phone");

buttonRight.addEventListener('click', () => {
    console.log("right click")
    if (firstPhoto.src.includes("people_example3")) {
        firstPhoto.src = "static/main/images/people_example/people_example_first.JPG";
        secondPhoto.src = "static/main/images/people_example/people_example_second1.JPG";
    }else if(firstPhoto.src.includes("people_example_first")) {
        firstPhoto.src = "static/main/images/people_example/people_example_third.jpg";
        secondPhoto.src = "static/main/images/people_example/people_example_fourth.jpg";
    }else if(firstPhoto.src.includes("people_example_third")){
        firstPhoto.src = "static/main/images/people_example/people_example3.png";
        secondPhoto.src = "static/main/images/people_example/people_example4.png";
    }
})
buttonLeft.addEventListener('click', () => {
    if (firstPhoto.src.includes("people_example3")) {
        firstPhoto.src = "static/main/images/people_example/people_example_third.jpg";
        secondPhoto.src = "static/main/images/people_example/people_example_fourth.jpg";
    }else if (firstPhoto.src.includes("people_example_third")){
        firstPhoto.src = "static/main/images/people_example/people_example_first.JPG";
        secondPhoto.src = "static/main/images/people_example/people_example_second1.JPG";
    }else if (firstPhoto.src.includes("people_example_first")){
        firstPhoto.src = "static/main/images/people_example/people_example3.png";
        secondPhoto.src = "static/main/images/people_example/people_example4.png";
    }
})

buttonRightPhone.addEventListener('click', () => {
    if (firstPeoplePhone.src.includes("people_example3")){
        firstPeoplePhone.src = "static/main/images/people_example/people_example_first.JPG";
        secondPeoplePhone.src = "static/main/images/people_example/people_example_second1.JPG";
    }else if(firstPeoplePhone.src.includes("people_example_first")) {
        firstPeoplePhone.src = "static/main/images/people_example/people_example_third.jpg";
        secondPeoplePhone.src = "static/main/images/people_example/people_example_fourth.jpg";
    }else if(firstPeoplePhone.src.includes("people_example_third")){
        firstPeoplePhone.src = "static/main/images/people_example/people_example3.png";
        secondPeoplePhone.src = "static/main/images/people_example/people_example4.png";
    }
})
buttonLeftPhone.addEventListener('click', () => {
    if (firstPeoplePhone.src.includes("people_example3")) {
        firstPeoplePhone.src = "static/main/images/people_example/people_example_third.jpg";
        secondPeoplePhone.src = "static/main/images/people_example/people_example_fourth.jpg";
    }else if (firstPeoplePhone.src.includes("people_example_third")){
        firstPeoplePhone.src = "static/main/images/people_example/people_example_first.JPG";
        secondPeoplePhone.src = "static/main/images/people_example/people_example_second1.JPG";
    }else if (firstPeoplePhone.src.includes("people_example_first")){
        firstPeoplePhone.src = "static/main/images/people_example/people_example3.png";
        secondPeoplePhone.src = "static/main/images/people_example/people_example4.png";
    }
})