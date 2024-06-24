let postInfo = [];

fetch("data.json").then(response =>
    response.json()
).then(data =>
    processData(data)
);

function comments(postID, postContent, timeStamp, score, username) {
    this.postID = postID;
    this.postContent = postContent;
    this.timeStamp = timeStamp;
    this.score = score;
    this.username = username;
}

function processData(data){
    postInfo = data.comments[0];
    let comment = new comments(postInfo.id, postInfo.content, postInfo.createdAt, postInfo.score, postInfo.user); 
    showComments(comment);
}

function showComments(comment){
    let temp, postBlock, postContent;
    var mainElement = document.querySelector('main');
    temp = document.getElementById("post-template");
    postBlock = temp.content.querySelector(".post-block");
    postContent = temp.content.querySelector(".post-content");
    postContent.textContent = comment.postContent;
    mainElement.appendChild(postBlock);
}