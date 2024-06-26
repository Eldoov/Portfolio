const scoreMap = new Map();

fetch("data.json").then(response =>
    response.json()
).then(data => {
    if (!localStorage.getItem('FMCommentData')){
        localStorage.setItem('FMCommentData', JSON.stringify(data));   
    }
    loadData();
});


function loadData(){
    const data = JSON.parse(localStorage.getItem('FMCommentData'));
    getPost(data.comments, "", 0);
    getReply();
}

function comments(postID, postContent, timeStamp, score, avatar, username) {
    this.postID = postID;
    this.postContent = postContent;
    this.timeStamp = timeStamp;
    this.score = score;
    this.avatar = avatar;
    this.username = username;
}
/*
function getPost0(data) {
    let replies = [];
    for (let i = 0; i < data.length; i++){
        replies = data[i].replies;
        comment = createPost(data[i]);
        showPost(comment, "");
        if (replies.length != 0){
            getReplies(replies, comment.postID);
        } 
    }
    getReply();
}

function getReplies(data, dataID) {
    for(let i = 0; i < data.length; i++){
        replies = data[i].replies;
        reply = createPost(data[i]);
        showPost(reply, "replyID"+dataID);
        if (replies === undefined){
            console.log("");
        } else if (replies.length != 0) {
            //console.log(reply.postID);
            getReplies(replies, reply.postID);
        }
    }
}
*/
function getPost(data, dataID, recurrsion){
    for(let i = 0; i < data.length; i++){
        replies = data[i].replies;
        post = createPost(data[i]);
        if (recurrsion == 0){
            showPost(post, dataID);
        } else {
            showPost(post, "replyID"+dataID);
        }
        if (replies === undefined){
            recurrsion -= 1;
        } else if (replies.length != 0) {
            recurrsion += 1;
            getPost(replies, post.postID, recurrsion);
        }
    }
}

function scoreUpdate(postID, change){
    let data = JSON.parse(localStorage.getItem('FMCommentData'));
    if (scoreMap.get(postID)){
        x = scoreMap.get(postID);
        x += change;
        scoreMap.set(postID, x);
        s = document.getElementById("scoreID"+postID).getElementsByClassName('rating-score')[0];
        s.innerHTML = x;
    }

}

function createPost(postInfo){
    let comment = new comments(postInfo.id, postInfo.content, postInfo.createdAt, postInfo.score, postInfo.user.image.png, postInfo.user.username);
    scoreMap.set(comment.postID, comment.score);
    return comment;
}

function showPost(comment, repID){
    let temp, post, postContent, user, avatar, time, score, reply, mainElement;
    let replyID, scoreID, inputID, postID;
    let replyBtnID, plusBtn, minusBtn;


    temp = document.getElementById("post-template");

    if (repID == ""){
        mainElement = document.querySelector('main');
    }else {
        mainElement = document.getElementById(repID);
    }

    let clon = temp.content.cloneNode(true);

    post = clon.querySelector(".getBlock");
    user = clon.querySelector(".username");
    avatar = clon.querySelector(".avatar");
    time = clon.querySelector(".time-stamps");
    score = clon.querySelector(".rating-score");
    postContent = clon.querySelector(".post-content");
    reply =  clon.querySelector(".input-block");

    scoreID = clon.getElementById("scoreID");
    replyID = clon.getElementById("replyID");
    inputID = clon.getElementById("inputID");
    postID = clon.getElementById("postID");
    replyBtnID = clon.getElementById("replyBtnID");

    plusBtn = clon.getElementById("plus");
    minusBtn = clon.getElementById("minus");

    plusBtn.setAttribute('onclick','scoreUpdate(' + comment.postID +', 1)');
    minusBtn.setAttribute('onclick','scoreUpdate(' + comment.postID +', -1)');
    
    user.textContent = comment.username;
    avatar.src = comment.avatar;
    time.textContent = comment.timeStamp;
    score.textContent = comment.score;
    postContent.textContent = comment.postContent;

    plusBtn.removeAttribute('id');
    minusBtn.removeAttribute('id');
    postID.setAttribute("id", "postID"+comment.postID);
    replyID.setAttribute("id", "replyID"+comment.postID);
    scoreID.setAttribute("id", "scoreID"+comment.postID);
    inputID.setAttribute("id", "inputID"+comment.postID);
    replyBtnID.setAttribute("id", "replyBtnID"+comment.postID);

    mainElement.appendChild(post);
    //mainElement.appendChild(reply);
}

function getReply() {
    const replyBtns = document.querySelectorAll('.reply-btn');
    replyBtns.forEach((btn) => {
        btn.addEventListener('click', e => {
            let x = e.currentTarget.id.replace(/^\D+/g, '');
            let replyblk = document.getElementById('inputID'+x);
            if (replyblk.classList.contains("hidden")){
                replyblk.classList.remove("hidden");
            } else if (!replyblk.classList.contains("hidden")){
                replyblk.classList.add("hidden");
            }
        });
    });
}