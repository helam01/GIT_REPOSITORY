var canvas = document.getElementById('canvas');
var context = canvas.getContext("2d");
canvas.w = 800;
canvas.h = 600;
var fps = 20;
var frames = 0;
var time = 0;


var Grid = function(Canvas, Context){
	return {
		canvas: Canvas,
		context: Context,
		w: 800,
		h: 600,
		x: 0,
		y: 0,
		gridPositions: [[],[]],
		blockW: 20,
		blockH: 20,
		blockX: 0,
		blockY: 0,
		blockColor: "rgb(255,0,0)",

		defPositions: function(){
			var totalW = this.w / (this.blockW);
			totalW = Math.round(totalW);
			var totalH = this.h / (this.blockH);
			totalH = Math.round(totalH);

			for (i=0; i < totalW-1; i++){
				this.gridPositions[0][i] = this.blockW*i; 
			}
			for (i=0; i < totalH-2; i++){
				this.gridPositions[1][i] = this.blockH*i; 
			}
		},

		drawBlock: function(){
			this.defPositions();
			this.context.fillStyle = this.blockColor;
			for (var i = 0; i < this.gridPositions[0].length-1; i++) {
				for (var j = 0; j < this.gridPositions[0].length-1; j++) {
					this.context.fillRect(
						this.gridPositions[0][i]+i,
						this.gridPositions[1][j]+j,
						this.blockW,
						this.blockH
					);
				}
			}

			
		},

		drawGrid: function(){

		}
	};
}

var grid = new Grid(canvas, context);


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
	grid.drawBlock();
}

var interval = setInterval('gameLoop()', 1000 / fps);
function gameLoop()
{
	countFrames();
	drawElements();
}
