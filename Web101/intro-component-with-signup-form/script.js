function validation(){
    var validation=/^[\w\-\.]+@[a-z0-9]+(\-[a-z0-9]+)?(\.[a-z0-9]+(\-[a-z0-9]+)?)*\.[a-z]{2,4}$/i;
    let isEmpty = false;
    const form = document.forms["info-form"];
    for (let i = 0; i < form.elements.length; i++){
        const element = form.elements[i];
        const errormsg = document.getElementById("error" + i);
        if (element.type != "submit" && element.value == ""){
            element.placeholder = "";
            element.classList.add("error-icon");
            errormsg.classList.remove("hidden");
            isEmpty = true;
        } else if (element.type == "email") {
            var isValid = validation.test(element.value);
            if (!isValid) {
                element.placeholder = "email@example.com";
                element.classList.add("error-icon");
                errormsg.classList.remove("hidden");
                isEmpty = true;
            }
        }
        
    }
    return !isEmpty;
}