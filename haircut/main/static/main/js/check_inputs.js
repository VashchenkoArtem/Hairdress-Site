const inputs = document.querySelectorAll(".input-modal-form");
const payloadStep = document.querySelector(".second-step");
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