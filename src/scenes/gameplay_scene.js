/*
This class is defined in order for preloading of assets, animations, and sprites.
This should be a POC for front end, logic needs to be separated for the map.

*/

class gameplay_scene extends Phaser.Scene {
  // Worked on by: Gloria Ngo
  constructor() {
    super({
      key: 'gameplay_scene',
    });
  }

  // Worked on by: Gloria Ngo
  init(data) {
    // initialize and prepare data
    // constants, configurations, etc.
    this.message = data.message; // scene var called message passed in to scene

    // Worked on by: Evano
    console.log(this.registry.values.sceneData);
    this.sceneData = this.registry.values.sceneData;
    this.otherPlayers = this.physics.add.group();
    this.interactables = this.physics.add.group();
    this.deadbodies = [];
  }
  // Worked on by: Brian
  preload() {
    // load audio and images into memory
    // this.load.image('player', '../../assets/player/Player.png');
    this.load.spritesheet(
      'player', 
      '../../assets/player/PlayerWalkCycle.png', 
      {
        frameWidth: 128,
        frameHeight: 128,
        endFrame: 7
      });
    this.load.image('trap', '../../assets/Trap.png');

    this.load.tilemapTiledJSON(
      'map',
      '../../assets/tilemaps/maps/protypeMap.json'
    );
    this.load.image('tiles', '../../assets/tilemaps/tiles/updated-tiles.png');
    this.load.image('deadbody', 'assets/DeadCharacter.png');
    this.load.audio('BGM', '../../assets/audio/BGM.mp3');
    this.load.image('bookshelfMinigame', '../../assets/bookshelf.png');
    this.load.image('trapMakingMinigame', '../../assets/shelfAndTable.png');
    this.load.image('mouseClickMinigame', '../../assets/ratTable.png');
  }

  create() {
    // add objects into the game
    console.log('gameplay_scene');

    this.gameStart = false;

    this.scene.launch('playerUI_scene');
    this.scene.launch('mapOverlay_scene');
    this.scene.launch('showPositionPlayer_scene');
    this.scene.launch('voting_scene');
    this.scene.launch('chat_scene');
    this.scene.launch('player_death_scene');

    let config = {
      key: 'WalkCycle',
      frames: this.anims.generateFrameNumbers('player', {
        start: 0,
        end: 7,
      }),
      frameRate: 8,
      repeat: -1,
    };
    this.anims.create(config);

    //Worked on by Brian
    this.bgmusic = this.sound.add('BGM');
    // BGM settings.
    let musicConfig = {
      mute: false,
      volume: 0.3,
      rate: 0.9,
      detune: 0,
      seek: 0,
      loop: true,
      delay: 0,
    };
    this.bgmusic.play(musicConfig);

    // Worked on by: Flemming, William
    let map = this.make.tilemap({
      key: 'map',
    });
    let tileset = map.addTilesetImage('updated_tiles', 'tiles');
    map.createStaticLayer('Background2', tileset);
    map.createStaticLayer('Background', tileset);
    map.createStaticLayer('Ground', tileset);

    this.wallsLayer = map.createStaticLayer('Walls', tileset);
    this.wallsLayer.setCollisionByProperty({
      collides: true,
    });
    map.createStaticLayer('Props', tileset);

    this.addInteractables();

    // Worked on by: Evano
    //Start networking & create player once networking is connected
    this.sceneData.serverConnection.addGameplayHandlers(this.sceneData);
    this.sceneData.serverConnection.joinRoom();
  }
  // Worked on by: Gloria Ngo
  update() {
    // loop that runs constantly
    // -- game logic mainly in this area
    if (this.player && !this.scene.get('chat_scene').showChat) {
      if (!this.player.alive && this.player.col.world != null) {
        this.player.col.destroy();
      }
      this.player.playerMovement();
      this.player.canPlaceTrap();
      this.sceneData.serverConnection.movement(this.player);
      this.scene
        .get('showPositionPlayer_scene')
        .move(this.player.x, this.player.y);
    }
  }

  // Worked on by Lewis
  playerDeathAnim() {
    return new Promise((resolve) => {
      let deathAnimScene = this.scene.get('player_death_scene');

      deathAnimScene.startDeathAnim().then((value) => {
        setTimeout(() => {
          this.scene.stop('player_death_scene');
          resolve();
        }, 4000);
      });
    });
  }

  // Worked on by William (Front End)
  gameOver(team) {
    // hide the chat if on
    document.getElementById('textbox').style.display = 'none';
    document.getElementById('chatbox').style.display = 'none';

    // destroy other scenes
    this.scene.stop('playerUI_scene');
    this.scene.stop('mapOverlay_scene');
    this.scene.stop('showPositionPlayer_scene');
    this.scene.stop('voting_scene');
    this.scene.stop('chat_scene');
    this.sceneData.serverConnection.alertGameEnd();
    
    if (team === "vampires") {
      team = "IQLA";
    }
    this.scene.start('endGame_scene', team + ' win')
  }

