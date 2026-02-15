const buttonMenu = document.querySelector(".button-menu");
const buttonMenuPhone = document.querySelector(".button-menu-phone");
const menuContainer = document.querySelector(".modal-hat-frame");
const closeMenu = document.querySelector(".button-cross");
const closeMenuPhone = document.querySelector(".button-cross-phone");
const screenWidth = window.innerWidth;
const laptopDesign = document.querySelector(".design-for-laptop");
const phoneDesign = document.querySelector(".design-for-phone");
const modalPhone = document.querySelector(".modal-frame-phone");
const titlePhone = document.querySelector(".title-hat-phone");
const modalPayload = document.querySelector(".consultation-form");
const modalPayloadBg = document.querySelector(".blur-payload-bg");
const buttons = document.querySelectorAll(".button"); 
const buttonWhy = document.querySelector(".header-form-attention")
const modalReason = document.querySelector(".modal-reason")
const modalReasonCross = document.querySelector(".modal-reason-cross")

if (screenWidth < 768){
    phoneDesign.classList.remove("hidden");
    laptopDesign.classList.add("hidden");
}else if(screenWidth > 767){
    laptopDesign.classList.remove("hidden");
    phoneDesign.classList.add("hidden");
}

buttonMenu.addEventListener("click", ()=>{
    buttonMenu.classList.toggle("hidden");
    menuContainer.classList.toggle("hidden");
    menuContainer.classList.toggle("hide-or-show-modal");
})

closeMenu.addEventListener("click", ()=> {
    buttonMenu.classList.toggle("hidden");
    menuContainer.classList.toggle('hidden');
    menuContainer.classList.toggle("hide-or-show-modal");
})

buttonMenuPhone.addEventListener("click", () => {
    buttonMenuPhone.classList.toggle("hide");
    titlePhone.classList.toggle("hide");
    modalPhone.classList.toggle("hide");
})

closeMenuPhone.addEventListener("click", () => {
    buttonMenuPhone.classList.toggle("hide");
    titlePhone.classList.toggle("hide");
    modalPhone.classList.toggle("hide");
})

buttons.forEach((button)=>{
    button.addEventListener("click", ()=>{
        modalPayload.classList.toggle("hidden");
        modalPayloadBg.classList.toggle("hidden");
    })
})
modalPayloadBg.addEventListener("click", ()=>{
    modalPayload.classList.add("hidden");
    modalReason.classList.add("hidden")
    modalPayloadBg.classList.add("hidden");
})
buttonWhy.addEventListener("click", () => {
    modalReason.classList.remove("hidden")
})
modalReasonCross.addEventListener("click", () => {
    modalReason.classList.add("hidden")
})
const blocks = document.querySelectorAll(".block");
let currentIndex = 0;
let isScrolling = false;

function scrollToBlock(index) {
    isScrolling = true;

    blocks[index].scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

    setTimeout(() => {
        isScrolling = false;
    }, 800);
}

window.addEventListener("wheel", (event) => {
    if (isScrolling) return;

    if (event.deltaY > 0) {
        if (currentIndex < blocks.length - 1) {
            currentIndex++;
            scrollToBlock(currentIndex);
        }
    } else {
        if (currentIndex > 0) {
            currentIndex--;
            scrollToBlock(currentIndex);
        }
    }
});
const phoneBlocks = document.querySelectorAll(".design-for-phone .block");
let currentIndexPhone = 0;
let isScrollingPhone = false;

function goToBlockPhone(index) {
    if (!phoneBlocks[index]) return;

    isScrollingPhone = true;
    phoneBlocks[index].scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

    setTimeout(() => {
        isScrollingPhone = false;
    }, 900);
}

window.addEventListener("wheel", (e) => {
    if (isScrollingPhone) return;

    if (window.innerWidth > 768) return;

    if (e.deltaY > 0) {
        if (currentIndexPhone < phoneBlocks.length - 1) {
            currentIndexPhone++;
            goToBlockPhone(currentIndexPhone);
        }
    } else {
        if (currentIndexPhone > 0) {
            currentIndexPhone--;
            goToBlockPhone(currentIndexPhone);
        }
    }
});

let touchStartY = 0;

window.addEventListener("touchstart", (e) => {
    touchStartY = e.touches[0].clientY;
});

window.addEventListener("touchend", (e) => {
    if (isScrollingPhone) return;

    let touchEndY = e.changedTouches[0].clientY;
    let diff = touchStartY - touchEndY;

    if (diff > 30 && currentIndexPhone < phoneBlocks.length - 1) {
        currentIndexPhone++;
        goToBlockPhone(currentIndexPhone);
    }

    if (diff < -30 && currentIndexPhone > 0) {
        currentIndexPhone--;
        goToBlockPhone(currentIndexPhone);
    }
});

if (document.cookie.includes("order_id")){
    modalPayloadBg.classList.remove("hidden")
    document.cookie = "order_uuid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}
