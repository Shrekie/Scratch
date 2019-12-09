let seeShim = document.getElementById("seeShim");
let message = document.getElementById("message");

seeShim.addEventListener("click", () => {
    window.location.href = "./scratchCard.html?" + message.value;
});