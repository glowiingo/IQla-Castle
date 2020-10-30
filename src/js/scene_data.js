// Worked on by: Evano
class SceneData{
    constructor(gamePlayScene){
        gamePlayScene.registry.values.sceneData = this;
        this.gamePlayScene = gamePlayScene;
        this.player = null;
        this.otherPlayers = {};
        this.serverConnection = new ServerConnection();
    }

    addPlayer(playerInfo) {
        this.player = this.gamePlayScene.addPlayer(playerInfo);
    }

    addOtherPlayers(players) {
        Object.keys(players).forEach(function (id) {
            this.addOtherPlayer(players[id]);
          });
    }

    addOtherPlayer(playerInfo) {
        this.otherPlayers[playerInfo.playerId] = this.gamePlayScene.addOtherPlayer(playerInfo);
    }

    removePlayer(playerId){
        this.otherPlayers[playerId].destroy();
        delete this.otherPlayers[playerId];
    }

    startGame(roleData){
        this.player.setRole(roleData[this.player.playerId]);
        this.player.sendToStartPos();
        this.gamePlayScene.scene.manager.getScene("start_game_scene").close();
    }

    alertGameStart(){
        this.serverConnection.alertGameStart();
    }
}