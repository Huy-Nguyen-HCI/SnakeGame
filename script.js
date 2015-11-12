$(document).ready(function() {
	var c = $("#c")[0];
	var ctx = c.getContext("2d");

	ctx.fillStyle = '#7FFF00';

	function Rectangle(x, y, width, height) {
		this.STEP = 10;
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;

		this.draw = function(){
			ctx.fillRect(this.x, this.y, this.width, this.height);
			ctx.strokeRect(this.x, this.y, this.width, this.height);
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

		this.moveByDirection = function(direction){
			var tempRect = new Rectangle(this.x, this.y, this.width, this.height);

			if(direction === 'right') 
				this.x += this.STEP;
			else if(direction === 'left') 
				this.x -= this.STEP;
			else if(direction === 'up')
				this.y -= this.STEP;
			else if(direction === 'down')
				this.y += this.STEP;

		}

		this.moveTo = function(newX, newY) {
			this.x = newX;
			this.y = newY;
		}
	}

	Snake.prototype = Rectangle.prototype;
	Snake.prototype = new Rectangle();
	Snake.prototype.constructor = Snake;

	var snakePart;
	var prey;

	var lastInput;
	var direction;

	var start = 0;
	var requestId;
	var timeoutHandler;
	var isStop = true;

	$('#start').click(function(){
		if(isStop) {
			clearTimeout(timeoutHandler);

			snakePart = [];
			for (var i = 4; i >= 1; i--)
				snakePart.push(new Snake(10*i, 10, 10, 10));

			prey = new Rectangle(0, 0, 10, 10);
			generatePreyPosition();

			lastInput = null;
			direction = "right";
			isStop = false;

			requestId = requestAnimationFrame(draw);
		}
	});

	var fps = 15;

	function draw() {
		timeoutHandler = setTimeout(function() {
			processInput();
			moveSnake();
			drawAll();
			requestId = requestAnimationFrame(draw);
		}, 1000/fps);
		
		if(lastInput === 'q') {
			isStop = true;
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

	var generateTail = false;

	function moveSnake() {
		// If press q, stop the game
		if(lastInput === "q")
			return;

		var current = new Date().getTime();


		// Time elapsed before move (to avoid spamming button)
		if(current - start < 10) {
			return;
		}

		var prevTailPosition_x = snakePart[snakePart.length-1].x;
		var prevTailPosition_y = snakePart[snakePart.length-1].y;

		for (var i = snakePart.length - 1 ; i >= 1; i--) {
			snakePart[i].moveTo(snakePart[i-1].x, snakePart[i-1].y);
		}

		if (generateTail){
			generateTail = false;
			snakePart.push(new Snake(prevTailPosition_x, prevTailPosition_y, 10, 10));
		}

		snakePart[0].moveByDirection(direction);

		if(snakePart[0].collide(prey)){
			generatePreyPosition();
			generateTail = true;
		}
		start = current;
		lastInput = null;
	}

	function drawAll() {
		ctx.clearRect(0, 0, c.width, c.height);
		for (var i = 0 ; i < snakePart.length; i++)
			snakePart[i].draw();
		prey.draw();
	}

	function generatePreyPosition(){
		var x, y;
		do {
			x = Math.floor(Math.random() * (c.width / 10)) * 10;
			y = Math.floor(Math.random() * (c.height / 10)) * 10;
		} while (invalidRespawnPosition(x,y));
		prey.x = x;
		prey.y = y;
	}

	function invalidRespawnPosition(x, y){
		for (i = 0 ; i < snakePart.length; i++){
			if (x == snakePart[i].x && y == snakePart[i].y) 
				return true;
		}
		return false;
	}

});
