


fetch("data.json").then(response =>
    response.json()
).then(data =>
    processData(data.comments)
);

function comments(postID, postContent, timeStamp, score, avatar, username) {
    this.postID = postID;
    this.postContent = postContent;
    this.timeStamp = timeStamp;
    this.score = score;
    this.avatar = avatar;
    this.username = username;
}

function processData(data){
    let postInfo = [];
    for (let i = 0; i < data.length; i++){
        postInfo = data[i];
        let comment = new comments(postInfo.id, postInfo.content, postInfo.createdAt, postInfo.score, postInfo.user.image.png, postInfo.user.username);
        showComments(comment);
    }
    getReply();
}

function showComments(comment){
    let temp, post, postContent, user, avatar, time, score, reply;
    var mainElement = document.querySelector('main');

    temp = document.getElementById("post-template");
    let clon = temp.content.cloneNode(true);

    post = clon.querySelector(".post");
    user = clon.querySelector(".username");
    avatar = clon.querySelector(".avatar");
    time = clon.querySelector(".time-stamps");
    score = clon.querySelector(".rating-score");
    postContent = clon.querySelector(".post-content");
    reply =  clon.querySelector(".input-block")

    user.textContent = comment.username;
    avatar.src = comment.avatar;
    time.textContent = comment.timeStamp;
    score.textContent = comment.score;
    postContent.textContent = comment.postContent;
    mainElement.appendChild(post);
    mainElement.appendChild(reply);
}

function getReply() {
    const replyBtns = document.querySelectorAll('.reply-btn');
    const replyBlock = document.getElementsByClassName('input-block');
    let tmp = -1;
    let index;
    replyBtns.forEach((btn) => {
        btn.addEventListener('click', (event) => {
            index = Array.prototype.indexOf.call(replyBtns, event.currentTarget);
            console.log(index, tmp); 
            if (index == tmp){
                replyBlock.item(index).classList.add("hidden");
                tmp = -1;
            }else {
                event.currentTarget.classList.add("selectre");
                replyBlock.item(index).classList.remove("hidden");
                tmp = index;
            }
        });
    });
}