function getRating(val) {
    res = val;
}

function showRes(){
    document.getElementById('res').innerHTML=res;
    document.getElementById('rating').style.display='none';
    document.getElementById('thankyou').style.display='flex';
}