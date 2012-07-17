
socket.on("connect", function(){
    console.log("client connected successfully", socket.socket.sessionid);

    window.pointModel = new PointModel({

    });

    pointModel.id = socket.socket.sessionid;
    pointsCollection.add(pointModel);

    var d = pointModel.toJSON();
    d.id = pointModel.id;

    socket.emit("user_joined", d);
});

socket.on("new_user", function(d){
    console.log("connected users",d);

    var i = pointModel.id;
    delete d[i];

    console.log("others");
    var points = [];
    _.each(d, function(value, key){
        
        points.push(value);
        value.color = "#000000";
    });

    console.log("coll", pointsCollection.models);

    pointsCollection.reset(points);
    pointsCollection.add(pointModel);
});

socket.on("joined", function(d){
    console.log("user joined",d);

    var i = pointModel.id;
    delete d[i];

    console.log("others");
    var points = [];
    _.each(d, function(value, key){
        
        points.push(value);
        value.color = "#000000";
    });

    console.log("coll", pointsCollection.models);

    pointsCollection.reset(points);
    pointsCollection.add(pointModel);
});


socket.on("user_moved", function(d){
    console.log("user joined",d);

    var i = pointModel.id;
    delete d[i];

    console.log("others");
    var points = [];
    _.each(d, function(value, key){
        
        points.push(value);
        value.color = "#000000";
    });

    console.log("coll", pointsCollection.models);

    pointsCollection.reset(points);
    pointsCollection.add(pointModel);
});

