/*
This class is defined in order for preloading of assets, animations, and sprites.
This should be a POC for front end, logic needs to be separated for the map.
*/


class gameplay_scene extends Phaser.Scene {

  constructor() {
    super({
      key: 'gameplay_scene'
    });
  }

  init(data) {
    // initialize and prepare data 
    // constants, configurations, etc.
    this.message = data.message; // scene var called message passed in to scene

    this.serverConnection = data.serverConnection;
    this.otherPlayers = this.physics.add.group();
  }

  preload() {
    // load audio and images into memory
    // this.load.image('haachama', '../../assets/player/Player.png');
    this.load.spritesheet('haachama', '../../assets/player/PlayerWalkCycle.png', { frameWidth: 128, frameHeight: 128, endFrame: 7 });

    this.load.tilemapTiledJSON('map', '../../assets/tilemaps/maps/protypeMap.json');
    this.load.image('tiles', '../../assets/tilemaps/tiles/drawtiles.png');
    this.load.image('deadbody', 'assets/deadCharacter.png');
    this.load.audio('BGM', '../../assets/audio/BGM.mp3');
  }

  create() {
    // add objects into the game
    console.log("gameplay_scene");

    this.scene.launch("playerUI_scene");
    this.scene.launch("mapOverlay_scene");

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
    let tileset = map.addTilesetImage('better_tiles', 'tiles')
    map.createStaticLayer('Ground', tileset);

    this.wallsLayer = map.createStaticLayer('Walls', tileset);
    this.wallsLayer.setCollisionByProperty({ collides: true });


    //Start networking & create player once networking is connected
    this.serverConnection.addGameplayHandlers(this);
    this.serverConnection.joinRoom();

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
  }

  kill(sprite) {
    for (let i = 0; i < sprite.length; i++) {
      let a = Math.abs(this.player.x - sprite[i].x);
      let b = Math.abs(this.player.y - sprite[i].y);
      let c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
      // console.log(c);
      if (c < 60) {
        sprite[i].setActive(false).setVisible(false);
        console.log("Hidden");
        console.log(sprite[i].x, sprite[i].y);
        this.create_deadBody(sprite[i].x, sprite[i].y);
        this.serverConnection.kill(sprite[i].playerId);
      }
    }
    // console.log(Math.abs(this.player.x - this.player2.x));
  }

  create_deadBody(x, y) {
    let dead_image = this.add.image(x, y, 'deadbody');
    dead_image.setScale(0.25);
    dead_image.setDepth(30);
  }

  move_object_left_right(object, speed) {
    object.x += speed;
  }

  move_object_left_right(object, speed) {
    object.x += speed;
  }

  move_object_up_down(object, speed) {
    object.y += speed;
  }

  reset_object_bot_mid(object) {
    object.y = config.height;
    object.x = config.width / 2;
  }

  // Worked on by: William, Brian, Anna, Flemming
  player_movement(cursors) {
    if (cursors.left.isDown) {
      if (cursors.right.isDown) {
        this.player.setVelocityX(0);
      } else {
        this.player.setVelocityX(-300);
        this.player.flipX = false;
      }
    } else if (cursors.right.isDown) {
      if (cursors.left.isDown) {
        this.player.setVelocityX(0);
      } else {
        this.player.setVelocityX(300);
        this.player.flipX = true;
      }
    } else {
      this.player.setVelocityX(0);
    }

    if (cursors.up.isDown) {
      if (cursors.down.isDown) {
        this.player.setVelocityY(0);
      } else {
        this.player.setVelocityY(-300);
      }
    } else if (cursors.down.isDown) {
      if (cursors.up.isDown) {
        this.player.setVelocityY(0);
      } else {
        this.player.setVelocityY(300);
      }
    } else {
      this.player.setVelocityY(0);
    }

    if (cursors.down.isDown || cursors.up.isDown || cursors.left.isDown || cursors.right.isDown) {
      if (!this.isWalking) {
        this.player_walk_anim_start();
      }
    } else {
      this.player_walk_anim_stop();
    }

    // print x y of player position to send to network team and update
    // console.log(this.player.x, this.player.y);
  }

  // Worked on by: Anna
  player_walk_anim_start() {
    if (!this.isWalking) {
      this.isWalking = true;
      this.player.play('WalkCycle');
    }
  }

  // Worked on by: Anna
  player_walk_anim_stop() {
    this.isWalking = false;
    this.player.anims.stop();
  }

  update() {
    // loop that runs constantly 
    // -- game logic mainly in this area
    const cursors = this.input.keyboard.createCursorKeys();
    if(this.player){
      this.player_movement(cursors);
      this.serverConnection.movement(this.player);
    }
    

  }

  //These methods should be moved to the sceneData class when that is implemented.
    addPlayer(playerInfo) {
        console.log(playerInfo);
        this.player = this.physics.add.sprite(playerInfo.x, playerInfo.y, 'haachama').setScale(1);
        this.physics.add.collider(this.player, this.wallsLayer);
        this.cameras.main.startFollow(this.player, true, 1, 1);
        //this.player.setCollideWorldBounds(true);
    }

    addOtherPlayer(playerInfo) {
        const otherPlayer = this.add.sprite(playerInfo.x, playerInfo.y, 'haachama').setScale(1);
        otherPlayer.setTint(0xff0000); //Sets tint of other players to red for testing purposes
        otherPlayer.playerId = playerInfo.playerId;
       
        this.otherPlayers.add(otherPlayer);
    }
}

