/*
This class is defined in order for preloading of assets, animations, and sprites.
This should be a POC for front end, logic needs to be separated for the map.
*/

// tilemap source: https://phaser.io/examples/v3/view/camera/follow-zoom-tilemap


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
    this.load.tilemapTiledJSON('map', '../../assets/tilemaps/maps/super-mario.json');
    this.load.image('tiles1', '../../assets/tilemaps/tiles/super-mario.png')
  }

  create() {
    // add objects into the game
    console.log("gameplay_scene");

    this.cameras.main.setBounds(0, 0, game.config.width, game.config.height / 2);
    this.physics.world.setBounds(0, 0, game.config.width, game.config.height / 2)
    let map = this.make.tilemap({ key: 'map' });
    let tileset = map.addTilesetImage('SuperMarioBros-World1-1', 'tiles1')
    let layer = map.createStaticLayer('World1', tileset, 0, 0);


    this.player = this.physics.add.sprite(game.config.width / 2, game.config.height / 2, 'haachama').setScale(1);
    this.player.setCollideWorldBounds(true);
    this.player.setScale(0.25)

    this.cameras.main.startFollow(this.player, true, 1, 1);
    this.cameras.main.setZoom(4);

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
      this.move_object_left_right(this.player, -10);
    }
    if (cursors.right.isDown) {
      // console.log("Right");
      this.move_object_left_right(this.player, 10);
    }
    if (cursors.up.isDown) {
      // console.log("Up");
      this.move_object_up_down(this.player, -10);
    }
    if (cursors.down.isDown) {
      // console.log("Down");
      this.move_object_up_down(this.player, 10);
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
