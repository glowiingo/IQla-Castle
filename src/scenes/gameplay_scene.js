/*
This class is defined in order for preloading of assets, animations, and sprites.
This should be a POC for front end, logic needs to be separated for the map.

*/

class gameplay_scene extends Phaser.Scene {

  // Worked on by: Gloria Ngo
  constructor() {
    super({
      key: 'gameplay_scene'
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
  }

  preload() {
    // load audio and images into memory
    // this.load.image('haachama', '../../assets/player/Player.png');
    this.load.spritesheet('haachama', '../../assets/player/PlayerWalkCycle.png', { frameWidth: 128, frameHeight: 128, endFrame: 7 });

    this.load.tilemapTiledJSON('map', '../../assets/tilemaps/maps/protypeMap.json');
    this.load.image('tiles', '../../assets/tilemaps/tiles/updated-tiles.png');
    this.load.image('deadbody', 'assets/deadCharacter.png');
    this.load.audio('BGM', '../../assets/audio/BGM.mp3');
  }

  create() {
    // add objects into the game
    console.log("gameplay_scene");

    this.scene.launch("playerUI_scene");
    this.scene.launch("mapOverlay_scene");
    this.scene.launch("showPositionPlayer_scene");
    this.scene.launch("voting_scene");

    // Worked on by: Anna
    this.isWalking = false;

    let config = {
      key: 'WalkCycle',
      frames: this.anims.generateFrameNumbers('haachama', { start: 0, end: 7 }),
      frameRate: 8,
      repeat: -1
    };
    this.anims.create(config);

    this.bgmusic = this.sound.add('BGM');
    let musicConfig = {
      mute: false,
      volume: 0.5,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: true,
      delay: 0
    }
    this.bgmusic.play(musicConfig);

    // Worked on by: Flemming, William
    let map = this.make.tilemap({ key: 'map' });
    let tileset = map.addTilesetImage('updated_tiles', 'tiles')
    map.createStaticLayer('Background', tileset);
    map.createStaticLayer('Ground', tileset);
    map.createStaticLayer('Interactables', tileset);

    this.wallsLayer = map.createStaticLayer('Walls', tileset);
    this.wallsLayer.setCollisionByProperty({ collides: true });

    // Worked on by: Evano
    //Start networking & create player once networking is connected
    this.sceneData.serverConnection.addGameplayHandlers(this.sceneData);
    this.sceneData.serverConnection.joinRoom();
  }
// Worked on by: Gloria Ngo
  update() {
    // loop that runs constantly 
    // -- game logic mainly in this area
    if(this.player){
      this.player.player_movement();
      this.sceneData.serverConnection.movement(this.player);
      this.scene.get('showPositionPlayer_scene').move(this.player.x, this.player.y);
    }

  }

  vote(votedFor) {
    this.sceneData.serverConnection.vote(votedFor);
  }

  // Worked on by: Evano
    addPlayer(playerInfo) {
        console.log("PLAYERINFO:", playerInfo);
        this.player = new Player({
          scene:this, 
          x: playerInfo.x, 
          y: playerInfo.y, 
          sprite:'haachama'
      }, playerInfo.playerId, "john", 300);

        this.add.existing(this.player).setScale(1);
        this.physics.add.existing(this.player);

        this.player.body.offset.y = 64;
        this.player.body.offset.x = 32;
        this.player.body.height = 64;
        this.player.body.width = 64;
        
        this.physics.add.collider(this.player, this.wallsLayer);
        this.cameras.main.startFollow(this.player, true, 1, 1);
        return this.player;
    }

    addOtherPlayer(playerInfo) {
        const otherPlayer = new Player({
          scene:this, 
          x: playerInfo.x, 
          y: playerInfo.y, 
          sprite:'haachama'
      }, playerInfo.playerId, "john", 300);
      
        //otherPlayer.setTint(0xff0000); Sets tint of other players to red for testing purposes
       
        this.add.existing(otherPlayer).setScale(1);
        this.otherPlayers.add(otherPlayer);
        return otherPlayer;
    }
}

