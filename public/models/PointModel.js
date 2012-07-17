var PointModel = Backbone.Model.extend({

    defaults: {
        x: getRandomInt(0,60), 
        y: getRandomInt(0,60),
        color: "#FF0000"
    },

    initialize: function(){
        // this.set("x", getRandomInt(0,60));
        // this.set("y", getRandomInt(0,60));
        
        this.on("change", function(m){
            var d = m.toJSON();
            d.id = m.id;
            socket.emit("user_move", d);
        });
    }

});