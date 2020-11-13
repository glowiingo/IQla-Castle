// Worked on by: Evano
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);
const {Player} = require('./src/js/player.js');
const {Room} = require('./src/js/room.js');
var rooms = {};

app.use(express.static(__dirname + '/src'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});
app.use("/js", express.static(__dirname + '/js'));
app.use("/src/scenes", express.static(__dirname + '/src/scenes'));
app.use("/src/scenes/ui", express.static(__dirname + '/src/scenes/ui'));
app.use("/src", express.static(__dirname + '/src'));
app.use("/assets", express.static(__dirname + '/assets'));

io.on('connection', function (socket) {

    console.log('a user connected');
    socket.on('joinRoom', (roomName, playerName) => {
        console.log(playerName, 'joined room', roomName);
        socket.join(roomName);
        if (!rooms.hasOwnProperty(roomName)) {
            rooms[roomName] = new Room(roomName);
        }
        rooms[roomName].addPlayer(new Player(roomName, socket, playerName));

        // send the rooms object to the new player
        socket.emit('currentPlayers', rooms[roomName].players);
        // update all other players of the new player
        socket.broadcast.to(roomName).emit('newPlayer', rooms[roomName].getPlayer(socket.id));

        socket.on('disconnect', function () {
            console.log('user disconnected from room: ', roomName);
            // remove this player from our rooms object
            rooms[roomName].removePlayer(socket.id);
            // emit a message to all players to remove this player
            io.to(roomName).emit('disconnect', socket.id);
            if (!rooms[roomName].hasPlayers()) {
                //rooms[roomName].stop();
                delete rooms[roomName];
            }
        });

        // when a player moves, update the player data
        socket.on('playerMovement', function (movementData) {
            rooms[roomName].getPlayer(socket.id).x = movementData.x;
            rooms[roomName].getPlayer(socket.id).y = movementData.y;
            rooms[roomName].getPlayer(socket.id).rotation = movementData.rotation;
            // emit a message to all players about the player that moved
            socket.broadcast.to(roomName).emit('playerMoved', rooms[roomName].getPlayer(socket.id));
        });

        socket.on('alertGameStart', function () {
            console.log("Alert game start");
            let roles = rooms[roomName].getRoleAssignments();
            console.log("Roles: ", roles);
            io.in(roomName).emit('gameStart', roles);
        });

        //Temp
        // if(Object.keys(rooms[roomName].players).length > 1){
        //     let roles = rooms[roomName].getRoleAssignments();
        //     console.log("Roles: ", roles);
        //     setTimeout(()=>{socket.broadcast.to(roomName).emit('gameStart', roles);}, 5000);
        // }
        

        // Worked on by: Kian Darakhshan
        // Sockets to be added once functionality is made:

        // when a player kills, update the victim's player data
        socket.on('kill', function (victimID) {
            socket.broadcast.to(roomName).emit('killed', victimID);
        });
        // 
        //
        // // when a player initiates a vote event for all other players
        // socket.on('startVote', function () {
        //
        // });
        // socket.broadcast.to(roomName).emit('startedVote', rooms[roomName].getPlayer(socket.id));
        //
        // // when a player sends their vote
        socket.on('vote', function (votedFor) {
          console.log(rooms[roomName].getPlayer(socket.id).playerId + " voted for " + votedFor)
          socket.broadcast.to(roomName).emit('voted', votedFor);
        });
        
        //
        // // when a player places a trap
        // socket.on('trapPlace', function () {
        //
        // });
        // socket.broadcast.to(roomName).emit('trapPlaced', rooms[roomName].getPlayer(socket.id));
        // // broadcast for position of trap placed?
        //
        //
        // socket.on('trapTrigger', function () {
        //
        // });
        // socket.broadcast.to(roomName).emit('trapTriggered', rooms[roomName].getPlayer(socket.id));
        //
        //
        socket.on('taskComplete', function () {
            io.in(roomName).emit('taskCompleted', rooms[roomName].getPlayer(socket.id));
        });

        //// to be added: gameOver, gameStart, roleAssignment

    })
});

server.listen(8081, function () {
    console.log(`Listening on ${server.address().port}`);
});