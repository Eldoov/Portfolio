const btn = document.querySelectorAll('.btns button');

btn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        console.log("good");
    })
})