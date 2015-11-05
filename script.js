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
	snakePart.draw();

	function draw() {
		requestAnimationFrame(draw);
		processInput();
		drawAll();
	}

	function processInput() {
		var k = new Kibo();

		k.down(['any arrow'], function() {
			if(k.lastKey() === 'down') {
				snakePart.y += 10;
			}
			else if(k.lastKey() === 'up') {
				snakePart.y -= 10;
			}
			else if(k.lastKey() === 'left') {
				snakePart.x -= 10;
			}
			else {
				snakePart.x += 10;
			}
		});
	}

	function drawAll() {
		ctx.clearRect(0, 0, c.width, c.height);
		snakePart.draw();
	}

	draw();
});
