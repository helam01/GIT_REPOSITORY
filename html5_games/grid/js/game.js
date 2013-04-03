var canvas = document.getElementById('canvas');
var context = canvas.getContext("2d");
canvas.w = 800;
canvas.h = 600;
var fps = 20;
var frames = 0;
var time = 0;





/**
* GRID Class
*/
var Grid = function(Canvas, Context){
	return {
		canvas: Canvas,
		context: Context,
		w: 800,
		h: 600,
		x: 0,
		y: 0,
		gridPositions: [[],[]],
		gridBlockPositions: [[],[]],
		blockW: 40,
		blockH: 40,
		blockX: 0,
		blockY: 0,
		blockColor: "rgb(250,250,250)",

		defPositions: function(){
			var totalW = this.w / (this.blockW);
			totalW = Math.round(totalW);
			var totalH = this.h / (this.blockH);
			totalH = Math.round(totalH);

			for (i=0; i < totalW; i++){
				this.gridPositions[0][i] = (this.blockW+1)*i ; 
			}
			for (i=0; i < totalH-1; i++){
				this.gridPositions[1][i] = (this.blockH+1)*i; 
			}
		},

		drawGrid: function(){
			this.context.fillStyle = this.blockColor;
			for (var i = 0; i < this.gridPositions[0].length-1; i++) {
				for (var j = 0; j < this.gridPositions[0].length-1; j++) {
					this.context.fillRect(
						this.gridPositions[0][i],
						this.gridPositions[1][j],
						this.blockW,
						this.blockH
					);
				}
			}			
		}

	}; // return
}
/** ####################################################################################### */



/**
* Player Class
*/
var Player = function(Canvas, Context, Grid)
{
	return {
		canvas: Canvas,
		context: Context,
		grid: Grid,
		w: Grid.blockW,
		h: Grid.blockH,
		x: 0,
		y: 0,
		curGridX: 0,
		curGridY: 0,
		color: "rgb(255,0,0)",
		moveX: true,
		moveY: true,

		create: function(){
			context.fillStyle = this.color;
			context.fillRect(this.x, this.y, this.w, this.h);
		},

		fMove: function(posX, posY){
			if(this.moveX && this.moveY){
				var curGridX = this.curGridX;
				var player = this;
				window.onkeydown = function(key){	
					console.log(player.grid.gridBlockPositions);
					if( key.keyCode == 37 ){ // Left
						console.log("Left");
						if( player.curGridX > 0 ){
							player.curGridX -= 1;
							/*
							for(var i=0; i < player.grid.gridBlockPositions[0].length; i++){
								if( (player.curGridX-1) == player.grid.gridBlockPositions[0][i]){
									//player.moveX = false;
								} else {
									player.moveX = true;
								}
							}
							*/							
						}
					}

					if( key.keyCode == 38 ){ // Up
						console.log("Up");
						if( player.curGridY > 0 ){
							player.curGridY -= 1;
							/*
							for(var i=0; i < player.grid.gridBlockPositions[1].length; i++){
								if( (player.curGridY-1) == player.grid.gridBlockPositions[1][i]){
									//player.moveY = false;
								} else {
									player.moveY = true;
								}
							}
							*/							
						}
					}

					if( key.keyCode == 39 ){ // Right
						console.log("Right");
						if( player.curGridX < player.grid.gridPositions[0].length-2 ){
							player.curGridX += 1;
							/*
							for(var i=0; i < player.grid.gridBlockPositions[0].length; i++){
								if( (player.curGridX+1) == player.grid.gridBlockPositions[0][i]){
									//player.moveX = false;
								} else {
									player.moveY = true;
								}
							}
							*/
							
						}
					}

					if( key.keyCode == 40 ){ // Down
						console.log("down");
						if( player.curGridY < player.grid.gridPositions[1].length-1 ) {
							player.curGridY += 1;
							/*
							for(var i=0; i < player.grid.gridBlockPositions[1].length; i++){
								if( (player.curGridY+1) == player.grid.gridBlockPositions[1][i]){
									//player.moveY = false;
								} else {
									player.moveY = true;
								}
							}
							*/

						}
					}

					for(var i=0; i < player.grid.gridBlockPositions[1].length; i++){
						if( player.curGridX == player.grid.gridBlockPositions[0][i]
							&&  player.curGridY == player.grid.gridBlockPositions[1][i] ){

							player.moveX  = false;
							player.moveY = false;
							break;
						}
						else {
							player.moveX  = true;
							player.moveY = true;
						}
					}
					if( player.moveX && player.moveY) {
						player.x = player.grid.gridPositions[0][player.curGridX];
						player.y = player.grid.gridPositions[1][player.curGridY];
						console.log("X: " + player.moveX + " - " + player.x);
						console.log("Y " + player.moveY + " - " + player.y);
					} else {
						player.x = player.x;
						player.y = player.y;
					}

				}					
			}
		}

	}; // return 
}
/** ######################################################################################### */



/**
* Wall Object
*/
var Wall = function(Canvas, Context, Grid)
{
	return {
		canvas: Canvas,
		context: Context,
		grid: Grid,
		w: Grid.blockW,
		h: Grid.blockH,
		x: 0,
		y: 0,
		curGridX: 0,
		curGridY: 0,
		color: "rgb(0,255,0)",
		solid: false,

		create: function(x, y, solid){
			if (solid){
				this.solid = solid;
			}

			/**
			* Verifica se as posições X e Y estão ocupadas
			*/
			var blockX = false;
			var blockY = false;

			// Verifica X
			if(this.grid.gridBlockPositions[0].length == 0){
				this.grid.gridBlockPositions[0][0] != x;
				blockX = true;
			}
			else{ 	
				for(var i=0; i< this.grid.gridBlockPositions[0].length; i++){
					if (this.grid.gridBlockPositions[0][i] != x)
						blockX = true;
				}
			}

			// Verifica Y
			if(this.grid.gridBlockPositions[1].length == 0){
				this.grid.gridBlockPositions[1][0] != y;
				blockY = true;
			}
			else{
				for(var i=0; i< this.grid.gridBlockPositions[1].length; i++){
					if (this.grid.gridBlockPositions[1][i] != y)
						blockY = true;
				}
			}
			//console.log(this.grid.gridBlockPositions);
			if (blockX && blockY){
				this.grid.gridBlockPositions[0].push(x);
				this.grid.gridBlockPositions[1].push(y);
			}

			this.x = Grid.gridPositions[0][x];
			this.y = Grid.gridPositions[1][y];
			context.fillStyle = this.color;
			context.fillRect(this.x, this.y, this.w, this.h);
		},

		collid: function(obj){
			if(obj.x == this.x && obj.y == this.y){
				console.log("Collidion");
				obj.move = false;
			}
		}
	};
}
/** ########################################################################################## */


var grid = new Grid(canvas, context);
grid.defPositions();
var player = new Player(canvas, context, grid);
var wall = new Wall(canvas, context, grid);

function countFrames()
{
	frames ++;
	
	if (frames % fps == 0)
		time ++;
}

function drawElements()
{
	context.clearRect(0, 0, canvas.w, canvas.h);
	grid.drawGrid();
	
	wall.create(5,1);
	wall.collid(player);

	player.create();
	player.fMove();
}

var interval = setInterval('gameLoop()', 1000 / fps);
function gameLoop()
{
	countFrames();
	drawElements();
}
