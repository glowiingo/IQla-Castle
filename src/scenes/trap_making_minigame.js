
class trap_making_minigame extends Phaser.Scene {
    constructor() {
        super('trap_making_minigame');
    }

    init(data) {
        // initialize and prepare data 
        // constants, configurations, etc.
        this.boardWidth = data.width;
        this.boardHeight = data.height;
    }

    preload() {
        // load audio and images into memory
        this.load.image('trap_making_background', '../../assets/shrek2.jpg');
        this.load.image('bananaCage', '../../assets/bananaCage.png');
    }
    
    create(data) {
      // let background = this.add.image(
      //   this.cameras.default.width / 2, 
      //   this.cameras.default.height / 2, 
      //   'trap_making_background'
      // );
      // background.displayWidth = data.width;
      // background.displayHeight = data.height;
      minigame_scene_manager.setBackground('trap_making_minigame', 'trap_making_background');

      let item1 = this.add.image(200, 200, 'bananaCage');
      item1.setScale(0.35);
      item1.setInteractive();
      this.input.setDraggable(item1);
      //this.isWithinBound(item1);

      // pointer param is needed for drag to work
      this.input.on('drag', (pointer, object, nextX, nextY) => {
        let outerBorderX = (game.config.width - this.boardWidth) / 2;
        let outerBorderY = (game.config.height - this.boardHeight) / 2;
        let objScaledHalfWidth = object.texture.source[0].width * 0.35 / 2
        let objScaledHalfHeight = object.texture.source[0].height * 0.35 / 2

        if(nextX >= outerBorderX + objScaledHalfWidth && nextX <= outerBorderX + this.boardWidth - objScaledHalfWidth){
            object.x = nextX;
        }

        if(nextY >= outerBorderY + objScaledHalfHeight && nextY <= outerBorderY + this.boardHeight - objScaledHalfHeight){
          object.y = nextY;
        }
      });
    }

    update() {
        // loop that runs constantly 
        // -- game logic mainly in this area
    }

    // isWithinBound(object, posX, posY){
    //   let minX = (game.config.width - this.boardWidth) / 2 + object.width / 2;
    //   let minY = (game.config.height - this.boardHeight) / 2 + object.height / 2;
    // }
}
