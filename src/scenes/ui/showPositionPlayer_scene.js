/* This class is defined to display the position of the player in the map_overlay
@author: Hannah Nguyen
*/
class showPositionPlayer_scene extends Phaser.Scene {

    constructor() {
      super({
        key: 'showPositionPlayer_scene',
        active: true
      });
    }
  
    preload() {
      //load the image into the scene
      this.load.image('dot', '../../assets/dot.png');
    }

    create() {
      // add object into the game
      this.scene.setVisible(false);
      let showDot = false;
  
      this.dot = this.physics.add.sprite(330, 230, 'dot').setScale(0.05);
  
      this.tabPress = this.input.keyboard.addKey('TAB');
      this.tabPress.on('down', () => {
        showDot = !showDot;
        showDot ? this.dotShow() : this.dotHide();
      });
  
      this.key = this.input.keyboard.addKeys({
        up: Phaser.Input.Keyboard.KeyCodes.W,
        down: Phaser.Input.Keyboard.KeyCodes.S,
        left: Phaser.Input.Keyboard.KeyCodes.A,
        right: Phaser.Input.Keyboard.KeyCodes.D,
      });
    }
    
    dotShow() {
      // display player position in map-overlay
      this.scene.setVisible(true);
    }

    dotHide() {
      // non-display player position in map-overlay
      this.scene.setVisible(false);
    }
    
    // reused Gloria's code
    move_object_left_right(object, speed) {
      object.x += speed;
    }
    //reused Gloria's code
    move_object_up_down(object, speed) {
      object.y += speed;
    }
    //reused Gloria's code
    dot_movement(cursors) {
      if (cursors.left.isDown) {
        if (cursors.right.isDown) {
          this.dot.setVelocityX(0);
        } else {
          this.dot.setVelocityX(-25);
        }
      } else if (cursors.right.isDown) {
          if (cursors.left.isDown) {
            this.dot.setVelocityX(0);
        } else {
          this.dot.setVelocityX(25);
        }
        } else {
          this.dot.setVelocityX(0);
      }
      if (cursors.up.isDown) {
        if (cursors.down.isDown) {
          this.dot.setVelocityY(0);
        } else {
          this.dot.setVelocityY(-25);
        }
      } else if (cursors.down.isDown) {
        if (cursors.up.isDown) {
          this.dot.setVelocityY(0);
        } else {
          this.dot.setVelocityY(25);
        }
      } else {
        this.dot.setVelocityY(0);
      }
     }
     //reused Kiwon's code
    update() {
      const cursors = this.input.keyboard.addKeys(
            {up:Phaser.Input.Keyboard.KeyCodes.W,
            down:Phaser.Input.Keyboard.KeyCodes.S,
            left:Phaser.Input.Keyboard.KeyCodes.A,
            right:Phaser.Input.Keyboard.KeyCodes.D});

      this.dot_movement(cursors);
    }
  }