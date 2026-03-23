const inputsForm = document.querySelectorAll(".input-form-laptop")

inputsForm.forEach((input) => {
    input.addEventListener("change", () => {
        const inputModalId = input.id + "Modal"
        console.log(input.id)
        const inputsModal = document.querySelectorAll(`#${inputModalId}`)
        inputsModal.forEach((inputModal) => {
            inputModal.value = input.value
        })
    })
})