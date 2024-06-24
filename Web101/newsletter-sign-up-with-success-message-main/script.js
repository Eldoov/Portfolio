const dismissBtn = document.getElementById("dismissMsg");
const signup = document.getElementsByClassName("sign-up")[0];
const success = document.getElementsByClassName("success")[0];
const errorMsg = document.getElementsByClassName("errorMsg")[0];
const showEmail = document.getElementById("showEmail");
const form = document.getElementById("subscribe");

dismissBtn.addEventListener("click", e => {
    email.value = "";
    success.classList.add("hidden");
    signup.classList.remove("hidden");
})

form.addEventListener("submit", e => {
    e.preventDefault();
    let email = document.getElementById("email");
    var validation=/^[\w\-\.]+@[a-z0-9]+(\-[a-z0-9]+)?(\.[a-z0-9]+(\-[a-z0-9]+)?)*\.[a-z]{2,4}$/i;
    var isValid = validation.test(email.value);
    if (isValid == false){
        errorMsg.classList.remove("hidden");
        email.classList.add("error");
    } else {
        clearError();
        showEmail.innerHTML = email.value;
        signup.classList.add("hidden");
        success.classList.remove("hidden");
    }
})


function clearError() {
    errorMsg.classList.add("hidden");
    email.classList.remove("error");
}