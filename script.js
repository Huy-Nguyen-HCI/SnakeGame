$(document).ready(function() {
	var c = $("#c")[0];
	var ctx = c.getContext("2d");

	ctx.fillStyle = 'blue';

	function Rectangle(x, y, width, height) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;

		this.draw = function() {
			ctx.fillRect(this.x, this.y, this.width, this.height);
		}

		this.clear = function() {
			ctx.clearRect(this.x, this.y, this.width, this.height);
		}
	} 

	var snakePart = new Rectangle(0, 0, 50, 50);

	var lastInput;
	var start = 0;
	var requestId;

	function draw() {
		processInput();
		moveSnake();
		drawAll();
		requestId = requestAnimationFrame(draw);

		if(lastInput == 'q') {
			cancelAnimationFrame(requestId);
		}
	}

	function processInput() {
		var k = new Kibo();

		k.down(['any arrow', 'any letter'], function() {
			var current = new Date().getTime();

			// Only process input after a given elapsed time.
			if(current - start > 50) {
				lastInput = k.lastKey();
				start = current;
			}
		});
	}

	function moveSnake() {
		// If press q, stop the game
		if(lastInput === "q")
			return;

		if(lastInput === "down")
			snakePart.y += 10;
		else if(lastInput === "up")
			snakePart.y -= 10;
		else if(lastInput === "left")
			snakePart.x -= 10;
		else if(lastInput === "right")
			snakePart.x += 10;

		lastInput = null;
	}

	function drawAll() {
		ctx.clearRect(0, 0, c.width, c.height);
		snakePart.draw();
	}

	draw();
});
