/**
* Objeto Principal
* 
*/
var Bird = {
        canvas  : null,
        context : null,
        name    : 'Bird',
        img     : new Image(),
        x       : 100,
        y       : 100,
        w       : 98,
        h       : 96,
        xSpd    : 5,
        ySpd    : 5,
        collid  : false,
        canMove : true,
        create  : function(){
           this.img.src ="img/image01.JPG";
           this.context.drawImage(this.img, this.x, this.y)
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
                    Bird.x = Math.floor((Math.random()*(Bird.canvas.width-Bird.w))+1);
                    Bird.y = Math.floor((Math.random()*(Bird.canvas.height-Bird.h))+1);

                    if (obj.xSpd > 0)
                        obj.xSpd += 1;
                    else
                        obj.xSpd -= 1;

                    if (obj.ySpd > 0)
                        obj.ySpd += 1;
                    else
                        obj.ySpd -= 1;
                }
                else {
                    if (clickTry <= 1) {
                        current_scene = "gameOver";
                    }
                    clickTry -= 1;
                }    
            };
        },

        mouseClickedAction: function(e){                    
            if( (e.clientX >= Bird.x && e.clientX <= Bird.x+Bird.w ) && (e.clientY >= Bird.y && e.clientY <=Bird.y+Bird.h)) {
                countScore();
                checkLevel(Bird);
                
                //Altera a posição X e Y para um valor random
                Bird.x = Math.floor((Math.random()*(Bird.canvas.width-Bird.w))+1);
                Bird.y = Math.floor((Math.random()*(Bird.canvas.height-Bird.h))+1);

                if (obj.xSpd > 0)
                    obj.xSpd += 1;
                else
                    obj.xSpd -= 1;

                if (obj.ySpd > 0)
                    obj.ySpd += 1;
                else
                    obj.ySpd -= 1;
            }
            else {
                if (clickTry <= 1) {
                    current_scene = "gameOver";
                }
                clickTry -= 1;
            }
        }

};