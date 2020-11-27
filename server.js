// Worked on by: Evano
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);
const { ServerPlayer } = require('./src/js/server_player.js');
const { Room } = require('./src/js/room.js');
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
      let victoryHandler = (team) => {
        io.in(roomName).emit('gameOver', team);
        console.log("Winners! team:", team);
      };
      rooms[roomName] = new Room(roomName, victoryHandler);
    } else if(rooms[roomName].started){
      socket.emit('currentPlayers', null);
      return;
    }



    rooms[roomName].addPlayer(new ServerPlayer(roomName, socket, playerName));

    // send the rooms object to the new player
    socket.emit('currentPlayers', rooms[roomName].players);
    // update all other players of the new player
    socket.broadcast.to(roomName).emit('newPlayer', rooms[roomName].getPlayer(socket.id));

    socket.on('disconnect', function () {
      if (rooms[roomName]) {
        console.log('user disconnected from room: ', roomName);
        // remove this player from our rooms object
        rooms[roomName].removePlayer(socket.id);
        // emit a message to all players to remove this player
        io.to(roomName).emit('disconnect', socket.id);
        if (!rooms[roomName].hasPlayers()) {
          delete rooms[roomName];
        }
      }
    });

    // when a player moves, update the player data
    socket.on('playerMovement', function (movementData) {
      if (rooms[roomName]) {
        //console.log(rooms[roomName].getRoleAssignments());
        rooms[roomName].getPlayer(socket.id).x = movementData.x;
        rooms[roomName].getPlayer(socket.id).y = movementData.y;
        rooms[roomName].getPlayer(socket.id).flipX = movementData.flipX;
        // console.log("Player moved: ", rooms[roomName].getPlayer(socket.id));
        // emit a message to all players about the player that moved
        socket.broadcast.to(roomName).emit('playerMoved', rooms[roomName].getPlayer(socket.id));
      }
    });

    socket.on('alertGameStart', function () {
      console.log("Alert game start");
      let roles = rooms[roomName].getRoleAssignments();
      rooms[roomName].started = true;
      console.log("Roles: ", roles);
      io.in(roomName).emit('gameStart', roles);
    });

    socket.on('alertGameEnd', function() {
      console.log("Alert game end");
      delete rooms[roomName];
    })

    //Temp
    // if(Object.keys(rooms[roomName].players).length > 1){
    //     let roles = rooms[roomName].getRoleAssignments();
    //     console.log("Roles: ", roles);
    //     setTimeout(()=>{socket.broadcast.to(roomName).emit('gameStart', roles);}, 5000);
    // }


    // Worked on by: Kian Darakhshan

    // when a player kills, update the victim's player data
    socket.on('kill', function (victimID) {
      socket.broadcast.to(roomName).emit('killed', victimID);
      rooms[roomName].playerEliminated(victimID);
    });

    // when a player places a trap
    socket.on('trapPlace', function (playerId) {
      socket.broadcast.to(roomName).emit('trapPlaced', playerId);
    });

    // NOT WORKING YET
    socket.on('trapDisappear', function (playerId) {
      socket.broadcast.emit('trapDisappeared', rooms[roomName].getPlayer(socket.id));
    })

    // NOT WORKING YET NOT WORKING YET NOT WORKING YET NOT WORKING YET
    // when player activates a trap by walking by it
    socket.on('trapTrigger', function () {
      io.in(roomName).emit('trapTriggered', rooms[roomName].getPlayer(socket.id));
    });

    socket.on('taskComplete', function () {
      io.in(roomName).emit('taskCompleted', rooms[roomName].getPlayer(socket.id));
      rooms[roomName].taskComplete(socket.id);
    });

    // When a player stops moving, goes stationary
    socket.on('stopPlayerMovement', function (playerId) {
      socket.broadcast.to(roomName).emit('stoppedPlayerMovement', playerId);
    });

    // Worked on by: Jayce
    socket.on('send message', function (name, text) {
      ftext = text.replace(/</gi, "&lt")
        .replace(/>/gi, "&gt")
        .replace(/\(/gi, "& #40")
        .replace(/\)/gi, "& #41")
        .replace(/'/gi, "& #39")
        .replace(/eval\(\(.*\)\)/gi, "[[FILTERED]]")
        .replace(/script/gi, "[[FILTERED]]")
        .replace(/alert/gi, "[[FILTERED]]")
        .replace(/[\\\"\\\'][\\s]*javascript:(.*)[\\\"\\\']/gi, "\"\"");

      var msg = { name: name, text: ftext };
      io.in(roomName).emit('receive message', msg);
    });

    // when a player sends their vote
    socket.on('vote', function (votedFor) {
      // socket.broadcast.to(roomName).emit('voted', votedFor);
      rooms[roomName].vote(votedFor, socket.id);
      let complete = rooms[roomName].voteCompleted()
      if (complete) {
        console.log("vote complete: ", complete);
        io.in(roomName).emit('voted', complete);
      }
    });
    socket.on('voteStart', function () {
      console.log("Vote is called to start")
      io.in(roomName).emit('voteStarted');
    });
  })
});

server.listen(process.env.PORT || 8081, function () {
  console.log(`Listening on ${server.address().port}`);
});