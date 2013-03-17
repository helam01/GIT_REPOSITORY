var Texto = {
        context : null,
        text    : '',
        color   : '000',
        font    : 'Arial',
        size    : '20px',
        x       : 0,
        y       : 0,

        drawText: function(){
            this.context.fillStyle = this.color;
            this.context.font = this.size + " " + this.font;
            this.context.fillText(this.text, this.x, this.y);
        }
 
};