  vote(votedFor) {
    this.sceneData.serverConnection.vote(votedFor);
  }

  // Worked on by: Evano
  addPlayer(playerInfo) {
    console.log('PLAYERINFO:', playerInfo);
    this.player = new Player(
      {
        scene: this,
        x: playerInfo.x,
        y: playerInfo.y,
        sprite: 'player',
      },
      playerInfo.playerId,
      playerInfo.playerName,
      300,
      this.otherplayers
    );

    this.add.existing(this.player).setScale(1);
    this.physics.add.existing(this.player);

    this.player.body.offset.y = 64;
    this.player.body.offset.x = 32;
    this.player.body.height = 64;
    this.player.body.width = 64;

    this.player.col = this.physics.add.collider(this.player, this.wallsLayer);
    this.cameras.main.startFollow(this.player, true, 1, 1);
    return this.player;
  }

  addOtherPlayer(playerInfo) {
    const otherPlayer = new Player({
      scene: this,
      x: playerInfo.x,
      y: playerInfo.y,
      sprite: 'player'
    }, playerInfo.playerId, playerInfo.playerName, 300);

    //otherPlayer.setTint(0xff0000); Sets tint of other players to red for testing purposes

   
    this.scene.get('voting_scene').players.push(otherPlayer);
    this.scene.get('voting_scene').displayPortraits();

    this.add.existing(otherPlayer).setScale(1);
    this.otherPlayers.add(otherPlayer);

    return otherPlayer;
  }

  /**
   * Add MapObjects to the gameplay scene, each with its own minigame attached.
   */
  addInteractables() {
    // Worked on by: Alexis
    // ------------------------ Detective MapObjects ------------------------ //
    this.studyBookshelfObj = new MapObject({
      scene: this,
      x: 3400,
      y: 928,
      sprite: 'bookshelfMinigame',
      triggeredScene: 'book_click_minigame',
      isMinigameObj: true,
      isIqlaInteractable: false,
      taskId: 1
    });
    this.add.existing(this.studyBookshelfObj).setScale(2);
    this.physics.add.existing(this.studyBookshelfObj);

    // ------------------------ Detective MapObjects ------------------------ //
    this.storageBookshelfObj = new MapObject({
      scene: this,
      x: 3070,
      y: 2720,
      sprite: 'bookshelfMinigame',
      triggeredScene: 'book_click_minigame',
      isMinigameObj: true,
      isIqlaInteractable: false,
      taskId: 3
    });
    this.add.existing(this.storageBookshelfObj).setScale(2);
    this.physics.add.existing(this.storageBookshelfObj);

    // ------------------------ IQLa MapObjects ------------------------ //
    this.studyTrapObj = new MapObject({
      scene: this,
      x: 3500,
      y: 928,
      sprite: 'trapMakingMinigame',
      triggeredScene: 'trap_making_minigame',
      isMinigameObj: true,
      isIqlaInteractable: true,
      taskId: 1
    });
    this.add.existing(this.studyTrapObj).setScale(2);
    this.physics.add.existing(this.studyTrapObj);

    // ------------------------ Neutral MapObjects ------------------------ //
    this.kitchenMouseObj = new MapObject({
      scene: this,
      x: 643,
      y: 1685,
      sprite: 'mouseClickMinigame',
      triggeredScene: 'mouse_click_minigame',
      isMinigameObj: true,
      isIqlaInteractable: null,
      taskId: 2
    });
    this.add.existing(this.kitchenMouseObj).setScale(2);
    this.physics.add.existing(this.kitchenMouseObj);

    this.garageMouseObj = new MapObject({
      scene: this,
      x: 146,
      y: 480,
      sprite: 'mouseClickMinigame',
      triggeredScene: 'mouse_click_minigame',
      isMinigameObj: true,
      isIqlaInteractable: null,
      taskId: 0
    });
    this.add.existing(this.garageMouseObj).setScale(2);
    this.physics.add.existing(this.garageMouseObj);

    // ------------ Add MapObjects to a physics group ------------ //
    this.interactables.add(this.studyBookshelfObj);
    this.interactables.add(this.storageBookshelfObj);
    this.interactables.add(this.studyTrapObj);
    this.interactables.add(this.kitchenMouseObj);
    this.interactables.add(this.garageMouseObj);
  }

  triggerScene(pauseKey, launchKey, launchData) {
    // Worked on by: Alexis
    this.scene.pause();
    this.scene.pause(pauseKey);
    this.scene.launch(launchKey, launchData);
  }
}
