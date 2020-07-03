const canvas = document.querySelector(".myCanvas");
const width = canvas.width = 1250;
const height = canvas.height = 300;
const ctx = canvas.getContext("2d");

xStartPos = -38;
yStartPos = 30;
whiteSpacing = 51;
whiteKeyCount = 24;

const whiteKeys = [];
const blackKeys = [];

const whiteKeySounds = [];
const blackKeySounds = [];

//Load white keys audio
const whiteLetters = ['C', 'D', 'E', 'F', 'G', 'A', 'B']
for (i = 2; i <= 6; i++) {
  for (j = i === 2 ? 5 : 0; j < whiteLetters.length; j++) {
    if (i == 6 && j > 0) {
      break;
    }
    let fileName = "Piano.ff." + whiteLetters[j] + i + ".mp3";
    let audio = new Audio("piano-sounds/" + fileName);
    whiteKeySounds.push(audio);
  }
}
console.log(whiteKeySounds)

function between(n, lower, upper) {
  return n >= lower && n <= upper;
}

//Load black keys audio
const blackLetters = ['D', 'E', 'G', 'A', 'B']
for (i = 2; i <= 5; i++) {
  for (j = i === 2 ? 4 : 0; j < blackLetters.length; j++) {
    let fileName = "Piano.ff." + blackLetters[j] + "b" + i + ".mp3";
    let audio = new Audio("piano-sounds/" + fileName);
    blackKeySounds.push(audio);
  }
}
console.log(blackKeySounds)

//Draw white keys
let whiteAudioIndex = 0;
for (i = xStartPos; i < xStartPos + whiteSpacing * whiteKeyCount; i += whiteSpacing) {
  white = new WhiteKey(i + 50, yStartPos, whiteKeySounds[whiteAudioIndex]);
  whiteKeys.push(white)
  white.draw("rgb(255, 255, 255)");
  whiteAudioIndex++;
}

//Draw black keys
let index = 0; //goes up to 22
let blackAudioIndex = 0;
for (i = xStartPos + 52; i < xStartPos + whiteSpacing * whiteKeyCount - 35; i += 51.1) {
  index++;
  //1, 4, 8, 11, 15, 18, 22
  if (index % 7 != 2 && index % 7 != 5) {
    black = new BlackKey(i + 30, yStartPos, blackKeySounds[blackAudioIndex]);
    blackKeys.push(black);
    black.draw("rgb(0, 0, 0)");
    blackAudioIndex++;
  }
}

document.addEventListener('mousedown', playSound)

const leftMargin = canvas.getBoundingClientRect().left
const topMargin = canvas.getBoundingClientRect().top
function playKey(keys, e) {
  for (i = 0; i < keys.length; i++) {
    key = keys[i];
    if (between(e.clientX, key.x + leftMargin, key.x + leftMargin + key.width) && between(e.clientY, key.y + topMargin, key.y + topMargin + key.height)) {
      console.log("play");
      key.play();
      return true;
    }
  }
  return false;
}

function stopKey(keys, e) {
  for (i = 0; i < keys.length; i++) {
    key = keys[i];
    if (between(e.clientX, key.x, key.x + key.width) && between(e.clientY, key.y, key.y + key.height)) {
      key.stop();
    }
  }
}

function playSound(e) {
  console.log("pressed");
  if (!playKey(blackKeys, e)) {
    playKey(whiteKeys, e);
  }
}

function stopSound(e) {
  stopKey(blackKeys, e);
  stopKey(whiteKeys, e);
}
