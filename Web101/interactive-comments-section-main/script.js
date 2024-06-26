


fetch("data.json").then(response =>
    response.json()
).then(data =>
    getPost(data.comments)
);

function comments(postID, postContent, timeStamp, score, avatar, username) {
    this.postID = postID;
    this.postContent = postContent;
    this.timeStamp = timeStamp;
    this.score = score;
    this.avatar = avatar;
    this.username = username;
}

function getPost(data) {
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
            console.log(reply.postID);
            getReplies(replies, reply.postID);
        }
    }
}


function createPost(postInfo){
    let comment = new comments(postInfo.id, postInfo.content, postInfo.createdAt, postInfo.score, postInfo.user.image.png, postInfo.user.username);
    return comment;
}

function showPost(comment, repID){
    let temp, post, postContent, user, avatar, time, score, reply, mainElement;
    let replyID, scoreID, inputID, postID;
    let replyBtnID;

    if (repID == ""){
        temp = document.getElementById("post-template");
        mainElement = document.querySelector('main');
    }else {
        temp = document.getElementById("post-template");
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
    

    user.textContent = comment.username;
    avatar.src = comment.avatar;
    time.textContent = comment.timeStamp;
    score.textContent = comment.score;
    postContent.textContent = comment.postContent;

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
    const replyBlock = document.querySelectorAll('.input-block');
    
    replyBtns.forEach((btn) => {
        btn.addEventListener('click', e => {
            const selected = document.querySelector('.selected');
            let x = e.currentTarget.id.replace(/^\D+/g, '');
            let y = -1;
            if (selected) {
                selected.classList.add("hidden");
                y = selected.id.replace(/^\D+/g, '');
                selected.classList.remove("selected");
            }
            if (x != y){
                replyBlock.item(x-1).classList.remove("hidden");
                replyBlock.item(x-1).classList.add("selected");
            }
            
        });
    });
}