const inputs = document.querySelectorAll(".input-modal-form")
const payloadStep = document.querySelector(".second-step")
inputs.forEach((input)=>{
    input.addEventListener("change", ()=>{
        const inputName = document.querySelector(".modal-name").value.trim()
        const inputPhone = document.querySelector(".modal-phone").value.trim()
        const inputEmail = document.querySelector(".modal-email").value.trim()
        const inputPhotos = document.querySelector(".modal-photos").files.length
        const inputWish = document.querySelector(".modal-wish")
        if (inputName && inputPhone && inputEmail && inputPhotos){
            payloadStep.classList.remove("hidden")
        }
    })
})