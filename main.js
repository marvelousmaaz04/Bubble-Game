var gameScore = 0;
const savedScore = localStorage.getItem('score');

if (savedScore !== null) {
  const score = parseInt(savedScore); // Convert the saved string back to an integer
  // Do something with the retrieved score value, such as displaying it on the page
  document.querySelector("#highScore").textContent = score + "";
}
else{
    document.querySelector("#highScore").textContent = "0";
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
        // backticks and single quotes both are used to store strings but `` are used for dynamic values (string interpolation)
        // for single quotes
        // var test = "hello" + 2 + 2;
        // console.log(test)

        var rn = Math.floor(Math.random() * 10);
        clutter += `<div class=bubble>${rn}</div>`


    }
    document.querySelector("#pbtm").innerHTML = clutter;
}
makeBubbles();

var timer = 60;
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
            // Assuming you have a variable called 'score' that holds the score value
             // Replace with your actual score value
             if (savedScore !== null) {
                const savedScore = localStorage.getItem('score');
                if(gameScore > savedScore)
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
// increaseScore();

// Event bubbling is a method of event propagation in the HTML DOM API when an event is in an element inside another element, and both elements have registered a handle to that event. It is a process that starts with the element that triggered the event and then bubbles up to the containing elements in the hierarchy. In event bubbling, the event is first captured and handled by the innermost element and then propagated to outer elements.
// we are adding click listener to the parent directly so that we need not create 100 listeners for each bubble
// all the deatils of the bubble clicked will be passed in the func
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

// console.log(test);
// var test=""
// undefined means no value and not defined means does not exist

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

// Call updateBubbles when the page loads and when the window is resized
window.addEventListener('load', makeBubbles);
window.addEventListener('resize', makeBubbles);
