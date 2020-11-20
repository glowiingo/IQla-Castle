// Worked on by: Evano
class ServerConnection {
  constructor() {
    this.socket = io();
    this.roomName = null;
    this.playerName = 'John';
    this.prevPlayerLocation = { x: null, y: null };
  }
  setRoom(roomName) {
    this.roomName = roomName;
  }
  setName(playerName) {
    this.playerName = playerName;
  }
  //Joins room, only if room has been set / selected.
  joinRoom() {
    if (!this.roomName) {
      throw 'Cannot join Room, room is null';
    }
    this.socket.emit('joinRoom', this.roomName, this.playerName);
  }
  //Add's the required event handlers to support gameplay
  addGameplayHandlers(sceneData) {
    this.socket.on('currentPlayers', function (players) {
      sceneData.addPlayer(players[sceneData.serverConnection.socket.id]);
      delete players[sceneData.serverConnection.socket.id];
      sceneData.addOtherPlayers(players);
    });
    this.socket.on('newPlayer', function (playerInfo) {
      console.log('added other player')
      sceneData.addOtherPlayer(playerInfo);
    });
    this.socket.on('disconnect', function (playerId) {
      sceneData.removePlayer(playerId);
    });
    this.socket.on('gameOver', function (team) {
      sceneData.gamePlayScene.gameOver(team);
    });
    this.socket.on('playerMoved', function (playerInfo) {
      sceneData.otherPlayers[playerInfo.playerId].setPosition(playerInfo.x, playerInfo.y);
      sceneData.otherPlayers[playerInfo.playerId].flipX = playerInfo.flipX;
      sceneData.otherPlayers[playerInfo.playerId].playerWalkAnimStart();
    });
    this.socket.on('gameStart', function (roleData) {
      sceneData.startGame(roleData);
    });
    // Worked by Jayce
    this.socket.on('voted', function (voteId) {
      if (sceneData.serverConnection.socket.id === voteId) {
        sceneData.player.setActive(false).setVisible(false);
        sceneData.player.alive = false;
        alert('you were voted for');
      } else {
        sceneData.otherPlayers[voteId].setActive(false).setVisible(false);;
      }
      // console.log(voteId, ' was voted for');
    });
    this.socket.on('taskCompleted', function (voteId) {
      sceneData.gamePlayScene.scene.manager.getScene('playerUI_scene').setBar(Math.floor(504 * 0.1));
    });
    this.socket.on('stoppedPlayerMovement', function (playerId) {
      sceneData.otherPlayers[playerId].playerWalkAnimStop();
    });
    this.socket.on('killed', function (playerId) {
      if (sceneData.serverConnection.socket.id === playerId) {
        sceneData.player.setActive(false).setVisible(false);
        sceneData.player.alive = false;
        alert('you died');
      } else {
        sceneData.otherPlayers[playerId].setActive(false).setVisible(false);;
      }
    });

    // Worked on by: Kian
    this.socket.on('trapPlaced', function (playerId) {
      // HOW DOES THE TRAP GET PLACED HERE?
    });


    //Worked on by: Jayce
    this.socket.on('receive message', function (msg) {
      sceneData.gamePlayScene.scene.get('chat_scene').receiveMsg(msg.name, msg.text);
    });
  }

  movement(player) {
    if (player.isWalking) {
      this.socket.emit('playerMovement', { x: player.x, y: player.y, flipX: player.flipX });
      if (player.x != this.prevPlayerLocation.x && player.y != this.prevPlayerLocation.y) {
        this.prevPlayerLocation = { x: player.x, y: player.y };
      }
    } else {
      this.socket.emit('stopPlayerMovement', player.id);
    }
  }

  updatePos(player) {
    this.socket.emit('playerMovement', { x: player.x, y: player.y, flipX: player.flipX });
  }

  kill(playerId) {
    this.socket.emit('kill', playerId);
  }

  vote(playerId) {
    this.socket.emit('vote', playerId);
  }

  alertGameStart() {
    this.socket.emit('alertGameStart', {});
    console.log('sent alert from client');
  }

  //Worked on by: Jayce
  sendMessage(name, text) {
    this.socket.emit('send message', name, text);
  }


  //Worked on by: Kian
  taskCompleted() {
    this.socket.emit('taskComplete');
  }

  trapPlaced() {
    this.socket.emit('trapPlace'); // doesn't seem to be working
  }


  trapTriggered() {
    this.socket.emit('activateTrap');
  }


}