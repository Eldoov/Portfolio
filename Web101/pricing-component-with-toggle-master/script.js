const toggle = document.getElementById('toggle');
const monthly = document.querySelectorAll('.monthly');
const annually = document.querySelectorAll('.annually');

toggle.addEventListener("click", e => {
    if(e.target.checked){
        monthly.forEach((monthly) => {
            monthly.classList.remove('hidden');
        })
        annually.forEach((annually) => {
            annually.classList.add('hidden');
        })
    } else {
        annually.forEach((annually) => {
            annually.classList.remove('hidden');
        })
        monthly.forEach((monthly) => {
            monthly.classList.add('hidden');
        })
    }
})