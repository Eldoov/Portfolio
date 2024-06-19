fetch("data.json").then(response =>
    response.json()
).then(json => 
    showData(json)
);


function showData(data) {
    let sum = 0;
    let category = '';
    let s = 0;
    const imgarray = [];
    
    for (i = 0; i < data.length; i++) {
        // document.getElementById("stats"+i).appendChild('stats');
        imgarray[i] = document.createElement('img');
        category = data[i].category;
        s = data[i].score;
        imgarray[i].src = data[i].icon;

        console.log(imgarray);
        document.getElementsByClassName('stats')[i].appendChild(imgarray[i]);
        document.getElementsByClassName('stats')[i].innerHTML += category;
        document.getElementsByClassName('score')[i].textContent = s;

        sum += s;
    }

    res = Math.floor(sum / 4);
    document.getElementById('res').textContent = res;

}