
// main.js
import Ball from "./ball.js";
import Paddle from "./Paddle.js";

const playerPaddle = new Paddle(document.getElementById("player-paddle"));
const computerPaddle = new Paddle(document.getElementById("computer-paddle"));
const ball = new Ball(document.getElementById("ball"));
const playerScoreElem = document.getElementById("player-score");
const computerScoreElem = document.getElementById("computer-score");


const keysPressed = {}; 

document.addEventListener("keydown", e => {
	keysPressed[e.key] = true; // Set the pressed key to true in keysPressed object
});

document.addEventListener("keyup", e => {
	delete keysPressed[e.key]; // Remove the released key from keysPressed object
});

function updatePlayerPaddlePosition() {
	const movementStep = 2; // Adjust this value as needed for smoother movement

	if (keysPressed["ArrowUp"]) {
		const currentPosition = playerPaddle.position;
		const newPosition = currentPosition - movementStep;

		if (newPosition >= 0) {
			playerPaddle.position = newPosition;
		}
	}

	if (keysPressed["ArrowDown"]) {
		const currentPosition = playerPaddle.position;
		const newPosition = currentPosition + movementStep;

		if (newPosition <= 100) {
			playerPaddle.position = newPosition;
		}
	}
}


function isLose() {
	const rect = ball.rect();
	return rect.right >= window.innerWidth || rect.left <= 0;
}

let lastTime;
function update(time) {
	if (lastTime != null){

		const delta = time - lastTime;
		ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()]);
		updatePlayerPaddlePosition();
		computerPaddle.update(delta, ball.y);
		const hue = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--hue"));
		document.documentElement.style.setProperty("--hue", hue + delta * 0.01)
		if (isLose()){
			console.log('lose')
			handleLose();
		}
	}
	lastTime = time;
	window.requestAnimationFrame(update);
}

function handleLose(){
	const rect = ball.rect()
	if (rect.right >= window.innerWidth){
		playerScoreElem.textContent = parseInt(playerScoreElem.textContent) + 1
	}
	else{
		computerScoreElem.textContent = parseInt(computerScoreElem.textContent) + 1
	}
	ball.reset()
	computerPaddle.reset()
}

// lastTime = performance.now();
window.requestAnimationFrame(update);
