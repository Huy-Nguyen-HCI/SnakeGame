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

		this.moveByDirection = function(direction){
			if(direction === 'right')
				snakePart.x += 5;
			else if(direction === 'left')
				snakePart.x -= 5;
			else if(direction === 'up')
				snakePart.y -= 5;
			else if(direction === 'down')
				snakePart.y += 5;
		}
	} 

	var snakePart;

	var lastInput;
	var start = 0;
	var requestId;
	var direction;

	$('#start').click(function(){
		snakePart = new Rectangle(0, 0, 10, 10)
		lastInput = null;
		direction = "right";

		requestId = requestAnimationFrame(draw);
	});

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
			lastInput = k.lastKey();
		});
		if ((lastInput == "up" && direction != "down") || 
			(lastInput == "down" && direction != "up") || 
			(lastInput == "left" && direction != "right") || 
			(lastInput == "right" && direction != "left"))
		{
			direction = lastInput;
		}

	}

	function moveSnake() {
		// If press q, stop the game
		if(lastInput === "q")
			return;

		var current = new Date().getTime();

		
		// Time elapsed
		if(current - start < 50) {
			return;
		}
		snakePart.moveByDirection(direction);
		start = current;
		lastInput = null;
	}

	function drawAll() {
		ctx.clearRect(0, 0, c.width, c.height);
		snakePart.draw();
	}

});
