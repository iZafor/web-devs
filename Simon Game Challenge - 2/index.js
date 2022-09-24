const buttons = $(".btn");

const randomIdx = () => Math.floor(Math.random() * 4);

let robotSequence = [];

let playerSequence = [];

let level = 0;

$(document).keypress(
    () => {
        /*
        If it is the first level, then we
        don't have to reset all values.
        */
        if(playerSequence.length > 0){
            resetAllValues();
        }
        
        /*
        To prevent auto level upgrade
        by pressing keys.
        */
        if(!robotSequence.length){
            setTimeout(() => {
                robot();
            }, 500);
        }
    }
);

const robot = () => {
    level++;
    playerSequence = [];
    $("#level-title").text(`Level ${level}`);
    const randomButton = $(buttons[randomIdx()]);
    playSound(randomButton.attr("id"));
    randomButton.fadeIn(100).fadeOut(100).fadeIn(100);
    robotSequence.push(randomButton.attr("id"));
};

let checkSequence = (idx) => {
    if (robotSequence[idx] !== playerSequence[idx]) {
        gameOver();
    }
    
    if (robotSequence.length === playerSequence.length && playerSequence.length > 0) {
        setTimeout(() => {
            robot();
        }, 1000);
    }
}

const resetAllValues = () => {
    level = 0;
    robotSequence = [];
    playerSequence = [];
}

const gameOver = () => {
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press A Key to Restart");
    playSound("wrong");
    setTimeout(() => {
        $("body").removeClass("game-over");
    }, 500);
    resetAllValues();
}

$(".btn").click(
    function () {
        const usrChosenButton = $(this).attr("id");
        animate(usrChosenButton);
        playSound(usrChosenButton);
        playerSequence.push(usrChosenButton);
        checkSequence(playerSequence.length - 1);
    }
);

const playSound = (name) => {
    new Audio(`sounds/${name}.mp3`).play();
};

const animate = (color) => {
    $(`#${color}`).addClass("pressed");
    setTimeout(
        () => {
            $(`#${color}`).removeClass("pressed");
        }, 100
    );
}