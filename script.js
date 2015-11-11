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

		this.draw = function(){
			ctx.fillRect(this.x, this.y, this.width, this.height);
		}

		this.clear = function() {
			this.width = 0;
			this.height = 0;
		}

		this.collide = function(other) {
			if(this.x == other.x && this.y == other.y)
				return true;
			return false;
		}

	} 


	function Snake(x, y, width, height){
		Rectangle.call(this, x, y, width, height);

		this.moveByDirection = function(direction, isHead){
			var tempRect = new Rectangle(this.x, this.y, this.width, this.height);

			if(direction === 'right') 
				this.x += this.STEP;
			else if(direction === 'left') 
				this.x -= this.STEP;
			else if(direction === 'up')
				this.y -= this.STEP;
			else if(direction === 'down')
				this.y += this.STEP;

			if(this.collide(prey))
				generatePreyPosition();
		}
	}

	Snake.prototype = new Rectangle();
	Snake.prototype.constructor = Snake;

	var snakePart = [];

	var prey;

	var lastInput;
	var start = 0;
	var requestId;
	var direction;

	$('#start').click(function(){

		snakePart.push(new Snake(0, 0, 10, 10));
		prey = new Rectangle(0, 0, 10, 10);
		generatePreyPosition();

		lastInput = null;
		direction = "right";

		requestId = requestAnimationFrame(draw);
	});

	var fps = 15;

	function draw() {
		setTimeout(function() {
			processInput();
			moveSnake();
			drawAll();
			requestId = requestAnimationFrame(draw);
		}, 1000/fps);
		
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


		// Time elapsed before move (to avoid spamming button)
		if(current - start < 10) {
			return;
		}
		snakePart[0].moveByDirection(direction, true);
		start = current;
		lastInput = null;
	}

	function drawAll() {
		ctx.clearRect(0, 0, c.width, c.height);
		snakePart[0].draw();
		prey.draw();
	}

	function generatePreyPosition(){
		var x, y;
		do {
			x = Math.floor(Math.random() * (c.width / 10)) * 10;
			y = Math.floor(Math.random() * (c.height / 10)) * 10;
		} while (x == snakePart[0].x && y == snakePart[0].y);
		prey.x = x;
		prey.y = y;
	}

});
