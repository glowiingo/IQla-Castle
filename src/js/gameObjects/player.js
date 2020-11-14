//Worked on by Kiwon, John, Nav, Evano, Gloria, Kiwon, Mike

//const player = require("../player");

class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(config, id, playerName, speed, iqla = false) {
    super(config.scene, config.x, config.y, config.sprite);

    // console.log(this);
    // this.scene.add.existing(this).setScale(1);
    // this.scene.physics.add.existing(this);
    // this.setCollideWorldBounds(true);

    if (config.iqla) {
      this.iqla = iqla;
    }
    this.id = id;
    this.speed = speed;
    this.alive = true;
    this.iqla = false;
    this.playerName = playerName;

    // Worked on by: Anna, Evano
    this.isWalking = false;

    // we should set these to global variables
    this.spawnX = 1408;
    this.spawnY = 512;

    this.key = this.scene.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      place_trap: Phaser.Input.Keyboard.KeyCodes.E
    });
  }

  /**
   * Removes captures when chat scene is being used so that you are able to use the letters
   */
  removeCaptures() {
    this.scene.input.keyboard.removeCapture(Phaser.Input.Keyboard.KeyCodes.W);
    this.scene.input.keyboard.removeCapture(Phaser.Input.Keyboard.KeyCodes.A);
    this.scene.input.keyboard.removeCapture(Phaser.Input.Keyboard.KeyCodes.S);
    this.scene.input.keyboard.removeCapture(Phaser.Input.Keyboard.KeyCodes.D);
    this.scene.input.keyboard.removeCapture(Phaser.Input.Keyboard.KeyCodes.E);
  }

  //worked on by Kiwon and John
  player_movement() {

    if (!this.trap_placed && this.key.place_trap.isDown) {
      console.log("placed");
      this.trap = new Trap({ scene: this.scene, x: this.x, y: this.y }, this);
      this.trap_placed = true;
    }

    //console.log(this);
    if (this.key.left.isDown) {
      this.setVelocityX(-this.speed);
      this.flipX = false;
    } else if (this.key.right.isDown) {
      this.setVelocityX(this.speed);
      this.flipX = true;
    } else {
      this.setVelocityX(0);
    }

    if (this.key.up.isDown) {
      this.setVelocityY(-this.speed);
    } else if (this.key.down.isDown) {
      this.setVelocityY(this.speed);
    } else {
      this.setVelocityY(0);
    }

    // Worked on by: William, Brian, Anna, Flemming
    if (
      this.key.down.isDown ||
      this.key.up.isDown ||
      this.key.left.isDown ||
      this.key.right.isDown
    ) {
      if (!this.isWalking) {
        this.player_walk_anim_start();
      }
    } else {
      this.player_walk_anim_stop();
    }
    // print x y of player position to send to network team and update
    // console.log(this.x, this.y);
  }

  getPlayerName() {
    return this.playerName;
  }

  // Worked on by: Anna
  player_walk_anim_stop() {
    this.isWalking = false;
    this.anims.stop();
  }
  // Worked on by: Anna
  player_walk_anim_start() {
    if (!this.isWalking) {
      this.isWalking = true;
      this.play("WalkCycle");
    }
  }

  getPlayerName() {
    return this.playerName;
  }

  //worked on by Mike
  create_deadBody(x, y) {
    let dead_image = this.scene.add.image(x, y, "deadbody");
    dead_image.setScale(0.5);
    dead_image.setDepth(30);
  }

  //worked on by Mike
  kill(sprite) {
    for (let i = 0; i < sprite.length; i++) {
      let c = Phaser.Math.Distance.Chebyshev(this.x, this.y, sprite[i].x, sprite[i].y);
      if (sprite[i].active) {
        if (c < 60) {
          sprite[i].setActive(false).setVisible(false);
          sprite[i].alive = false;
          //sprite[i].setTexture("ghost");
          console.log("Hidden");
          console.log(sprite[i].x, sprite[i].y);
          this.create_deadBody(sprite[i].x, sprite[i].y);
          console.log("I killed someone", sprite[i].id);
          this.scene.registry.values.sceneData.serverConnection.kill(sprite[i].id);
        }
        break;
      }
    }
  }

  // Worked on by Gloria
  // Sets the role for the player based on a random number generator
  // We should note that other player factors may need to be passed into this function
  // Logic may need to be defined on the server? or server needs to pass all player ids in array
  setRole(player_id_object) {
    console.log("Object: " + player_id_object);
    console.log("Accessing Object: " + player_id_object[this.id]);
    let iqla_status = player_id_object[this.id];
    // check for nulls
    if (iqla_status) {
      // set iqla
      if (iqla_status == "vampire") {
        this.iqla = true;
      }
      console.log("Is iqla", this.iqla);
    }
  }

  // Worked on by Gloria
  // Sets player x and y to spawn point
  sendToStartPos() {
    this.x = this.spawnX;
    this.y = this.spawnY;
  }
}
