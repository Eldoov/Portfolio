const resAdvice = document.querySelector('.adviceText');
const resID = document.querySelector('.adviceID');
const btn = document.getElementById('btn');

function getAdvice() {
    fetch("https://api.adviceslip.com/advice").then(response => {
        return response.json();
    }).then(adviceData => {
        console.log(adviceData);
        let adviceID = adviceData.slip.id;
        let advice = adviceData.slip.advice;
        resID.innerHTML = adviceID;
        resAdvice.innerHTML = advice;
    })
}

getAdvice();

btn.addEventListener("click", e => {
    getAdvice();
})