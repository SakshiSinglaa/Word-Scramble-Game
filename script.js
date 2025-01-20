const wordText = document.querySelector(".word");
const hintText = document.querySelector(".hint span");
const timeText = document.querySelector(".time b");
const inputField = document.querySelector("input");
const refreshBtn = document.querySelector("#refresh");
const checkButton = document.querySelector("#check");

let correctWord, timer;

const initTimer = maxTime => {
    clearInterval(timer);
    timer = setInterval(() => {
        if(maxTime > 0){
            maxTime--;
            return timeText.innerText = maxTime;
        }
        clearInterval(timer);
        alert(`Time's up! The correct word is ${correctWord.toUpperCase()}`);
        initGame();
    }, 1000);
}

const initGame = () => {
    let randomObj = words[Math.floor(Math.random() * words.length)];
    let wordArray = randomObj.word.split("");
    
    for(let i = wordArray.length-1; i > 0; i--){
        let j = Math.floor(Math.random() * (i+1));

        [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
    }
    wordText.innerText = wordArray.join("");
    hintText.innerText = randomObj.hint;
    correctWord = randomObj.word.toLowerCase();
    inputField.value = "";
    inputField.setAttribute("maxlength", correctWord.length);
    
    initTimer(30);
}

const checkWord = () => {
    let userWord = inputField.value.toLowerCase();
    if(!userWord)
        return alert("Please enter a word.");
    if(userWord != correctWord)
        return alert(`Oops! ${userWord} is not the correct word. Try again!`);
    alert(`Congrats! ${userWord.toUpperCase()} is the correct word.`);

    initGame();
}

refreshBtn.addEventListener("click", initGame);
checkButton.addEventListener("click", checkWord);

initGame();