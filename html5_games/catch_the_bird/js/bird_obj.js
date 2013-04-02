/**
* Objeto Principal
* 
*/
function Bird()
{
    return {
        canvas  : null,
        context : null,
        name    : 'Bird',
        img     : new Image(),
        x       : 100,
        y       : 100,
        w       : 80,
        h       : 80,
        xSpd    : 5,
        ySpd    : 5,
        collid  : false,
        canMove : true,
        sprite_frame: 0,            // Usado para calcular a velocidade de atualização das imagens
        sprite_current_frame: 0,    // Armazena a posição da imagem atual do stripe
        sprite_total_frames: 6,     // Armazena o toral de imagens do sprite

        create  : function(){
           this.img.src ="img/sprites/sprite_ball.png";
           //this.context.drawImage(this.img, this.x, this.y)
           this.context.drawImage(
                this.img,
                1,                          // sprite X: posição X do sprite que será exibida
                (this.h+2) * this.sprite_current_frame, // sprite Y: posição Y do sprite que será exibida
                this.w,                     // Escala X do sprite quando exibido (deixar igual a largura)
                this.h,                     // Escala Y do sprite quando exibido (deixar igual a altura)
                this.x,                     // Posição X do sprite no canvas
                this.y,                     // Posição Y do sprite no canvas
                this.w,                     // Area X do sprite que será exibida
                this.h                      // Area Y do sprite que será exibida
            );

           if ( this.sprite_frame == 2 ) {
                this.sprite_frame = 0;
                if( this.sprite_current_frame == this.sprite_total_frames ) {
                    this.sprite_current_frame = 0;
                } else {
                    this.sprite_current_frame ++;
                }
           } else {
                this.sprite_frame ++;
           }
        },
        
        move   : function(){
            if (this.canMove) {
                this.x += this.xSpd;
                this.y += this.ySpd;

                this.bounce(this.canvas);
            }
        },
        bounce : function(element){
            /**
            * O bounce faz com que quando o objeto 'toque' nos limites da tela
            * inverta o angulo do movimento.
            */

            // Se atingir s extremidades horizontal inverter o valor de X
            if( (this.x >= element.w - this.w) || (this.x <= 0) ) {
                this.xSpd *= -1;
            }                    
            // Se atingor as extremidades vertical inverter o valor de Y
            if( (this.y >= element.h - this.h) || (this.y <= 0) ) {
                this.ySpd *= -1;
            }
        },

        mouseClick: function(){
            //this.canvas.onmousedown = this.mouseClickedAction;
            obj = this;
            this.canvas.onmousedown = function(e){
                if( (e.clientX >= obj.x && e.clientX <= obj.x+obj.w ) && (e.clientY >= obj.y && e.clientY <=obj.y+obj.h)) {
                    countScore();
                    checkLevel(obj);
                    
                    //Altera a posição X e Y para um valor random
                    obj.x = Math.floor((Math.random()*(obj.canvas.width-obj.w))+1);
                    obj.y = Math.floor((Math.random()*(obj.canvas.height-obj.h))+1);

                    if (obj.xSpd > 0)
                        obj.xSpd += 0.3;
                    else
                        obj.xSpd -= 0.3;

                    if (obj.ySpd > 0)
                        obj.ySpd += 0.3;
                    else
                        obj.ySpd -= 0.3;
                }
                else {
                    if (clickTry <= 0) {
                        current_scene = "gameOver";
                    }
                    clickTry -= 1;
                }    
            };
        }

    }
};