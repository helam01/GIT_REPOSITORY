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
		gridBlockPositions: [Array()], // armazena as posições ocupadas no grid
		blockW: 40,
		blockH: 40,
		blockX: 0,
		blockY: 0,
		blockColor: "rgb(250,250,250)",

		/*
		* Define um array multidimensional para armazenar os valores
		* das posições X e Y dos quadrados que formam o grid
		*/
		defPositions: function(){
			/*
			* Divide a largura e altura da area do grid pela largura e altura do
			* quadrado para determinal o total de quadrado que terá no grid
			*/
			var totalW = this.w / (this.blockW);
			totalW = Math.round(totalW);
			var totalH = this.h / (this.blockH);
			totalH = Math.round(totalH);

			/*
			* Loop que percorre de zero ao total de largura e outro para altura
			* em cada iteração adiciona uma posição no array
			*/
			for (i=0; i < totalW; i++){
				this.gridPositions[0][i] = (this.blockW+1)*i ; 
			}
			for (i=0; i < totalH-1; i++){
				this.gridPositions[1][i] = (this.blockH+1)*i; 
			}
		},

		
		/*
		* Percorre o array de posições e desenha os quadrados
		*/
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
* quadrado que é controlado pelo usuário
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
		moveX: true, // flag para saber se o quadrado pode ser movido no eixo X
		moveY: true, // flag para saber se o quadrado pode ser movido no eixo Y

		/*
		* Desenha o quadrado player na tela
		*/
		create: function(){
			context.fillStyle = this.color;
			context.fillRect(this.x, this.y, this.w, this.h);
		},

		/*
		* Move o quadrado na posição X e Y passadas por parametro
		*/
		fMove: function(posX, posY){
			// Verifica se é possivel mover no eixo X e Y
			if(this.moveX && this.moveY){
				//Passa alguns atributos da classe para variaveis locais para melhor manipulação
				var curGridX = this.curGridX;
				var player = this;
				var lastCurGridX =  player.curGridX;
				var lastCurGridY =  player.curGridY;

				/*
				* Recebe o evento de tecla pressionada
				*/
				window.onkeydown = function(key){
					/*
					* Verifica a tecla pressionada
					* então move o player uma posição para direção escolhida
					*/	
					if( key.keyCode == 37 ){ // Left
						console.log("Left");
						// Se for para esquerda,
						// verifica se a posição X atual esta no limite esquerdo do grid
						if( player.curGridX > 0 ){
							// Atribui a posição atual a ultima posição
							lastCurGridX = player.curGridX;
							// Altera a posição atual
							player.curGridX -= 1;	
						}
					}

					if( key.keyCode == 38 ){ // Up
						console.log("Up");
						if( player.curGridY > 0 ){
							// Se for para cima,
							// verifica se a posição Y atual esta no limite superior do grid
							lastCurGridY = player.curGridY;
							player.curGridY -= 1;	
						}
					}

					if( key.keyCode == 39 ){ // Right
						console.log("Right");
						if( player.curGridX < player.grid.gridPositions[0].length-2 ){
							lastCurGridX = player.curGridX;
							player.curGridX += 1;
						}
					}

					if( key.keyCode == 40 ){ // Down
						console.log("down");
						if( player.curGridY < player.grid.gridPositions[1].length-1 ) {
							lastCurGridY = player.curGridY;
							player.curGridY += 1;
						}
					}

					
					for(var i=0; i < player.grid.gridBlockPositions.length; i++){
						if( (player.curGridX == player.grid.gridBlockPositions[i][0])
							&&  player.curGridY == player.grid.gridBlockPositions[i][1] ){

							player.moveX  = false;
							player.moveY = false;
							player.curGridX = lastCurGridX;
							player.curGridY = lastCurGridY;
							break;
						}
						else {
							player.moveX  = true;
							player.moveY = true;
						}
					}

					player.x = player.grid.gridPositions[0][player.curGridX];
					player.y = player.grid.gridPositions[1][player.curGridY];
					
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
			if(this.grid.gridBlockPositions.length == 0){
				if (this.grid.gridBlockPositions[0][0] != x)
						blockX = true;
			}
			else{ 	
				for(var i=0; i< this.grid.gridBlockPositions.length; i++){
					if (this.grid.gridBlockPositions[i][0] != x)
						blockX = true;
				}
			}

			// Verifica Y
			if(this.grid.gridBlockPositions.length == 0){
				if (this.grid.gridBlockPositions[0][1] != y)
						blockY = true;
			}
			else{
				for(var i=0; i< this.grid.gridBlockPositions.length; i++){
					if (this.grid.gridBlockPositions[i][1] == y){
						blockY = false;
						break;
					}
					else if (this.grid.gridBlockPositions[i][1] != y)
						blockY = true;
				}
			}
			//console.log(this.grid.gridBlockPositions);
			if (blockX && blockY){
				this.grid.gridBlockPositions.push(Array(x,y));
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

var wall = Array();
for (var i = 0; i < 10; i++) {
	wall.push( new Wall(canvas, context, grid) );
};

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
	
	for (var i = 0; i < 5; i++) {
		wall[i].create(6, i+2);
	}
	for (var i = 5; i < 10; i++) {
		wall[i].create(10, i+2);
	}

	player.create();
	player.fMove();
}

var interval = setInterval('gameLoop()', 1000 / fps);
function gameLoop()
{
	countFrames();
	drawElements();
}
