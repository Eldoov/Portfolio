


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
            for(let j = 0; j < replies.length; j++){
                reply = createPost(replies[j]);
                showPost(reply, "replyID"+comment.postID);
            }
        } 
    }
    getReply();
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
            let x = e.currentTarget.id.replace(/^\D+/g, '');
            console.log(x);
            replyBlock.item(x-1).classList.remove("hidden");
        });
    });
}