const replyBtn = document.querySelectorAll('reply');

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
}

function showComments(comment){
    let temp, postBlock, postContent, user, avatar, time, score;
    var mainElement = document.querySelector('main');

    temp = document.getElementById("post-template");
    let clon = temp.content.cloneNode(true);

    postBlock = clon.querySelector(".post");
    user = clon.querySelector(".username");
    avatar = clon.querySelector(".avatar");
    time = clon.querySelector(".time-stamps");
    score = clon.querySelector(".rating-score");
    postContent = clon.querySelector(".post-content");

    user.textContent = comment.username;
    avatar.src = comment.avatar;
    time.textContent = comment.timeStamp;
    score.textContent = comment.score;
    postContent.textContent = comment.postContent;
    mainElement.appendChild(postBlock);
}


replyBtn.forEach((replyBtn) => {
    replyBtn.addEventListener("click", e => {

    })
})