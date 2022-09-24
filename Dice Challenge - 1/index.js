let player1 = 6;
let player2 = 6;
if(window.performance.getEntriesByType("navigation")[0].type === "reload"){
    player1 = Math.floor(Math.random() * 6) + 1;
    player2 = Math.floor(Math.random() * 6) + 1;
}

let img1Object = document.querySelector(".img1");
let img2Object = document.querySelector(".img2");

let img1 = "images/dice" + String(player1) + ".png";
let img2 = "images/dice" + String(player2) + ".png";

img1Object.setAttribute("src", img1);
img2Object.setAttribute("src", img2);

let title = document.querySelector("h1");
let titleText;

if(player1 === player2) {
    titleText = "Refresh Me";
}else if(player1 > player2) {
    titleText = "👏Player 1 Wins!";
}else{
    titleText = "👏Player 2 Wins!";
}

title.textContent = titleText;