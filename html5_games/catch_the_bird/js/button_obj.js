function Button()
{
    return{
        canvas  : null,
        context : null,
        obj     : null,
        name    : 'Scene',
        img_path: '',
        img     : new Image(),
        x       : 0,
        y       : 0,
        w       : 0,
        h       : 0,
        class   : "btn", 

        drawButton  : function(){
           this.img.src = this.img_path;
           this.context.drawImage(this.img, this.x, this.y)
        },

        mouseOver: function(){
            //this.canvas.onmousedown = this.mouseClickedAction;
            var obj = this;            
            this.canvas.onmousemove = function(e){
                if( (e.clientX >= obj.x && e.clientX <= obj.x+obj.w ) && (e.clientY >= obj.y && e.clientY <=obj.y+obj.h)) {
                    obj.img_path = "";
                    obj.img_path = "img/menu/btn_play_over.png";
                }
                else {
                    obj.img_path = "img/menu/btn_play_a.png";
                }
            }
        },

        mouseClick: function(){
            //this.canvas.onmousedown = this.mouseClickedAction;
            var obj = this;
            this.canvas.onmousedown = function(e){
                if( (e.clientX >= obj.x && e.clientX <= obj.x+obj.w ) && (e.clientY >= obj.y && e.clientY <=obj.y+obj.h)) {
                    current_scene = "gamePlay";
                    console.log("Btn clicked");
                    return true;
                }   
            }
        }
    }    
};