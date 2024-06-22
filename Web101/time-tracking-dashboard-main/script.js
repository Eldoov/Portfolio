var currentData = document.getElementsByClassName('currentData');
var previousData = document.getElementsByClassName('previousData');
var btn = document.querySelectorAll('.filter');
const dailyArray =[] , weeklyArray = [], monthlyArray = [] ;
let dataArray = [], timeInfo = 'Yesterday';

fetch("data.json").then(response => 
    response.json()
).then(data =>
    processData(data)
);

function processData(data) {
    for (let i = 0; i < data.length; i++) {
        dailyArray[i] = data[i].timeframes.daily;
        weeklyArray[i] = data[i].timeframes.weekly;
        monthlyArray[i] = data[i].timeframes.monthly;
    }
    dataArray = dailyArray;
    showData();
}

btn.forEach((btn) => {
    btn.addEventListener("click", e => {
        const active = document.querySelector(".active");
        if (active) {
            active.classList.remove("active");
        }
        selected = e.target;
        selected.classList.add("active");
        if (selected.innerHTML == 'Daily'){
            dataArray = dailyArray;
            timeInfo = 'Yesterday';
            showData();
        } else if (selected.innerHTML == 'Weekly') {
            dataArray = weeklyArray;
            timeInfo = 'Last Week';
            showData();
        } else {
            dataArray = monthlyArray;
            timeInfo = 'Last Month';
            showData();
        }
    })
})


function showData(){
    for (let i = 0; i < currentData.length; i++) {
        currentData.item(i).innerHTML = dataArray[i].current + "hrs";
        previousData.item(i).innerHTML = timeInfo + " - " + dataArray[i].previous + "hrs";
    }
}