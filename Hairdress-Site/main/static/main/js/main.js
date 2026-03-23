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
const buttonWhyPhone = document.querySelector(".header-form-reason-phone")
const modalScreenPhone = document.querySelector(".modal-screen")
const closeModalReasonPhone = document.querySelector(".modal-reason-cross-phone")
const scrollButtonPhone = document.querySelector(".phone-scroll-button")

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

buttonWhyPhone.addEventListener("click", () => {
    modalScreenPhone.classList.remove("hidden")
})
modalScreenPhone.addEventListener("click", () => {
    modalScreenPhone.classList.add("hidden")
})
closeModalReasonPhone.addEventListener("click", () => {
    modalScreenPhone.classList.add("hidden")
})
function scrollToBlock(index) {
    isScrolling = true;

    window.scrollTo({
        top: index * window.innerHeight,
        behavior: "smooth"
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

if (document.cookie.includes("order_id")){
    modalPayloadBg.classList.remove("hidden")
    document.cookie = "order_uuid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

if (window.innerWidth < 768) {

    let touchStartY = 0;

    window.addEventListener("touchstart", (e) => {
        touchStartY = e.touches[0].clientY;
    }, { passive: true });

    window.addEventListener("touchend", (e) => {
        if (isScrolling) return;

        const touchEndY = e.changedTouches[0].clientY;
        const swipeDistance = touchStartY - touchEndY;

        if (Math.abs(swipeDistance) < 80) return;

        if (swipeDistance > 0) {
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

    }, { passive: true });

}
scrollButtonPhone.addEventListener("click", () => {
    if (currentIndex <= 7 && !scrollButtonPhone.classList.value.includes("rotated")){
        currentIndex++;
        scrollToBlock(currentIndex)
    }
    if (currentIndex > 7 && !scrollButtonPhone.classList.value.includes("rotated")){
        console.log(scrollButtonPhone.classList.value.includes("rotated"))
        currentIndex++;
        scrollButtonPhone.classList.add("rotated")
    }
    if (currentIndex == 1 && scrollButtonPhone.classList.value.includes("rotated")){
        scrollButtonPhone.classList.remove("rotated")
        currentIndex = currentIndex - 1;
        scrollToBlock(currentIndex)
    }
    if (scrollButtonPhone.classList.value.includes("rotated")){
        currentIndex = currentIndex - 1;
        scrollToBlock(currentIndex)
    }
})
window.addEventListener("scroll", () => {
    const newIndex = Math.round(window.scrollY / window.innerHeight);
    currentIndex = newIndex;

    if (currentIndex > 7) {
        scrollButtonPhone.classList.add("rotated");
    } else if (currentIndex == 0) {
        scrollButtonPhone.classList.remove("rotated")}});