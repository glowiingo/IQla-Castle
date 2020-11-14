// Worked on by: Gloria Ngo

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
    
    this.add.existing(this.goBackIcon);

    this.sceneData = new SceneData(this.scene.manager.getScene('gameplay_scene'));

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
      this.scene.launch('minigame_scene_manager', 'trap_making_minigame');
    });
  }
}