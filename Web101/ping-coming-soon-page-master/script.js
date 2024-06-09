function checkEmail(email) {
    var validation=/^[\w\-\.]+@[a-z0-9]+(\-[a-z0-9]+)?(\.[a-z0-9]+(\-[a-z0-9]+)?)*\.[a-z]{2,4}$/i;
    var isValid = validation.test(email.value);
    document.getElementById("email").value = "" ;
    if (isValid == false) {
        document.getElementById("email").style.borderColor = "var(--lightred)";
        document.getElementById("errormsg").style.display = "block";
        email.focus();
    }
    return isValid;
}