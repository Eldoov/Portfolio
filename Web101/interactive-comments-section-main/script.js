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

function comments(postID, postContent, timeStamp, avatar, username) {
    this.postID = postID;
    this.postContent = postContent;
    this.timeStamp = timeStamp;
    this.avatar = avatar;
    this.username = username;
}

function getPost(data, dataID, recurrsion){
    for(let i = 0; i < data.length; i++){
        replies = data[i].replies;
        if (replies === undefined || replies.length == 0) {
            hasReply = false; 
        } else {
            hasReply = true;
        }
        post = createPost(data[i]);
        if (recurrsion == 0){
            showPost(post, dataID, hasReply);
        } else {
            showPost(post, "replyID"+dataID, hasReply);
        }
        if (hasReply == false && recurrsion > 0){
            recurrsion -= 1;
        } else if (hasReply == true) {
            recurrsion += 1;
            getPost(replies, post.postID, recurrsion);
        }
    }
}

function scoreUpdate(postID, change){
    if (localStorage.getItem('FMCommentDataScore'+postID) != null){
        x = localStorage.getItem('FMCommentDataScore'+postID);
        x = Number(x);
        x += change;
        localStorage.setItem("FMCommentDataScore"+postID, x);
        s = document.getElementById("scoreID"+postID).getElementsByClassName('rating-score')[0];
        s.innerHTML = x;
    }

}

function createPost(postInfo){
    let comment = new comments(postInfo.id, postInfo.content, postInfo.createdAt, postInfo.user.image.png, postInfo.user.username);
    if (localStorage.getItem("FMCommentDataScore"+postInfo.id) == null){
        localStorage.setItem("FMCommentDataScore"+postInfo.id, postInfo.score);
    }
    return comment;
}

function showPost(comment, repID, hasReply){
    let temp, post, postContent, user, avatar, time, score, reply, mainElement;
    let replyID, scoreID, inputID, postID;
    let replyBtnID, plusBtn, minusBtn;

    temp = document.getElementById("post-template");

    if (repID == ""){
        mainElement = document.getElementById('allPosts');
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
    replyBlock = clon.querySelector(".reply-block");
    
    if (hasReply == false){
        replyBlock.classList.add('hidden');
    }

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
    score.textContent = localStorage.getItem('FMCommentDataScore'+comment.postID);
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
