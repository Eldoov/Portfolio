const getBill = document.getElementById('bill');
const customTip = document.getElementById('custom-tip');
const getPeople = document.getElementById('people');
const showTip = document.getElementById('tip');
const showTotal = document.getElementById('total');
const btn = document.querySelectorAll('.select-tip button');
let selectTip = 0;

function reset() {
    bill.value = '';
    customTip.value = '';
    people.value = '';
    tip.textContent = '$0.00'
    total.textContent = '$0.00'
}

btn.forEach((btn) => {
    btn.addEventListener("click", e => {
        selectTip = e.target.value;
        selectTip = Number(selectTip);
        console.log(selectTip);
    })
})

getBill.addEventListener("change", e => {
    bill = e.target.value;
})

customTip.addEventListener("change", e => {
    tip = e.target.value;
    if (selectTip != 0){
        selectTip = 0;
    }
    showTip.innerHTML = '$' + tip;
})




getPeople.addEventListener("change", e => {
    people = e.target.value;
})

function calculation(){
}