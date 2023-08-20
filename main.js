var gameScore = 0;
const savedScore = localStorage.getItem('score');


if(savedScore !== null){
document.querySelector("#highScore").textContent = parseInt(savedScore);
}



function makeBubbles() {
    var clutter = "";
    const bubbleContainer = document.querySelector('.bubble-container');
    
    if(bubbleContainer.clientWidth <= 320){
        var num = 24;
    }
    else if(bubbleContainer.clientWidth <= 458){
        var num = 30;
    }
    else{
        num = 95;
    }

    for (var i = 1; i <= num; i++) {
        

        var rn = Math.floor(Math.random() * 10);
        clutter += `<div class=bubble>${rn}</div>`


    }
    document.querySelector("#pbtm").innerHTML = clutter;
}
makeBubbles();

var timer = 16;
document.querySelector("#timerInterval").textContent = timer;
function runTimer() {
    var timerInterval = setInterval(function () {
        if (timer > 0) {
            timer--;
            document.querySelector("#timerInterval").textContent = timer;
        }
        else {
            clearInterval(timerInterval);
            document.querySelector("#pbtm").innerHTML = `<h1 id='finalScore'>Your Score is: ${gameScore}</h1>`;
            
             // Replace with your actual game score value
            const savedScore = localStorage.getItem('score');
            
            if (savedScore !== null) {
              // Convert the saved score to an integer
              const previousScore = parseInt(savedScore);
            
              if (gameScore > previousScore) {
                // Update local storage with the new higher score
                localStorage.setItem('score', gameScore.toString());
              }
            } else {
              // No saved score, so set the current game score
              localStorage.setItem('score', gameScore.toString());
            }
            

        }
    }, 1000)
}
runTimer();

var hitrn = 0;
function newHit() {
    hitrn = Math.floor(Math.random() * 10);
    document.querySelector("#hitval").textContent = hitrn;
}
newHit();


document.querySelector("#score").textContent = gameScore;
function increaseScore() {
    gameScore += 10;
    document.querySelector("#score").textContent = gameScore + "";
}

document.querySelector("#pbtm").addEventListener("click", function (details) {
    // alert("Bubble clicked!");
    console.log(details.target);
    console.log(details.target.textContent);
    console.log(Number(details.target.textContent));
    var clickednum = (Number(details.target.textContent));
    if (hitrn === clickednum) {
        increaseScore();
        makeBubbles();
        newHit();
    }
    else {
        makeBubbles();
        newHit();
    }
})



function calculateMaxBubbles() {
    const bubbleContainer = document.querySelector('.bubble-container');
    const bubbleWidth = 75; // Adjust as needed
    const bubbleHeight = 75;
    const containerWidth = bubbleContainer.clientWidth - 140;
    const containerHeight = bubbleContainer.clientHeight - 140;
    const maxBubblesHorizontal = Math.floor(containerWidth / bubbleWidth);
    const maxBubblesVertical = Math.floor(containerHeight / bubbleHeight);
    console.log(maxBubblesHorizontal);
    console.log(maxBubblesVertical);
    var totalBubbles = maxBubblesHorizontal * maxBubblesVertical;
    return totalBubbles;
}



function updateBubbles() {
    const totalBubbles = calculateMaxBubbles();
    console.log(totalBubbles);
    makeBubble(totalBubbles);
}


window.addEventListener('load', makeBubbles);
window.addEventListener('resize', makeBubbles);
