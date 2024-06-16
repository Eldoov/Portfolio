const btn = document.querySelectorAll(".btns button");
const submit = document.querySelector(".submit");
const rating = document.getElementById("rating");
const thankyou = document.getElementById("thankyou");
const res = document.getElementById("res");

btn.forEach((btn) => {
    btn.addEventListener("click", e =>{
        const checked =  document.querySelector('.checked');
        if (checked) {
            checked.classList.remove("checked");
        }
        selected = e.target;
        selected.classList.add("checked");
        rate = selected.innerText;
    })
})

submit.addEventListener("click", e => {
    if (rate) {
        res.innerHTML = rate;
        rating.classList.add("hidden");
        thankyou.classList.remove("hidden");
    }
})