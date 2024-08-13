const keypad = document.getElementById('keypad');

window.addEventListener('load', function () {
    test();
  })


function test() {
    let keys = ["7", "8", "9", "DEL",
                "4", "5", "6", "+",
                "1", "2", "3", "-",
                ".", "0", "/", "x",
                "RESET", "="
    ]

    for (let i = 0; i < keys.length; i++){
        let createBtn = document.createElement('button');
        createBtn.innerHTML = keys[i];
        createBtn.value = keys[i];
        
        if (i == 3 || i == 16) {
            createBtn.classList.add('btn2');
        } else if(i == 17) {
            createBtn.classList.add('togglebtn');
        } else {
            createBtn.classList.add('btn1');
        }

        if (i > 15) {
            createBtn.classList.add('widebtn');
        }
        keypad.appendChild(createBtn);

    }
}