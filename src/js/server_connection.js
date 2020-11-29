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
      if(players == null){
        sceneData.gamePlayScene.scene.stop('playerUI_scene');
        sceneData.gamePlayScene.scene.stop('mapOverlay_scene');
        sceneData.gamePlayScene.scene.stop('showPositionPlayer_scene');
        sceneData.gamePlayScene.scene.stop('voting_scene');
        sceneData.gamePlayScene.scene.stop('chat_scene');
        sceneData.gamePlayScene.scene.stop('player_death_scene');
        sceneData.gamePlayScene.scene.start('join_game_scene');
        alert("Sorry, that room is in progress. Please try another room");
      }
      sceneData.addPlayer(players[sceneData.serverConnection.socket.id]);
      delete players[sceneData.serverConnection.socket.id];
      sceneData.addOtherPlayers(players);
    });
    this.socket.on('newPlayer', function (playerInfo) {
      console.log('added other player');
      sceneData.addOtherPlayer(playerInfo);
    });
    this.socket.on('disconnect', function (playerId) {
      sceneData.removePlayer(playerId);
    });
    this.socket.on('gameOver', function (team) {
      sceneData.gamePlayScene.gameOver(team);
    });
    this.socket.on('playerMoved', function (playerInfo) {
      sceneData.otherPlayers[playerInfo.playerId].setPosition(
        playerInfo.x,
        playerInfo.y
      );
      sceneData.otherPlayers[playerInfo.playerId].flipX = playerInfo.flipX;
      sceneData.otherPlayers[playerInfo.playerId].playerWalkAnimStart();
      sceneData.otherPlayers[playerInfo.playerId].updateNametagLocation();
    });
    this.socket.on('gameStart', function (roleData) {
      sceneData.startGame(roleData);
    });
    // Worked by Jayce
    this.socket.on('voted', function (voteId) {
      if (voteId == 'skip') {
        sceneData.gamePlayScene.scene.manager
          .getScene('voting_scene')
          .toggleVisible();
      } else if (sceneData.serverConnection.socket.id === voteId) {
        sceneData.player.setActive(false).setVisible(false);
        sceneData.gamePlayScene.scene.manager.getScene('voting_scene').toggleVisible(); 
        sceneData.player.alive = false;
        sceneData.gamePlayScene.scene.manager
          .getScene('voting_scene')
          .toggleVisible();
        alert('you were voted for');
      } else {
        sceneData.gamePlayScene.scene.manager.getScene('voting_scene').toggleVisible();
        if(sceneData.otherPlayers[playerId] && sceneData.otherPlayers[playerId].alive){
          sceneData.otherPlayers[voteId].setActive(false).setVisible(false);
          sceneData.otherPlayers[voteId].alive = false;
          // delete player from voting_scene player array
          sceneData.gamePlayScene.scene.manager.getScene('voting_scene').removePlayerById(voteId);
        }
      }
    });
    this.socket.on('voteStarted', function(){
      sceneData.gamePlayScene.scene.manager.getScene('voting_scene').toggleVisible();
    })
    this.socket.on('taskCompleted', function (voteId) {
      sceneData.gamePlayScene.scene.manager
        .getScene('playerUI_scene')
        .setBar(Math.floor(504 * 0.1));
    });
    this.socket.on('stoppedPlayerMovement', function (playerId) {
      sceneData.otherPlayers[playerId].playerWalkAnimStop();
    });
    this.socket.on('killed', async function (playerId) {
      if (sceneData.serverConnection.socket.id === playerId) {
        sceneData.player.setActive(false).setVisible(false);
        sceneData.player.alive = false;

        await sceneData.gamePlayScene.scene.manager
          .getScene('gameplay_scene')
          .playerDeathAnim();
        sceneData.player.createDeadBody(sceneData.player.x, sceneData.player.y);
        alert('you died');
      } else {
        sceneData.gamePlayScene.scene.manager
          .getScene('voting_scene')
          .removePlayerById(playerId);
        
        sceneData.otherPlayers[playerId].setActive(false).setVisible(false);
        sceneData.otherPlayers[playerId].alive = false;
        sceneData.otherPlayers[playerId].createDeadBody(sceneData.otherPlayers[playerId].x, sceneData.otherPlayers[playerId].y);
      }
    });

    // Worked on by: Kian
    this.socket.on('trapPlaced', function (playerId) {
      sceneData.otherPlayers[playerId].playerTrap();
    });

    this.socket.on('trapDisappear', function(playerId) {
      sceneData.otherPlayers[playerId].removePlayerTrap();
    });

    //Worked on by: Jayce
    this.socket.on('receive message', function (msg) {
      sceneData.gamePlayScene.scene
        .get('chat_scene')
        .receiveMsg(msg.name, msg.text);
    });
  }

  movement(player) {
    if (player.isWalking) {
      this.socket.emit('playerMovement', {
        x: player.x,
        y: player.y,
        flipX: player.flipX,
      });
      if (
        player.x != this.prevPlayerLocation.x &&
        player.y != this.prevPlayerLocation.y
      ) {
        this.prevPlayerLocation = { x: player.x, y: player.y };
      }
    } else {
      this.socket.emit('stopPlayerMovement', player.id);
    }
  }

  // Worked on by: Evano, Kian
  trapPlace() {
    this.socket.emit('trapPlace', this.socket.id);
  }

  updatePos(player) {
    this.socket.emit('playerMovement', {
      x: player.x,
      y: player.y,
      flipX: player.flipX,
    });
  }

  kill(playerId) {
    this.socket.emit('kill', playerId);
  }

  callVote(){
    this.socket.emit('voteStart');
  }

  vote(playerId) {
    this.socket.emit('vote', playerId);
  }

  alertGameStart() {
    this.socket.emit('alertGameStart', {});
    console.log('sent alert from client');
  }

  alertGameEnd() {
    this.socket.emit('alertGameEnd', {});
  }

  //Worked on by: Jayce
  sendMessage(name, text) {
    this.socket.emit('send message', name, text);
  }

  //Worked on by: Kian
  taskCompleted() {
    this.socket.emit('taskComplete');
  }

  // not working yet
  trapTriggered() {
    this.socket.emit('activateTrap');
  }

}
