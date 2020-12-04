// Worked on by: Charles Huang, Alexis C. Mendiola
const NUM_OF_MICE = 3;
const MIN_DUR = 400; // minimun amount of time in ms for a mouse to travel from A to B
const MAX_DUR = 600; // maximum amount of time in ms for a mouse to travel from A to B

class mouse_click_minigame extends Phaser.Scene {
  constructor() {
    super('mouse_click_minigame');
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
    this.key = data.name;
    this.interactable = data.interactable;

    // coordinates of the sides of a table and its size.
    this.tableLeft = 180;
    this.tableRight = 625;
    this.tableTop = 130;
    this.tableBottom = 455;
    this.tableWidth = this.tableRight - this.tableLeft;
    this.tableHeight = this.tableBottom - this.tableTop;
  }

  preload() {
    // Load media into memory.
    this.load.image('mouse_click_background', '../../assets/minigames/backgrounds/bgTable.png');
    this.load.image('mouse', '../../assets/minigames/items/ratCurledTail.png');

    this.load.audio('squish', '../../assets/audio/squish.mp3');
  }

  create() {
    let squish = this.sound.add('squish');
    squish.setVolume(0.75);

    minigame_scene_manager.setBackground(this.key, 'mouse_click_background');

    let mice = [];

    for (let i = 0; i < NUM_OF_MICE; i++) {
      let randX = Math.random() * this.tableWidth + this.tableLeft;
      let randY = Math.random() * this.tableHeight + this.tableTop;
      mice.push(this.add.image(randX, randY, 'mouse'));
    }

    //add animation and interactive functionality for each mouse
    mice.forEach((mouse) => {
      mouse.setInteractive();
      // remove mouse if clicked on
      mouse.on('pointerdown', () => {
        mouse.setVisible(false);
        mice.splice(mice.indexOf(mouse), 1);
        squish.play();
        if (mice.length === 0) {
          minigame_scene_manager.minigameWon(this.key, this.interactable);
        }
      });

      // move mouse to random coordinates on the board at random speeds.
      mouse.nextX = Math.random() * this.tableWidth + this.tableLeft;
      mouse.nextY = Math.random() * this.tableHeight + this.tableTop;
      mouse.rotation = this.getRadians(mouse.x, mouse.y, mouse.nextX, mouse.nextY);
      let tween = this.tweens.add({
        targets: mouse,
        x: mouse.nextX,
        y: mouse.nextY,
        duration: MIN_DUR + Math.random() * (MAX_DUR - MIN_DUR),
        repeat: -1,
        onEnd: () => {
          mouse.nextX = Math.random() * this.tableWidth + this.tableLeft;
          mouse.nextY = Math.random() * this.tableHeight + this.tableTop;
          mouse.rotation = this.getRadians(mouse.x, mouse.y, mouse.nextX, mouse.nextY);

          tween.updateTo('x', mouse.nextX, true);
          tween.updateTo('y', mouse.nextY, true);
          tween.updateTo('duration', MIN_DUR + Math.random() * (MAX_DUR - MIN_DUR), true);
        },
      });
    });
  }

  update() {}

  // atan2() takes in y param first and returns randians relative to
  // the horizontal plane pointing right from (0, 0) hence the additional
  // 90degrees to align it with the current grid (vertical plane pointing
  // up from (0, 0)).
  getRadians(currX, currY, nextX, nextY) {
    return Math.atan2(nextY - currY, nextX - currX) + Math.PI / 2;
  }

  /**
   * ========== DEPRECATED (i think) ==========
   * Returns a random float that falls within the minigame board. This
   * assumes the board is centered on the main game canvas.
   *
   * Parameter object_size is used to account for the image's anchor point
   * being at its center (this function will not accurately work otherwise).
   * IE: If this function is given a board size of 3 and object size of 1 on
   * a game of size 5, it will return a random float between 2.5 and 3.5 (exclusive).
   * @param {*} board_size size of the board in width or height
   * @param {*} object_size size of an object on the board in width or height.
   */
  getRandomX(board_size, object_size) {
    let min = (this.game.config.width - board_size) / 2 + object_size / 2;
    return Math.random() * (board_size - object_size) + min;
  }
  getRandomY(board_size, object_size) {
    let min = (this.game.config.height - board_size) / 2 + object_size / 2;
    return Math.random() * (board_size - object_size) + min;
  }
}
