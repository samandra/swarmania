var CanvasView = Backbone.View.extend({

    el: "#canvasContainer",

    initialize: function(){

        _.bindAll(this, "initializeCanvas", "drawRect");

        //create canvas
        var h = $("#container").height();
        var canvasHeight = h-h%16;
        var canvas = false;
        
        this.canvasHeight = 960;
        this.canvasWidth = 960;

        this.gridHeight = this.canvasHeight/16;
        this.gridWidth = this.canvasWidth/16;

        this.canvas = canvas = $('<canvas class="canvas" id="playGround" width=960 height='+960+'><canvas/>');
        $(this.el).append(canvas);

        //get 2d context
        this.ctx = canvas[0].getContext('2d');

        //render canvas first view
        this.initializeCanvas();

        console.log(canvas, this.ctx);


        $(window).keydown(function(e){
            switch(e.keyCode){
                case 65:
                    if(window.pointModel.get("x")>0){
                        window.pointModel.set("x", window.pointModel.get("x")-1);
                    }
                    break;
                case 87:
                    if(window.pointModel.get("y")>0){
                        window.pointModel.set("y", window.pointModel.get("y")-1);
                    }
                    break;
                case 68:
                    if(window.pointModel.get("x")<59){
                        window.pointModel.set("x", window.pointModel.get("x")+1);
                    }
                    break;
                case 83:
                    if(window.pointModel.get("y")<59){
                        window.pointModel.set("y", window.pointModel.get("y")+1);
                    }
                    break;
            }
        });


    },

    initializeCanvas: function(){
        //set line width
        this.ctx.lineWidth = 1;

        var h=this.gridHeight, w = this.gridWidth;

        console.log(w);
        //vertical lines


        var self = this;
        this.drawInterval = setInterval(function(){

            self.clear();

            for(var i=1; i<w; i++){
                self.drawLine(i*16, 0, i*16,self.canvasHeight);
            }

            //horizontal lines
            for(var j=1; j<h; j++){
                self.drawLine(0, j*16, self.canvasWidth,j*16);
            }

            self.collection.each(function(el){
                self.drawRect(el.get("x")*16+1, el.get("y")*16+1, 14, 14, 1, el.get("color"));
            });

        }, 10);

        // return this.drawInterval();
    },

    drawRect: function (x,y,w,h,o, color) {

        var ctx = this.ctx;

        ctx.beginPath();
        ctx.rect(x,y,w,h);
        ctx.globalAlpha = o;
        ctx.fillStyle = color;
        ctx.closePath();
        ctx.fill();
        
    },

    drawLine: function(x, y, dx, dy) {

        var ctx = this.ctx;

        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(dx, dy);
        ctx.strokeStyle = "#a3e4fc";
        ctx.closePath();
        ctx.stroke();
    },

    clear: function(){
        this.ctx.clearRect(0, 0, this.canvasHeight , this.canvasHeight);
    }


});