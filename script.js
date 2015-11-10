$(document).ready(function() {
	var c = $("#c")[0];
	var ctx = c.getContext("2d");

	ctx.fillStyle = 'blue';

	function Rectangle(x, y, width, height) {
		this.STEP = 10;
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;

		this.draw = function() {
			ctx.fillRect(this.x, this.y, this.width, this.height);
		}

		this.clear = function() {
			this.width = 0;
			this.height = 0;
		}

		this.moveByDirection = function(direction, isHead){
			var tempRect = new Rectangle(this.x, this.y, this.width, this.height);

			if(direction === 'right') 
				snakePart.x += this.STEP;
			else if(direction === 'left') 
				snakePart.x -= this.STEP;
			else if(direction === 'up')
				snakePart.y -= this.STEP;
			else if(direction === 'down')
				snakePart.y += this.STEP;

			if(this.collide(prey))
				generatePreyPosition();
		}

		this.collide = function(other) {
			if(this.x == other.x && this.y == other.y)
				return true;
			return false;
		}

	} 

	var snakePart;
	var prey;

	var lastInput;
	var start = 0;
	var requestId;
	var direction;

	$('#start').click(function(){

		snakePart = new Rectangle(0, 0, 10, 10);
		prey = new Rectangle(0, 0, 10, 10);
		generatePreyPosition();

		lastInput = null;
		direction = "right";

		requestId = requestAnimationFrame(draw);
	});

	function draw() {
		processInput();
		moveSnake();
		drawAll();
		requestId = requestAnimationFrame(draw);

		if(lastInput === 'q') {
			cancelAnimationFrame(requestId);
		}
	}

	function processInput() {
		var k = new Kibo();

		k.down(['any arrow', 'any letter'], function() {
			lastInput = k.lastKey();
		});
		if ((lastInput === "up" && direction !== "down") || 
			(lastInput === "down" && direction !== "up") || 
			(lastInput === "left" && direction !== "right") || 
			(lastInput === "right" && direction !== "left"))
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
		if(current - start < 80) {
			return;
		}
		snakePart.moveByDirection(direction, true);
		start = current;
		lastInput = null;
	}

	function drawAll() {
		ctx.clearRect(0, 0, c.width, c.height);
		snakePart.draw();
		prey.draw();
	}

	function generatePreyPosition(){
		var x, y;
		do {
			x = Math.floor(Math.random() * (c.width / 10)) * 10;
			y = Math.floor(Math.random() * (c.height / 10)) * 10;
		} while (x == snakePart.x && y == snakePart.y);
		prey.x = x;
		prey.y = y;
	}

});
