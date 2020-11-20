// Worked on by: Charles Huang, Alexis Mendiola
const NUM_OF_MICE = 3;
const MOUSE_SCALE = 1;
const MIN_DUR = 400; // minimun amount of time in ms for a mouse to travel from A to B
const MAX_DUR = 600; // maximum amount of time in ms for a mouse to travel from A to B

class mouse_click_minigame extends Phaser.Scene {
  constructor() {
    super('mouse_click_minigame');
  }

  init() {
    // initialize and prepare data
    // constants, configurations, etc.
  }

  preload() {
    // Load media into memory.
    this.load.image('mouse_click_background', '../../assets/minigames/backgrounds/bgTable.png');
    this.load.image('mouse', '../../assets/minigames/items/ratCurledTail.png');

    this.load.audio('nyes', '../../assets/audio/nyes.mp3');

    this.load.video('recorder', '../../assets/video/recorder.mp4');
  }

  create(data) {
    // sound effect of someone saying 'n-yes'
    let nyes = this.sound.add('nyes');
    nyes.setVolume(0.4);

    minigame_scene_manager.setBackground('mouse_click_minigame', 'mouse_click_background');

    // setScale does not affect image width/height so separate variables are created
    let mouseWidth = this.scene.scene.textures.get('mouse').getSourceImage().width * MOUSE_SCALE;
    let mouseHeight = this.scene.scene.textures.get('mouse').getSourceImage().height * MOUSE_SCALE;
    let mice = [];

    for (let i = 0; i < NUM_OF_MICE; i++) {
      let randX = this.getRandomX(data.width, mouseWidth);
      let randY = this.getRandomY(data.height, mouseHeight);
      mice.push(this.add.image(randX, randY, 'mouse').setScale(MOUSE_SCALE));
    }

    // add animation and interactive functionality for each mouse
    mice.forEach((mouse) => {
      mouse.setInteractive();
      // remove mouse if clicked on
      mouse.on('pointerdown', () => {
        tween.stop();
        mouse.setVisible(false);
        mice.splice(mice.indexOf(mouse), 1);

        if (mice.length === 0) {
          this.playVideo();
        } else {
          nyes.play();
        }
      });

      // move mouse to random coordinates on the board at random speeds.
      mouse.nextX = this.getRandomX(data.width, mouseWidth);
      mouse.nextY = this.getRandomY(data.height, mouseHeight);
      mouse.rotation = this.getRadians(mouse.x, mouse.y, mouse.nextX, mouse.nextY);
      let tween = this.tweens.add({
        targets: mouse,
        x: mouse.nextX,
        y: mouse.nextY,
        duration: MIN_DUR + Math.random() * (MAX_DUR - MIN_DUR),
        repeat: -1,
        onEnd: () => {
          mouse.nextX = this.getRandomX(data.width, mouseWidth);
          mouse.nextY = this.getRandomY(data.height, mouseHeight);
          mouse.rotation = this.getRadians(mouse.x, mouse.y, mouse.nextX, mouse.nextY);

          tween.updateTo('x', mouse.nextX, true);
          tween.updateTo('y', mouse.nextY, true);
          tween.updateTo('duration', MIN_DUR + Math.random() * (MAX_DUR - MIN_DUR), true);
        },
      });
    });
  }

  update() {}

  /**
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

  // atan2() takes in y param first and returns randians relative to
  // the horizontal plane pointing right from (0, 0) hence the additional
  // 90degrees to align it with the current grid (vertical plane pointing
  // up from (0, 0)).
  getRadians(currX, currY, nextX, nextY) {
    return Math.atan2(nextY - currY, nextX - currX) + Math.PI / 2;
  }

  playVideo() {
    let recorder = this.add.video(400, 300, 'recorder');
    recorder.setVolume(0.6);
    recorder.alpha = 0.6;
    recorder.setDepth(2);
    recorder.play();

    this.tweens.add({
      targets: recorder,
      scale: 4,
      duration: recorder.getDuration() * 1000,
      repeat: 0,
    });

    recorder.on('complete', () => {
      // When the audio plays, the win condition has been satisfied.
      // After the audio has finished playing, call the 'won' function.
      minigame_scene_manager.minigameWon('mouse_click_minigame');
    });
  }
}
