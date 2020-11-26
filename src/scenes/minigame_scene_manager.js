/**
 * Worked on by Charles Huang, Alexis C. Mendiola, Evano Hirabe
 * 
 * This scene is used to start and end minigame scenes. When creating a minigame, please
 * follow SCALE_SIZE for minigame dimensions. The minigame scene will also be layered on
 * top of the minigame_scene_manager, and therefore objects from the minigame can overlap 
 * the scene_manager's border. To end the minigame, use this scene's static function 'end'. 
 */
const SCALE_SIZE = 0.75; // scale minigame relative to game size
const BACKGROUND_SCALE_SIZE = 0.85; // background behind minigame to imitate border

class minigame_scene_manager extends Phaser.Scene {
  constructor() {
    super('minigame_scene_manager');
  }

  init() {
    // initialize and prepare data 
    // constants, configurations, etc.
    this.minigameWidth = this.cameras.default.width * SCALE_SIZE;
    this.minigameHeight = this.cameras.default.height * SCALE_SIZE;
    this.backgroundWidth = this.cameras.default.width * BACKGROUND_SCALE_SIZE;
    this.backgroundHeight = this.cameras.default.height * BACKGROUND_SCALE_SIZE;
    this.buttPadding = 8; // da padding for yo' butt
  }

  preload() {
    this.load.image('exitButt', '../../assets/exitButt.png');
  }
  
  create(key) {
    // Worked on by: Alexis
    // Ensure the launched scene rendered above all of the others:
    this.scene.bringToTop();
    this.scene.bringToTop(key.name);

    // Worked on by: Charles & Alexis
    const data = {
      name: key.name,
      interactable: key.interactable,
      dimensions: {
        width: this.minigameWidth,
        height: this.minigameHeight
      }
    }
    this.scene.launch(key.name, data);
    this.add.rectangle(game.config.width / 2, game.config.height  / 2, this.backgroundWidth, this.backgroundHeight, 0x151515);
    
    // Worked on by: Alexis
    let exitButt = this.add.image(0, 0, 'exitButt');
    exitButt.displayWidth = 25;
    exitButt.displayHeight = 25;
    exitButt.setX((game.config.width - this.backgroundWidth) / 2 + this.backgroundWidth - exitButt.displayWidth / 2 - this.buttPadding);
    exitButt.setY((game.config.height - this.backgroundHeight) / 2 + exitButt.displayHeight / 2 + this.buttPadding);
    exitButt.setInteractive();
    exitButt.on('pointerdown', () => {
        minigame_scene_manager.end(key.name);
    });

    // Worked on by: Charles
    this.input.on('pointerdown', () => {
      let xPos = this.game.input.mousePointer.x;
      let yPos = this.game.input.mousePointer.y;
      let xBorder = this.game.config.width / 2 - this.backgroundWidth / 2;
      let yBorder = this.game.config.height / 2 - this.backgroundHeight / 2;
      if (xPos < xBorder || xPos > xBorder + this.backgroundWidth || yPos < yBorder || yPos > yBorder + this.backgroundHeight) {
        minigame_scene_manager.end(key.name);
      }
  });
  }

  update() {}

  /**
   * Stops minigame/scene manager and wakes up mainmenu.
   * Worked on by: Charles
   */
  static end(key) {
    game.scene.wake('playerUI_scene');
    game.scene.wake('gameplay_scene');
    game.scene.stop('minigame_scene_manager');
    game.scene.stop(key);
  }

  /**
   * Minigame is completed, update taskbar. Set map object active state to false.
   * @param {string} key - the name of the scene to end
   * @param {MapObject} interactable - the MapObject to set to inactive
   */
  static minigameWon(key, interactable) {
    // Worked on by: Alexis
    const uiScene = game.scene.getScene('playerUI_scene');
    const gameplay = game.scene.getScene('gameplay_scene');

    uiScene.taskList[interactable.getTaskListId()].setColor('#8D8D8D'); // Fade colour of text in task list.
    game.registry.values.sceneData.serverConnection.taskCompleted(); // God Evano - Update server.
    interactable.setActive(false); // Prevent interactable from being used again.

    if (key === 'trap_making_minigame' && !gameplay.player.hasTrap) {
      gameplay.player.setTrapVariable(true);
    }

    minigame_scene_manager.end(key); // End the minigame scene.
  }

  static setBackground(scene_key, background_key){
    let background = game.scene.getScene(scene_key).add.image(
      game.config.width / 2, 
      game.config.height / 2, 
        background_key
    );
    background.displayWidth = 600;
    background.displayHeight = 450;
    return background;
  }

    // Returns a new array with the inputs array's elements randomized.
    // This method will remove all the elements from the input array.
    static shuffleArray(arr){
      let newArr = [];
      let length = arr.length;
      for(let i = 0; i < length; i++){
        let randNum = Math.floor(Math.random() * arr.length);
        newArr.push(arr.splice(randNum, 1)[0]);
      }
      return newArr;
    }
}