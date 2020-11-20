// Worked on by: Gloria Ngo
/**
 * This scene will allow for developers to access their sandbox development scenes.
 */

class mainmenu_scene extends Phaser.Scene {
  constructor() {
    super('mainmenu_scene');
  }

  preload() {
    // Load audio and images into memory.
    this.load.image('goBackImage', '../../assets/go-back-icon.png');
  }

  create() {
    console.log('Main Menu');
    // Worked on by: Alexis
    this.goBackIcon = new ImageButton(
        this,
        5,
        this.cameras.main.height - 5,
        0,
        1,
        'goBackImage',
        () => this.scene.start('title_screen_scene')
    );
    // Use this line to launch minigame in 'overlay'. Replace this.scene.start(SCENE_NAME) in 'pointerdown' events:
    // this.scene.launch('minigame_scene_manager', 'mouse_click_minigame');
    this.add.existing(this.goBackIcon);

    // Worked on by: Evano
    this.sceneData = new SceneData(this.scene.manager.getScene('gameplay_scene'));

    this.gameplay_text = this.add.text(20, 20, 'Gameplay Scene', { font: '25px Arial', fill: 'yellow' });
    
    this.gameplay_text.setInteractive();
    this.gameplay_text.on('pointerdown', () => {
      // Worked on by: Evano
      let r = prompt('Room name?');
      this.serverConnection.setRoom(r);
      this.scene.start('gameplay_scene', {serverConnection: this.serverConnection});
    });

    this.mouse_click_minigame_text = this.add.text(20, 60, 'Mouse Click Minigame', { font: '25px Arial', fill: 'yellow' });

    this.mouse_click_minigame_text.setInteractive();
    this.mouse_click_minigame_text.on('pointerdown', () => {
      this.scene.pause();
      this.scene.launch('minigame_scene_manager', 'mouse_click_minigame');
    });
    
    this.book_click_minigame_text = this.add.text(20, 100, 'Book Click Minigame', { font: '25px Arial', fill: 'yellow' });

    this.book_click_minigame_text.setInteractive();
    this.book_click_minigame_text.on('pointerdown', () => {
      this.scene.pause();
      this.scene.launch('minigame_scene_manager', 'book_click_minigame');
    });

    this.trap_making_minigame_text = this.add.text(20, 140, 'Trap Making Minigame', { font: '25px Arial', fill: 'yellow' });

    this.trap_making_minigame_text.setInteractive();
    this.trap_making_minigame_text.on('pointerdown', () => {
      this.scene.pause();
      this.scene.launch('minigame_scene_manager', {name: 'trap_making_minigame'});
    });

    this.mouse_click_text = this.add.text(20, 180, 'Kill Scene', {font: '25px Arial', fill: 'yellow'});
    
    this.mouse_click_text.setInteractive();
    this.mouse_click_text.on('pointerdown', () => {
        this.scene.start('kill_scene', {message: 'test_data_from_main'});
    });

    this.trap_scene = this.add.text(20, 220, 'Trap Scene', {font: '25px Arial', fill: 'yellow'});

    this.trap_scene.setInteractive();
    this.trap_scene.on('pointerdown', () => {
        this.scene.start('trap_gameplay_scene', {message: 'test_data_from_main'});
    });
  }
}