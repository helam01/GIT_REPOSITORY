/**
* Funções de Regras.
* 
*/

/*
* Contabiliza o tempo em segundos
*/
function countTime()
{
        if (timer == fps){
            timer = 0;
            sec ++;
        }
        else {
            timer ++;                                
        }
}

/**
* Verifica a variavel score para definir o level
* e aumentar a velocidado do player.
*/
function checkLevel(obj)
{                
if (score % 5 == 0) {
    level += 1;
    // Aumenta a velocidade do bird
    if (obj.xSpd > 0)
        obj.xSpd += 5;
    else
        obj.xSpd -= 5;

    if (obj.ySpd > 0)
        obj.ySpd += 5;
    else
        obj.ySpd -= 5;

    console.log("xS: " + obj.ySpd + " - yS: " + obj.ySpd);
}
}

/**
* contabiliza os pontos incrementanto a variavel score
*/
function countScore()
{
score += 1;
}