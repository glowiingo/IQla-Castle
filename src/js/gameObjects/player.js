//Worked on by Kiwon, John, Nav, Evano, Gloria, Kiwon, Mike

//const player = require('../player');

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
    this.trap = true;
    this.hadTrap = false;
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
    this.deadbodies = [];
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
  playerMovement() {

    if (this.iqla && this.trap && this.key.place_trap.isDown) {
      console.log('placed');
      this.trap = new Trap({
        scene: this.scene,
        x: this.x,
        y: this.y
      }, this);
      this.trap = false;
      this.hadTrap = true;
    }

    if (this.key.up.isDown) {
      this.setVelocityY(-this.speed);
    } else if (this.key.down.isDown) {
      this.setVelocityY(this.speed);
    } else {
      this.setVelocityY(0);
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

    if (
      this.key.down.isDown ||
      this.key.up.isDown ||
      this.key.left.isDown ||
      this.key.right.isDown
    ) {
      if (!this.isWalking) {
        this.playerWalkAnimStart();
      }
    } else {
      this.playerWalkAnimStop();
    }
    // print x y of player position to send to network team and update
    // console.log(this.x, this.y);
  }

  // Worked on by: Anna
  playerWalkAnimStart() {
    if (!this.isWalking) {
      this.isWalking = true;
      this.play('WalkCycle');
    }
  }

  // Worked on by: Anna
  playerWalkAnimStop() {
    this.isWalking = false;
    this.anims.stop();
  }

  getPlayerName() {
    return this.playerName;
  }

  //worked on by Mike
  createDeadBody(x, y) {
    let dead_image = this.scene.add.image(x, y, 'deadbody');
    dead_image.setScale(0.5);
    dead_image.setDepth(30);
    dead_image.setInteractive();
    this.deadbodies.push(dead_image);
  }

  //worked on by Mike
  report() {
    for (let i = 0; i < this.deadbodies.length; i++) {
      let c = Phaser.Math.Distance.Chebyshev(this.x, this.y, this.deadbodies[i].x, this.deadbodies[i].y);
      if (c < 60) {
        console.log('FOUND A DEADBODY!');
        break;
      }
    }
  }

  //worked on by Mike
  kill(sprite) {
    for (let i = 0; i < sprite.length; i++) {
      let c = Phaser.Math.Distance.Chebyshev(this.x, this.y, sprite[i].x, sprite[i].y);
      if (sprite[i].active) {
        if (c < 60) {
          sprite[i].setActive(false).setVisible(false);
          sprite[i].alive = false;
          //sprite[i].setTexture('ghost');
          console.log('Hidden');
          console.log(sprite[i].x, sprite[i].y);
          this.createDeadBody(sprite[i].x, sprite[i].y);
          console.log('I killed someone', sprite[i].id);
          this.scene.registry.values.sceneData.serverConnection.kill(sprite[i].id);
          break;
        }
      }
    }
  }

  /**
  * Get the position of nearby interactable MapObjects. If it's active and within a
  * a certain range, return that MapObject and set its active variable to false.
  * @param {MapObject[]} interactables 
  */
  interact(interactables) {
    // Worked on by: Alexis
    for (let i = 0; i < interactables.length; i++) {
      let pos = Phaser.Math.Distance.Chebyshev(this.x, this.y, interactables[i].x, interactables[i].y);
      if (interactables[i].active && pos < 60) {
        interactables[i].setActive(false); // Bugged.
        // Above line needs to be done only after the minigame is completed.
        return interactables[i];
      }
    }
  }

  // Worked on by Gloria
  /**
   * Sets the role for the player based on what has been decided by the server
   */
  setRole(player_id_object) {
    console.log('Object: ' + player_id_object);
    console.log('Accessing Object: ' + player_id_object[this.id]);
    let iqla_status = player_id_object[this.id];
    // check for nulls
    if (iqla_status) {
      // set iqla
      if (iqla_status == 'vampire') {
        this.iqla = true;
      }
      console.log('Is iqla', this.iqla);
    }
  }

  // Worked on by Gloria
  // Sets player x and y to spawn point
  sendToStartPos() {
    this.x = this.spawnX;
    this.y = this.spawnY;
  }
}
