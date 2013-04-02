// Define o elemento canvas
var canvas = document.getElementById('screen');
var context = canvas.getContext("2d");

canvas.w = canvas.width;
canvas.h = canvas.height;

//Define o tamanho do canvas
var canvasW = canvas.width;
var canvasH = canvas.height;


/**
* Define um novo Objeto de Scene para tela de intro
*/
Scene.canvas = canvas;
Scene.context = context;
var scene_intro = Object.create(Scene);
scene_intro.img_path = "img/scene_intro.JPG";

/**
* Define um novo Objeto de Scene para tela de Menu
*/
Scene.canvas = canvas;
Scene.context = context;
var scene_menu = Object.create(Scene);
scene_menu.img_path = "img/menu/background.JPG";


/**
* Define um novo Objeto de button para p botão start
*/
Button.canvas = canvas;
Button.context = context;
//var btn_start = Object.create(Button);
var btn_start = new Button();
btn_start.canvas = canvas;
btn_start.context = context;
btn_start.obj = btn_start;
btn_start.w = 236;
btn_start.h = 56;
btn_start.img_path = "img/menu/btn_play_a.png";


/**
* Define um novo Objeto do Bird
*/
var bird = new Bird();
bird.canvas = canvas;
bird.context = context;

/**
* Define um novo objeto do Texto
*/
Texto.context = context;
var score_text = Texto;

// Texto de GAME OVER
var gameOver_text = Object.create(Texto);
gameOver_text.text = "GAME OVER";
gameOver_text.color = "FF0000";
gameOver_text.size = "30px";
gameOver_text.x = 300;
gameOver_text.y = 300;



/*
* Funções que executam os metodos da scenes
*/
function show_intro_scene()
{
        scene_intro.drawScene();
        // Exibe a tela de intro por 5 segundos
        setTimeout(function(){current_scene = "menu"}, 3000);
}

function show_menu_scene()
{
        scene_menu.drawScene();
        btn_start.x = 286;
        btn_start.y = 185;
        btn_start.drawButton();
        btn_start.mouseOver();
        btn_start.mouseClick();
}

function show_gamePlay_scene()
{
        /** 
        * Executa as funções do Bird
        */
        // Exibe o obejto na tela
        bird.create();                
        // Altera a posição
        bird.move();
        // Verifica se houve um click sobre o objto
        bird.mouseClick();


        /**
        * Executa as funções do Texto
        */
        // Define o texto
        score_text.text = "Points: " + score + " | level: " + level + " | Try: " + clickTry;                
        // Define a posição
        score_text.x = 250;
        score_text.y = 20;
        // Exibe o texto na tela.
        score_text.drawText();
}

function show_gameOver_scene()
{
        gameOver_text.drawText();
        score = 0;
        level = 0;
        clickTry = 10;
        bird.xSpd = 5;
        bird.ySpd = 5;
        setTimeout(function(){current_scene = "menu"}, 3000);
}


function drawElements()
{
        //limpa o retangulo anterior do canvas
        context.clearRect(0,0, canvasW, canvasH);

        /*
        * Verifica qual Scene irá abrir 
        */
        console.log(current_scene);
        switch( current_scene )
        {
            case "intro":
                    show_intro_scene();
                    break;
            case "menu":
                    show_menu_scene();
                    break;        
            case "gamePlay":
                    show_gamePlay_scene();
                    break;
            case "gameOver":
                    show_gameOver_scene();
                    break;
        }
}




var interval = window.setInterval('gameLoop()', 1000 / fps); 
function gameLoop()
{  
    countTime();
    drawElements();
}