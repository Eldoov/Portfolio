const btns = document.getElementById('btns');

if (btns) {
    btns.addEventListener('click', (event) => {
        var ddd = event.target.id;
        console.log(ddd);
    })
}

