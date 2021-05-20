let timer = document.getElementById("timer");
let quoteDisplay = document.getElementById("quoteDisplay");
let quoteInput = document.getElementById("quoteInput");
let result = document.getElementById("result");
let submitBtn = document.getElementById("submitBtn");
let resetBtn = document.getElementById("resetBtn");
let spinner = document.getElementById('spinner');
let randomText = ""
let inputText = ""
let startSeconds = 0;

//clear timer 
clearTimer = () => {
    startSeconds = 0;
    clearInterval(intervalId);
}
//start the timer 
setTimeAndShow = () => {
    intervalId = setInterval(startTimer, 1000)
}
startTimer = () => {
    startSeconds = startSeconds + 1
    timer.textContent = startSeconds + " Seconds"
}

//generating a random text using  fetch 
generateRandomText = () => {
    let url = "https://apis.ccbp.in/random-quote";
    let options = {
        method: "GET",
    };
    spinner.classList.remove("d-none");
    quoteDisplay.classList.add("d-none");
    fetch(url, options)
        .then(function(response) {
            return response.json()
        })
        .then(function(jsonData) {
            randomText = jsonData.content
            console.log(jsonData)
            spinner.classList.add("d-none");
            quoteDisplay.classList.remove("d-none");
            quoteDisplay.textContent = jsonData.content;
            setTimeAndShow()
        })
}
generateRandomText()

//on click reset button 
resetRandomText = () => {
    generateRandomText()
    clearTimer()
    quoteInput.value = ""
    timer.textContent = "Wait..."
}
//on click submit button
checkContent = () => {
    inputText = quoteInput.value
    console.log(inputText)
    console.log(randomText)
    if (inputText === randomText) {
        result.textContent = `You typed in ${startSeconds} Seconds`;
        clearTimer()
        timer.textContent = "Great !"
    } else {
        result.textContent = "You Typed Incorrect Sentence";
    }
}

submitBtn.addEventListener('click', checkContent)
resetBtn.addEventListener('click', resetRandomText)
