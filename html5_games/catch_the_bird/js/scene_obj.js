var Scene = {
        canvas  : null,
        context : null,
        name    : 'Scene',
        img_path: new Image(),
        img     : new Image(),
        x       : 0,
        y       : 0,
        w       : 800,
        h       : 600,

        drawScene  : function(){
           this.img.src = this.img_path;
           this.context.drawImage(this.img, this.x, this.y)
        }
};