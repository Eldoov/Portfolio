/*
var score = document.createElement('div');
score.className = 'socre';
var stats = document.createElement('div');
stats.className = 'stats';
var span = document.createElement('span');
*/

fetch("data.json").then(response =>
    response.json()
).then(json => 
    showData(json)
);



function showData(data) {
    let res = 0;
    for (i = 0; i < data.length; i++) {
        // document.getElementById("stats"+i).appendChild('stats');

        var img = document.createElement('img');

        let category = data[i].category;
        let s = data[i].score;
        let icon = data[i].icon;

        img.src = icon
        document.getElementsByClassName('stats')[i].appendChild(img);
        document.getElementsByClassName('stats')[i].textContent = category;
        document.getElementsByClassName('score')[i].textContent = s;

        res += s;
    }

}