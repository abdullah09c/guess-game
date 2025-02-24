// data
let life = 100;
let level = 1;
let point = 0;
let randomNumber = -1;
let rangeMax = 10;
const bgMusic = new Audio();
bgMusic.src = "./assets/bg.mp3";
bgMusic.loop = true;
bgMusic.volume = 0.1;
bgMusic.autoplay = true;
document.addEventListener(
  "click",
  () => {
    bgMusic.play().catch((error) => console.log("Autoplay prevented:", error));
  },
  { once: true }
);
const startGame = () => {
  pronounceWord("Welcome. You have 10 Life to choose the correct number");

  hide("home-screen");
  show("play-ground");
  getEl("life").innerText = life;
  getEl("level").innerText = level;
  getEl("point").innerText = point;
  getEl("recent-guess").innerText = "";
  randomNumber = parseInt(Math.random() * rangeMax);
  set("pc-command", `<p class="animate-bounce">Computer Thinking a Number</p>`);

  setTimeout(() => {
    set(
      "pc-command",
      `<p class="font-bold">Done!! Guess The number between 0 -${rangeMax}</p>`
    );
    getEl("btn-check").disabled = false;
  }, 3000);
};

const quit = () => {
  show("home-screen");
  hide("play-ground");
  life = 10;
  level = 1;
  point = 0;
  rangeMax = 10;
  getEl("life").innerText = life;
  getEl("level").innerText = level;
  getEl("point").innerText = point;
};

const gameOver = () => {
  Swal.fire(
    `Game Over. Final Score= ${point}`,
    "I Hope you will play better Next Time",
    "success"
  );
  pronounceWord(`Game Over. Final Score= ${point}`);
  quit();
  getEl("num-input").value = "";
};

const success = () => {
  //upgrade level , points and difficulty
  pronounceWord("Yahoo!!! You Guess Perfectly");
  pronounceWord("Let's Play Another level");
  level++;
  point += 100;
  rangeMax *= 10;
  life = 10;
  Swal.fire({
    title: `Yahoo the Number is ${randomNumber} . You win 100 Points`,
    text: "Let's Play Another Level",
    icon: "success",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    cancelButtonText: "Quit Game",
    confirmButtonText: "Let's Play",
  }).then((result) => {
    if (result.isConfirmed) {
      startGame();
    } else {
      gameOver();
    }
  });
};

const retry = (numStatus, number) => {
  life--;
  getEl("life").innerText = life;
  if (life == 0) {
    gameOver();
    return;
  }

  if (numStatus == "high") {
    Swal.fire("Opps😞.Wrong Guess", "Please choose a Lower Number", "warning");
    pronounceWord("OHH!!.Wrong guess, Please choose a Lower Number");
  } else {
    Swal.fire("Opps!!.Wrong Guess", "Please choose a Higher Number", "warning");
    pronounceWord("OHH!.Wrong guess, Please choose a Higher Number");
  }

  //add number to recent Guess
  getEl("recent-guess").innerHTML += `
  <div class="flex py-3 px-5 border-4 bg-white rounded-xl text-xl">${number}</div>
  `;

  //Decrease Life & check is GameOver
};
function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-En";
  window.speechSynthesis.speak(utterance);
}
//events
getEl("start-btn").addEventListener("click", startGame);

getEl("guessing-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const number = e.target.number.value;

  if (1 < number && number > rangeMax) {
    Swal.fire({
      title: "Error!",
      text: `Please Select Number between 1 - ${rangeMax} `,
      icon: "error",
      confirmButtonText: "Let's Try Again",
    });
    e.target.reset();
    return;
  }

  if (number == randomNumber) {
    success();
    e.target.reset();
  }
  if (number > randomNumber) {
    retry("high", number);
  }
  if (number < randomNumber) {
    retry("low", number);
  }
});

getEl("quit-btn").addEventListener("click", quit);
