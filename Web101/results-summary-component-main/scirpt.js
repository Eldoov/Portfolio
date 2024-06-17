var score = document.createElement('div');
score.className = 'socre';
var stats = document.createElement('div');
stats.className = 'stats';
var span = document.createElement('span');

/*
fetch("data.json").then(response =>
    response.json()
).then(json => 
    console.log(json)
);
*/

function showData(data) {
    for (i = 0; i < data.length; i++) {
        // document.getElementById("stats"+i).appendChild('stats');

        let category = data[i].category;
        let s = date[i].score;
        let icon = data[i].icon;

    }

}