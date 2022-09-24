const drums = $(".drum");
const sounds = ["tom-1", "tom-2", "tom-3", "tom-4", "snare", "crash", "kick-bass"];

// sound map
let soundsMap = {};

for (let i = 0; i < drums.length; i++) {
    soundsMap[$(drums[i]).attr("class").split(" ")[0]] = sounds[i];
}

// click events
$(".drum").click(
    function () {
        const currentKit = $(this).attr("class").split(" ")[0];
        playSound(soundsMap[currentKit]);
        buttonAnimation(currentKit);
    }
);

// keypress events
$(document).keypress(
    function (event) {
        if (soundsMap[event.key]) {
            playSound(soundsMap[event.key]);
            buttonAnimation(event.key);
        }
    }
);

// playing sounds
const playSound = (name) => {
    new Audio(`sounds/${name}.mp3`).play();
}

// button animation
const buttonAnimation = (buttonKey) => {
    const buttonObject = $(`.${buttonKey}`);
    $(buttonObject).addClass("pressed");
    setTimeout(
        () => $(buttonObject).removeClass("pressed"),
        100
    );
};
