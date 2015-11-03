$(document).ready(function() {
	var c = $("#c")[0];
	var ctx = c.getContext("2d");
	ctx.fillStyle = "blue";

	function Rectangle(x, y, width, height) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	
	this.draw = function() {
		ctx.fillRect(this.x, this.y, this.width, this.height);
}
} 

	var snakePart = new Rectangle(0, 0, 50, 50);
	snakePart.draw();
});


