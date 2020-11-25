// Worked on by: Charles Huang, Alexis C. Mendiola

const ITEM_SCALE = 1;
const ACCURACY = 10; // how far off the placement can be in any direction in pixels

class trap_making_minigame extends Phaser.Scene {
    constructor() {
      super('trap_making_minigame');
    }

    /**
     * Initialize and prepare data.
     * @param {JSON} data = {
     *   name: SCENE_NAME,
     *   dimensions: { width: SCENE_WIDTH, height: SCENE_HEIGHT},
     *   interactable: MAP_OBJECT
     * }
     */
    init(data) {
      this.boardWidth = data.dimensions.width;
      this.boardHeight = data.dimensions.height;
      this.correctPlacementCount = 0;
      this.interactable = data.interactable;
      this.key = data.name;
    }

    preload() {
      // load media into memory
      this.load.image('trap_making_background', '../../assets/minigames/backgrounds/bgTrapMaker.png');
      this.load.image('skullItem', '../../assets/minigames/items/skull.png');
      this.load.image('skullSlot', '../../assets/minigames/items/skullSlot.png');
      this.load.image('candleItem', '../../assets/minigames/items/candle.png');
      this.load.image('candleSlot', '../../assets/minigames/items/candleSlot.png');
      this.load.image('potionItem', '../../assets/minigames/items/bottle.png');
      this.load.image('potionSlot', '../../assets/minigames/items/bottleSlot.png');
  
      this.load.audio('incorrect', '../../assets/audio/incorrect2.mp3');
      this.load.audio('correct', '../../assets/audio/correct_placement.mp3');
  
    }

    create() {
      // Worked on by: Charles
      minigame_scene_manager.setBackground(this.key, 'trap_making_background');
  
      let incorrect = this.sound.add('incorrect');
      let correct = this.sound.add('correct');
      correct.setVolume(0.5);
      
      // Worked on by: Alexis, Charles
      let yItemPosArr = minigame_scene_manager.shuffleArray([350, 350, 480]);
      let xSlotPosArr = minigame_scene_manager.shuffleArray([500, 550, 625]);
      let ySlotPosArr = minigame_scene_manager.shuffleArray([450, 455, 460]);
      this.createItemSlotPair('skullItem', 'skullSlot', 175, yItemPosArr[0], xSlotPosArr[0], ySlotPosArr[0]);
      this.createItemSlotPair('candleItem', 'candleSlot', 230, yItemPosArr[1], xSlotPosArr[1], ySlotPosArr[1]);
      this.createItemSlotPair('potionItem', 'potionSlot', 300, yItemPosArr[2], xSlotPosArr[2], ySlotPosArr[2]);
  
      // Worked on by: Charles
      // pointer param is needed for drag to work
      this.input.on('drag', (pointer, object, nextX, nextY) => {
        let outerBorderX = (game.config.width - this.boardWidth) / 2;
        let outerBorderY = (game.config.height - this.boardHeight) / 2;
        let objScaledHalfWidth = object.displayWidth / 2;
        let objScaledHalfHeight = object.displayHeight / 2;
        // ensure object stays within horizontal bounds of minigame
        if (nextX >= outerBorderX + objScaledHalfWidth && nextX <= outerBorderX + this.boardWidth - objScaledHalfWidth) {
          object.x = nextX;
        }
        // ensure object stays within vertical bounds of minigame
        if (nextY >= outerBorderY + objScaledHalfHeight && nextY <= outerBorderY + this.boardHeight - objScaledHalfHeight) {
          object.y = nextY;
        }
      });
  
      this.input.on('dragend', (pointer, object) => {
        // check if image is inside the slot (within a certain degree of accuracy)
        if (
          object.x >= object.targetX - ACCURACY &&
          object.x <= object.targetX + ACCURACY &&
          object.y >= object.targetY - ACCURACY &&
          object.y <= object.targetY + ACCURACY
        ) {
          // success, center image to slot's location
          object.x = object.targetX;
          object.y = object.targetY;
          object.disableInteractive();
          correct.play();
          if (++this.correctPlacementCount === yItemPosArr.length) {
            minigame_scene_manager.minigameWon(this.key, this.interactable);
          } 
        } else {
            // fail, send image back to original location
            object.x = object.initialX;
            object.y = object.initialY;
            incorrect.play();
        }
      });
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
  createItemSlotPair(item_name, slot_name, itemX, itemY, slotX, slotY) {
    // Worked on by: Charles
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
    slot.setDisplaySize(item.displayWidth + ACCURACY * 1.75, item.displayHeight + ACCURACY * 1.75);
  }
<<<<<<< HEAD
=======

  playVideo() {
    // Worked on by: Charles
    let omgwow = this.add.video(400, 300, 'omgwow');
    omgwow.setVolume(0.5);
    omgwow.alpha = 0.5;
    omgwow.setDepth(2);
    omgwow.play();

    this.tweens.add({
      targets: omgwow,
      scale: 3,
      duration: omgwow.getDuration() * 1000,
      repeat: 0,
    });

    omgwow.on('complete', () => {
      // When the audio plays, the win condition has been satisfied.
      // After the audio has finished playing, call the 'won' function.
      minigame_scene_manager.minigameWon(this.key, this.interactable);
    });
  }
>>>>>>> develop
}
