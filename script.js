let players = 0;
let spies = 0;
let roles = [];
let currentPlayer = 0;

const words = [
"Pizza",
"Airport",
"School",
"Hospital",
"Beach",
"Library",
"Cinema",
"Restaurant",
"Hotel",
"Park",
"Supermarket",
"Train",
"Airplane",
"Zoo",
"Museum",
"Space",
"Island",
"Desert",
"Mountain",
"Forest"
];

let secretWord = "";

let time = 180;
let timer = null;

function startGame(){

secretWord = words[Math.floor(Math.random() * words.length)];

players = parseInt(document.getElementById("players").value);
spies = parseInt(document.getElementById("spies").value);

if(players <= 0 || spies < 0 || spies >= players){
alert("Invalid numbers");
return;
}

roles = [];

for(let i=0;i<spies;i++){
roles.push("Spy");
}

for(let i=0;i<players-spies;i++){
roles.push("Citizen");
}

roles.sort(()=>Math.random()-0.5);

document.getElementById("setup").style.display="none";
document.getElementById("game").style.display="block";

currentPlayer = 0;

document.getElementById("playerTurn").innerText =
"Player " + (currentPlayer+1);

// reset card
document.getElementById("roleText").innerText = "";
document.getElementById("roleImage").src = "purple.jpg";

}

function showRole(){
document.getElementById("roleImage").style.display = "block";

if(roles[currentPlayer] === "Spy"){

document.getElementById("roleImage").src="mrWhatsit.jpg";
document.getElementById("roleText").innerText = "SPY";

}
else{

document.getElementById("roleImage").src = "purple.jpg";
document.getElementById("roleText").innerText = secretWord;

}

}

function nextPlayer(){

document.getElementById("roleText").innerText = "";
document.getElementById("roleImage").style.display = "none";


currentPlayer++;

if(currentPlayer >= players){

document.getElementById("playerTurn").innerText =
"All players have their roles!";

document.getElementById("revealBtn").style.display="none";
document.getElementById("nextBtn").style.display="none";

document.getElementById("timer").style.display="block";
document.getElementById("revealSpiesBtn").style.display="block";

startTimer();

return;
}

document.getElementById("playerTurn").innerText =
"Player " + (currentPlayer+1);

}

function startTimer(){

if(timer !== null){
clearInterval(timer);
}

time = 180;

timer = setInterval(function(){

let minutes = Math.floor(time/60);
let seconds = time % 60;

if(seconds < 10){
seconds = "0" + seconds;
}

document.getElementById("timer").innerText =
minutes + ":" + seconds;

time--;

if(time < 0){
clearInterval(timer);
alert("Time is over!");
}

},1000);

}

function revealSpies(){

let spyPlayers = [];

for(let i=0;i<roles.length;i++){
if(roles[i] === "Spy"){
spyPlayers.push("Player " + (i+1));
}
}

document.getElementById("spyList").innerText =
"The spies were: " + spyPlayers.join(", ");

document.getElementById("playAgainBtn").style.display = "block";

}

function playAgain(){

document.getElementById("setup").style.display = "block";
document.getElementById("game").style.display = "none";

document.getElementById("players").value = "";
document.getElementById("spies").value = "";

document.getElementById("roleText").innerText = "";
document.getElementById("spyList").innerText = "";

document.getElementById("timer").style.display = "none";
document.getElementById("revealSpiesBtn").style.display = "none";
document.getElementById("playAgainBtn").style.display = "none";

document.getElementById("revealBtn").style.display = "block";
document.getElementById("nextBtn").style.display = "block";

clearInterval(timer);

}
