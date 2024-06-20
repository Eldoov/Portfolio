const getBill = document.getElementById('bill');
const customTip = document.getElementById('custom-tip');
const getPeople = document.getElementById('people');
const showTip = document.getElementById('tip');
const showTotal = document.getElementById('total');
const btn = document.querySelectorAll('.select-tip button');
const errormsg = document.getElementById('error');
let tip = 0;
let selectTip = 0;

function reset() {
    const selected = document.querySelector('.selected');
        if (selected) {
            selected.classList.remove('selected');
        }
    getBill.value = '';
    customTip.value = '';
    getPeople.value = '';
    showTip.textContent = '$0.00'
    showTotal.textContent = '$0.00'
}

btn.forEach((btn) => {
    btn.addEventListener("click", e => {
        const selected = document.querySelector('.selected');
            if (selected) {
                selected.classList.remove('selected');
            }
        if (tip != 0){
            customTip.value = '';
            tip = 0;
        }
        selectTip = e.target.value;
        e.target.classList.add('selected');
        selectTip = Number(selectTip);
    })
})

getBill.addEventListener("input", e => {
    bill = e.target.value;
    bill = Number(bill);
})

customTip.addEventListener("input", e => {
    if (selectTip != 0){
        selectTip = 0;
        document.querySelector('.selected').classList.remove('selected');
    }
    tip = Number(e.target.value);
})

getPeople.addEventListener("input", e => {
    people = e.target.value;
    if (people == 0){
        getPeople.classList.add('error');
        errormsg.classList.remove('hidden');
        errormsg.innerHTML = 'Can\'t be zero';
    } else if (isNaN(people)) {
        getPeople.classList.add('error');
    } else {
        getPeople.classList.remove('error');
        errormsg.classList.add('hidden');
        people = Number(people);
        calculation();
    }
})

function calculation(){
    temp = 0;
    if (selectTip != 0 && tip == 0){
        temp = bill * selectTip;
        temp = Number(temp.toFixed(2));
    } else {
        temp = tip;
    }
    total = (bill + temp) / people;
    tipnum = temp / people;
    total = Number(total.toFixed(2))
    tipnum = Number(tipnum.toFixed(2))
    showTip.textContent = '$' + tipnum;
    showTotal.textContent = '$' + total;
}