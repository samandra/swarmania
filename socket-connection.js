var io = require('socket.io').listen(8091);

var PointsCollection = {

    models: {},

    add: function(model){
        this.models[model.id] = model
    },

    remove: function(modelId){

        if(this.models[modelId]!==undefined){
            delete this.models[modelId];
        }
    },

    member: function(model){

        return (this.models[model.id]!==undefined);

    }

}


io.sockets.on('connection', function (socket) {
    console.log("connection established by socket id: ", socket.id);
    
    //console.dir(socket);

    //console.log("scokets");
    //console.dir(io.sockets);

    socket.join("mainRoom");

    socket.emit("joined", PointsCollection.models);

    socket.on("user_joined", function(d){

        PointsCollection.add(d);
        //console.log("user joined on server: ");
        
        //console.dir(PointsCollection);
        socket.broadcast.emit("new_user", PointsCollection.models);
    });
    // console.log("rooms: ");
    // console.dir(io.sockets.manager.rooms);

    //socket.broadcast.emit("newUser", );

    // io.sockets.in('mainRoom').emit('new_user', data)
    
    socket.on("user_move", function(d){
        PointsCollection.models[socket.id] = d;

        socket.broadcast.emit("user_moved", PointsCollection.models);
    });


    socket.on("disconnect", function(){
        console.log("socket ith id: ", socket.id, " disconnected");
        PointsCollection.remove(socket.id);

        socket.broadcast.emit("user_left", PointsCollection.models);
    });

    // socket.on("user_joined", function(){

    // });
    
//     socket.on('setNickname', function (name){
//         var nicknameHistory;
        
//         socket.get("nicknameHistory", function(err, nnHistory){
//             if(err){
//                 console.log("nnh error******************************************");
//             }
//             console.log("curennhist", nnHistory);
//             nicknameHistory = nnHistory || "";
//             nicknameHistory =nicknameHistory+ "@"+name;
//             console.log("nnh,", nicknameHistory);
            
//             socket.set("nicknameHistory", nicknameHistory, function(){
//                 socket.emit('nicknameChanged', nicknameHistory);
//             });
            
//         });
        
        
// //      socket.set('nickname', name, function (){
// //              socket.emit('nicknameChanged', name);
// //              //return true;
// //      });
// //      if(nicknameHistory==null || nicknameHistory==undefined){    
// //          socket.set('nickname', name, function (){
// //              socket.emit('nicknameChanged', name);
// //              //return true;
// //          });
// //      }
        
// //      nicknameHistory += "@"+name;
// //      console.log("histo", nicknameHistory);
// //      
// //      socket.set("nicknameHistory",nicknameHistory, function (){
// //          socket.emit('nicknameChanged', name);
// //      });
        
        
//         console.log("nickname: " , name);
        


//         //socket.broadcast.emit("new user", {ss: name + " " + "joined" })
//     });

//  socket.on('msg', function (data) {
//      socket.get('nickname', function (err, name) {
//          console.log('Chat message by ', name);
//          socket.broadcast.emit("public msg", {content:name+": " + data});
//      });
//  });

});
