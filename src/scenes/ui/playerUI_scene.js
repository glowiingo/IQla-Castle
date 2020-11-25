// Worked on by: William, Alexis
// Worked on by: Bisht, Brian, Kian
// Worked on by: Lewis

class playerUI_scene extends Phaser.Scene {
  constructor() {
    super({
      key: 'playerUI_scene',
    });
  }

  preload() {
    this.load.image('reportBtn', '../../assets/reportButton.png');
    this.load.image('useBtn', '../../assets/useButton.png');
    this.load.image('killBtn', '../../assets/killButton.png');
    this.load.image('mapBtn', '../../assets/mapButton.png');
    this.load.image('TaskBar', '../../assets/TaskBar.png');
    this.load.image('BackBar', '../../assets/BackBar.png');
    this.load.image('startGame', '../../assets/StartGame.png');
  }

  create() {
    this.startBtn = new gameplayButton({
      scene: this,
      x: game.config.width - 100,
      y: game.config.height - 100,
      texture: 'startGame',
    });

    this.isStartGame = false;
    //Worked on by Brian
    this.bBar = this.add
      .sprite(game.config.width - 504, 0, 'BackBar')
      .setOrigin(0, 0);
    this.tBar = this.add
      .sprite(game.config.width - 504, 0, 'TaskBar')
      .setOrigin(0, 0);
    this.fill = 0;
    this.setBar(0);

    this.startBtn
      .on('pointerdown', () =>
        this.registry.values.sceneData.alertGameStart()
      );
    window.addEventListener('resize', () => {
      this.resize();
    });

    this.taskStringArr = [
      'Clean the bathroom',
      'Stand in the storage room for 10 seconds',
      'Do the dishes in the kitchen',
      'Close the closet door',
    ];

    this.btnOriginScale = 0.35;
    this.btnHoverScale = 0.4;
    this.mapOverlayDisplayed = false;

    // What is this for??
    this.timedEvent;

    // When window is resized, fix things
    window.addEventListener('resize', () => {
      this.resize();
    });
  }

  /**
   * called by scene_data after server returned start game data
   */
  startGame(role) {
    this.startBtn.destroy();
    this.isIqla = role;

    if (this.isIqla) {
      this.canKill = true;
      this.renderKillerUI();
    } else {
      this.renderDetectiveUI();
    }

    this.renderTaskList(this.taskStringArr);

    // Domo for how to show task complete.
    this.taskList[1].setColor('#8D8D8D');
    this.taskList[3].setColor('#8D8D8D');
  }

  renderTaskList(arr) {
    const taskListBoxX = 0;
    const taskListBoxY = 30;
    const taskListBoxWidth = 180;
    const taskListBoxHeight = 300;

    this.taskListBox = this.add
      .rectangle(
        taskListBoxX,
        taskListBoxY,
        taskListBoxWidth,
        taskListBoxHeight,
        0x393f4a,
        0.7
      )
      .setOrigin(0, 0);

    console.log(this.taskListBox.x, this.taskListBox.y);

    this.taskList = [];
    let x = taskListBoxX + 20;
    let y = taskListBoxY + 20;
    const style = {
      font: '13px'
    };

    for (let i = 0; i < arr.length; i++) {
      this.taskList[i] = this.add
          .text(x, y, arr[i], style)
          .setOrigin(0, 0);

      this.taskList[i].wordWrap = true;
      this.taskList[i].setWordWrapWidth(taskListBoxWidth * 0.9);

      y += this.taskList[i].height + 10;
    }
  }

  /**
   * Renders the following object
   * - Report Button
   * - Use Button
   * - Map Button
   */
  renderDetectiveUI() {
    const screenX = this.cameras.main.width;
    const screenY = this.cameras.main.height;

    this.rptButtonX = screenX - 80;
    this.rptButtonY = screenY - 80;
    this.useButtonX = screenX - 80;
    this.useButtonY = screenY - 200;
    this.mapButtonX = screenX - 80;
    this.mapButtonY = screenY - 280;

    this.rptButton = new gameplayButton({
      scene: this,
      x: this.rptButtonX,
      y: this.rptButtonY,
      texture: 'reportBtn',
    });

    this.useButton = new gameplayButton({
      scene: this,
      x: this.useButtonX,
      y: this.useButtonY,
      texture: 'useBtn',
    });

    this.mapButton = new gameplayButton({
      scene: this,
      x: this.mapButtonX,
      y: this.mapButtonY,
      texture: 'mapBtn',
    });

    this.rptButton.on('pointerdown', () => this.report());
    this.useButton.on('pointerdown', () => this.use());
    this.mapButton.on('pointerdown', () => this.showMap());
  }



  /**
   * Renders the kill button object then calls renderDetectiveUI()
   */
  renderKillerUI() {
    this.killButtonX = 80;
    this.killButtonY = this.cameras.main.height - 80;

    this.killButton = new gameplayButton(
      {
        scene: this,
        x: this.killButtonX,
        y: this.killButtonY,
        texture: 'killBtn',
      },
      10000
    );

    this.killButton.on('pointerdown', () => this.kill());

    this.renderDetectiveUI();
  }

  enablePress() {
    this.killButton.setTint(0xffffff);
    this.canKill = true;
  }

  kill() {
    
    // this.killButton.setTint(0x2b2a2a);
    // this.time.delayedCall(2000, this.enablePress, [], this);
    this.canKill = false;

    let gameplay = this.scene.get('gameplay_scene');
    gameplay.player.kill(gameplay.otherPlayers.getChildren());
    this.registry.values.sceneData.serverConnection.taskCompleted();
  }

  use() {
    // Worked on by: Alexis
    console.log('use');
    let gameplay = this.scene.get('gameplay_scene');
    let interactable = gameplay.player.interact(gameplay.interactables.getChildren());

    if (interactable) {
        gameplay.triggerScene('playerUI_scene', interactable.getLaunchKey(), interactable.getLaunchData());
    }
  }
   
  report() {
    //worked on by Mike
    let gameplay = this.scene.get('gameplay_scene');
    gameplay.player.report();
  }

  showMap() {
    const mapOverlay = this.scene.get('mapOverlay_scene');
    const dotOverlay = this.scene.get('showPositionPlayer_scene');

    if (this.mapOverlayDisplayed) {
      this.mapOverlayDisplayed = false;
      mapOverlay.mapHide();
      dotOverlay.dotHide();
    } else {
      this.mapOverlayDisplayed = true;
      mapOverlay.mapShow();
      dotOverlay.dotShow();
    }
  }

  resize() {
    //this.titleText.setPosition(document.body.offsetWidth / 2 - 300, 80);

    if (this.isStartGame) {
      this.rptButton.setPosition(this.rptButtonX, this.rptButtonY);
      this.useButton.setPosition(this.useButtonX, this.useButtonY);
      this.killButton.setPosition(this.killButtonX, this.killButtonY);
      this.mapButton.setPosition(this.mapButtonX, this.mapButtonY);
    } else {
      this.startBtn.setPosition(
        this.cameras.main.width - 100,
        this.cameras.main.height - 100
      );
    }
  }

  /*Sets the crop of the top task bar to display current progress by adding an amount to the crop
	Worked on by : Brian
   */
  setBar(perc) {
    this.fill += perc;
    this.tBar.setCrop(0, 0, this.fill, 84);
  }
}
