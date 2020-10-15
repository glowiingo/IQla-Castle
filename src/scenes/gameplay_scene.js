/*
This class is defined in order for preloading of assets, animations, and sprites.
This should be a POC for front end, logic needs to be separated for the map.
*/


class gameplay_scene extends Phaser.Scene {

  constructor() {
    super({
      key: 'gameplay_scene',
      active: true
    });
  }

  init(data) {
    // initialize and prepare data 
    // constants, configurations, etc.
    this.message = data.message; // scene var called message passed in to scene
    console.log(this.message); // print?
  }

  preload() {
    // load audio and images into memory
    this.load.image('haachama', '../../assets/haachamachama112.png');

    this.load.tilemapTiledJSON('map', '../../assets/tilemaps/maps/protypeMap.json');
    this.load.image('tiles', '../../assets/tilemaps/tiles/drawtiles.png');
  }

  create() {
    // add objects into the game
    console.log("gameplay_scene");

    let map = this.make.tilemap({ key: 'map' });

    let tileset = map.addTilesetImage('better_tiles', 'tiles')
    map.createStaticLayer('Ground', tileset);

    const wallsLayer = map.createStaticLayer('Walls', tileset);
    wallsLayer.setCollisionByProperty({ collides: true });

    this.player = this.physics.add.sprite(1408, 512, 'haachama').setScale(0.5);
    this.physics.add.collider(this.player, wallsLayer);

    this.cameras.main.startFollow(this.player, true, 1, 1);

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

  player_movement(cursors) {
    if (cursors.left.isDown) {
      // console.log("Down");
      //this.move_object_left_right(this.player, -10);
      if (cursors.right.isDown) {
        this.player.setVelocityX(0);
      } else {
        this.player.setVelocityX(-300);
      }
    } else if (cursors.right.isDown) {
      // console.log("Right");
      //this.move_object_left_right(this.player, 10);
      if (cursors.left.isDown) {
        this.player.setVelocityX(0);
      } else {
        this.player.setVelocityX(300);
      }
    } else {
      this.player.setVelocityX(0);
    }

    if (cursors.up.isDown) {
      // console.log("Up");
      //this.move_object_up_down(this.player, -10);
      if (cursors.down.isDown) {
        this.player.setVelocityY(0);
      } else {
        this.player.setVelocityY(-300);
      }
    } else if (cursors.down.isDown) {
      // console.log("Down");
      //this.move_object_up_down(this.player, 10);
      if (cursors.up.isDown) {
        this.player.setVelocityY(0);
      } else {
        this.player.setVelocityY(300);
      }
    } else {
      this.player.setVelocityY(0);
    }

    // print x y of player position to send to network team and update
    // console.log(this.player.x, this.player.y);
  }

  update() {
    // loop that runs constantly 
    // -- game logic mainly in this area
    const cursors = this.input.keyboard.createCursorKeys();
    this.player_movement(cursors);

  }
}
