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
			this.defPositions();
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
	};
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
		move: true,

		create: function(){
			context.fillStyle = this.color;
			context.fillRect(this.x, this.y, this.w, this.h);
		},

		fMove: function(posX, posY){
			if(this.move){
				var curGridX = this.curGridX;
				var player = this;
				window.onkeydown = function(key){	
					if( key.keyCode == 37 ){ // Left
						console.log("Left");
						if( player.curGridX > 0 )
							player.curGridX -= 1;
					}
					if( key.keyCode == 38 ){ // Up
						console.log("Up");
						if( player.curGridY > 0 )
							player.curGridY -= 1;
					}
					if( key.keyCode == 39 ){ // Right
						console.log("Right");
						if( player.curGridX < player.grid.gridPositions[0].length-2 )
							player.curGridX += 1;
					}
					if( key.keyCode == 40 ){ // Down
						console.log("down");
						if( player.curGridY < player.grid.gridPositions[1].length-1 )
							player.curGridY += 1;
					}
								
					player.x = player.grid.gridPositions[0][player.curGridX];
					player.y = player.grid.gridPositions[1][player.curGridY];				
				}									

				
			}
		}
	};
}
/** ######################################################################################### */


var grid = new Grid(canvas, context);
var player = new Player(canvas, context, grid);

function countFrames()
{
	frames ++;
	
	if (frames % fps == 0)
		time ++;
	//console.log(time);
}

function drawElements()
{
	context.clearRect(0, 0, canvas.w, canvas.h);
	grid.drawGrid();
	player.create();
	player.fMove(10,10);
}

var interval = setInterval('gameLoop()', 1000 / fps);
function gameLoop()
{
	countFrames();
	drawElements();
}
