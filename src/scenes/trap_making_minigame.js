const ITEM_SCALE = 0.25;
const ACCURACY = 10; // how far off the placement can be in any direction in pixels

class trap_making_minigame extends Phaser.Scene {
    constructor() {
        super('trap_making_minigame');
    }

    init(data) {
        // initialize and prepare data 
        // constants, configurations, etc.
        this.boardWidth = data.width;
        this.boardHeight = data.height;
        this.correctPlacementCount = 0;
    }

    preload() {
        // load audio and images into memory
        this.load.image('trap_making_background', '../../assets/shrek2.jpg');
        this.load.image('bananaCage', '../../assets/bananaCage.png');
        this.load.image('trump', '../../assets/cornTrumpItem.png');
        this.load.image('corn', '../../assets/cornTrumpSlot.png');
        this.load.image('drake', '../../assets/drake.png');

        this.load.audio('wrong', '../../assets/wrong.mp3');
        this.load.audio('wow', '../../assets/wow.mp3');
        this.load.audio('wow2', '../../assets/wow2.mp3');

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
      
      let wrong = this.sound.add('wrong');
      let wow = this.sound.add('wow');
      let wow2 = this.sound.add('wow2');
      wrong.setVolume(1.5);
      wow.setVolume(1.5);
      wow2.setVolume(0.3);
      

      let yItemPosArr = this.shuffleArray([150, 300, 450]);
      let ySlotPosArr = this.shuffleArray([150, 300, 450]);
      this.createItemSlotPair('bananaCage', 'bananaCage', 200, yItemPosArr[0], 600, ySlotPosArr[0]);
      this.createItemSlotPair('trump', 'corn', 200, yItemPosArr[1], 600, ySlotPosArr[1]);
      this.createItemSlotPair('drake', 'drake', 200, yItemPosArr[2], 600, ySlotPosArr[2]);
      
      // pointer param is needed for drag to work
      this.input.on('drag', (pointer, object, nextX, nextY) => {
        let outerBorderX = (game.config.width - this.boardWidth) / 2;
        let outerBorderY = (game.config.height - this.boardHeight) / 2;
        let objScaledHalfWidth = object.displayWidth / 2;
        let objScaledHalfHeight = object.displayHeight / 2;
        // ensure object stays within horizontal bounds of minigame
        if(nextX >= outerBorderX + objScaledHalfWidth && nextX <= outerBorderX + this.boardWidth - objScaledHalfWidth){
            object.x = nextX;
        }
        // ensure object stays within vertical bounds of minigame
        if(nextY >= outerBorderY + objScaledHalfHeight && nextY <= outerBorderY + this.boardHeight - objScaledHalfHeight){
          object.y = nextY;
        }
      });

      this.input.on('dragend', (pointer, object) => {
        // check if image is inside the slot (within a certain degree of accuracy)
        if(object.x >= object.targetX - ACCURACY && object.x <= object.targetX + ACCURACY && 
          object.y >= object.targetY - ACCURACY && object.y <= object.targetY + ACCURACY){
            // success, center image to slot's location
            object.x = object.targetX;
            object.y = object.targetY;
            object.disableInteractive();
            if(++this.correctPlacementCount === yItemPosArr.length){
              wow2.play();
              minigame_scene_manager.minigameWon('trap_making_minigame');
            }else{
              wow.play();
            }
            
        } else {
          // fail, send image back to original location 
          object.x = object.initialX;
          object.y = object.initialY;
          wrong.play();
        }
      });
    }

    update() {
        // loop that runs constantly 
        // -- game logic mainly in this area
    }
    
    /**
     * Creates a draggable image and a slot for the image to move to.
     * For best results, slots should not overlap one another and they
     * should be the same size as their respecitve images.
     * 
     * @param {*} item_name item image key
     * @param {*} slot_name slot image key
     * @param {*} itemX item's starting x position
     * @param {*} itemY item's starting y posiiton
     * @param {*} slotX slot's x position
     * @param {*} slotY slot's y position
     */
    createItemSlotPair(item_name, slot_name, itemX, itemY, slotX, slotY){
      let item = this.add.image(itemX, itemY, item_name);
      item.setScale(ITEM_SCALE); 
      item.setDepth(1);
      item.setInteractive();
      this.input.setDraggable(item);
      // create variables to check if item is inside the slot after dragging
      item.initialX = itemX;
      item.initialY = itemY;
      item.targetX = slotX;
      item.targetY = slotY;

      let slot = this.add.image(slotX, slotY, slot_name);
      slot.setDisplaySize(item.displayWidth + ACCURACY * 2, item.displayHeight + ACCURACY * 2); 
    }

    // Returns a new array with the inputs array's elements randomized.
    // This method will remove all the elements from the input array.
    shuffleArray(arr){
      let newArr = [];
      let length = arr.length;
      for(let i = 0; i < length; i++){
        let randNum = Math.floor(Math.random() * arr.length);
        newArr.push(arr.splice(randNum, 1)[0]);
      }
      return newArr;
    }
}
