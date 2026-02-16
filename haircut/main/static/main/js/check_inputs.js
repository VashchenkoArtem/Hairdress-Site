const inputs = document.querySelectorAll(".input");
const payloadStep = document.querySelector(".second-step");
const inputsPhone = document.querySelectorAll(".modal-input-phone");
const payloadStepPhone = document.querySelector(".modal-payment-methods");

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
        const cookies = document.cookie.split(";");
        for (let cookie of cookies) {
            cookie = cookie.trim();
            if (cookie.startsWith(name + "=")) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
inputs.forEach((input) => {
    input.addEventListener("change", async () => {
        const inputName = document.querySelector(".modal-name").value.trim();
        const inputPhone = document.querySelector(".modal-phone").value.trim();
        const inputEmail = document.querySelector(".modal-email").value.trim();
        const inputWish = document.querySelector(".modal-wish").value.trim();
        const inputPhotos = document.querySelector(".modal-photos").files;

        const name = document.getElementById("inputName").value.trim();
        const phone = document.getElementById("inputPhone").value.trim();
        const email = document.getElementById("inputEmail").value.trim();
        const wish = document.getElementById("inputWishlist").value.trim();
        const photos = document.getElementById("idPhoto").files;
        if (inputName && inputPhone && inputEmail && inputPhotos.length > 0 || name && phone && email && photos.length > 0) {
            const formData = new FormData();
            console.log("asdad")
            formData.append("name", inputName);
            formData.append("email", inputEmail);
            formData.append("phone", inputPhone);
            formData.append("wish", inputWish);
            for (let i = 0; i < inputPhotos.length; i++) {
                formData.append("photos", inputPhotos[i]);
            }
            const response = await fetch(
                "https://latonia-unvigorous-eula.ngrok-free.dev/create-order/",
                {
                    method: "POST",
                    headers: {
                        "X-CSRFToken": getCookie("csrftoken"),
                    },
                    body: formData,
                }
            );
            const result = await response.json()
            document.getElementById("liqpayData").value = result.liqpay.data
            document.getElementById("liqpaySignature").value = result.liqpay.signature
            document.cookie = `order_uuid=${result.order_uuid};path=/`
            payloadStep.classList.remove("hidden");
            document.querySelector(".mono-button").addEventListener("click", () => {
                window.location.href = result.mono.payment_url
            })
        }
    });
});

inputsPhone.forEach((input) => {
    input.addEventListener("change", async () => {
        const inputName = document.querySelector(".modal-phone-name").value.trim();
        const inputPhone = document.querySelector(".modal-phone-number").value.trim();
        const inputEmail = document.querySelector(".modal-phone-email").value.trim();
        const inputWish = document.querySelector(".modal-phone-wish").value.trim();
        const inputPhotos = document.querySelector(".modal-phone-photos").files;
        console.log(inputPhotos)
        if (inputName && inputPhone && inputEmail && inputPhotos.length > 0) {
            const formData = new FormData();
            formData.append("name", inputName);
            formData.append("email", inputEmail);
            formData.append("phone", inputPhone);
            formData.append("wish", inputWish);

            for (let i = 0; i < inputPhotos.length; i++) {
                formData.append("photos", inputPhotos[i]);
            }

            const response = await fetch(
                "https://latonia-unvigorous-eula.ngrok-free.dev/create-order/",
                {
                    method: "POST",
                    headers: {
                        "X-CSRFToken": getCookie("csrftoken"),
                    },
                    body: formData,
                }
            );
            const result = await response.json()
            console.log(result)
            document.getElementById("liqpayDataPhone").value = result.liqpay.data
            document.getElementById("liqpaySignaturePhone").value = result.liqpay.signature
            document.cookie = `order_uuid=${result.order_uuid};path=/`
            payloadStepPhone.classList.remove("hidden");
            document.querySelectorAll(".mono-button").forEach((button)=>{
                button.addEventListener("click", () => {
                    window.location.href = result.mono.payment_url
                })
            })
        }
    });
});