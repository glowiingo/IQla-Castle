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
    //Add two sprites in the same location in the top right of the screen.
    // instantiate a progress bar in the top right corner of game screen, similar to the kill button
    // note: add ProgressBar.increase(1) into each mini-game
    // this.progressBar = this.add.sprite(0, 0, 'progress');
    this.bBar = this.add
      .sprite(game.config.width - 504, 0, 'BackBar')
      .setOrigin(0, 0);
    this.tBar = this.add
      .sprite(game.config.width - 504, 0, 'TaskBar')
      .setOrigin(0, 0);
    //The bar starts empty at the beginning fo the game.
    this.fill = 0;
    //Init the empty crop.
    
    //this.txt = this.add.text((game.config.width - 200), 10, 'Tasks');
    //this.txt.setColor('#000000');
    //this.txt.setFontSize(40);
    //this.tBar.flipX = true;
    //The bar ranges from 0-504 set bar adds an amount to it
    this.setBar(0);

    this.startBtn
      .on('pointerdown', () =>
        this.registry.values.sceneData.alertGameStart()
      );
    window.addEventListener('resize', () => {
      this.resize();
    });

    this.detectiveTasks = [
      {
        id: 0,
        desc: 'Exterminate mice in the garage',
      },
      {
        id: 1,
        desc: 'Research ways to beat the IQLa in the Study',
      },
      {
        id: 2,
        desc: 'Exterminate mice in the kitchen',
      },
      {
        id: 3,
        desc: 'MORE research with books in the Storage room'
      }
    ];

    this.iqlaTasks = [
      {
        id: 0,
        desc: 'Exterminate mice in the garage',
      },
      {
        id: 1,
        desc: 'Go to the study and create a deadly trap',
      },
      {
        id: 2,
        desc: 'Exterminate mice in the kitchen',
      }
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

    this.renderTaskList((this.isIqla) ? this.iqlaTasks : this.detectiveTasks);
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
          .text(x, y, arr[i].desc, style)
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
  }

  /**
   * Called when the "Use" button is pressed on the PlayerUI_Scene.
   * Get a group of interactable MapObjects from the gameplay scene,
   * interact with the one closest to the player, and then trigger the 
   * corresponding scene.
   */
  use() {
    // Worked on by: Alexis
    let gameplay = this.scene.get('gameplay_scene');
    let interactable = gameplay.player.interact(gameplay.interactables.getChildren());

    if (interactable) {
      gameplay.triggerScene('playerUI_scene', interactable.getLaunchKey(), {
        name: interactable.getLaunchData(),
        interactable: interactable
      });
    }
  }
  
  report() {
    //worked on by Mike and Evano
    let gameplay = this.scene.get('gameplay_scene');
    if(gameplay.player.report()){
      this.registry.values.sceneData.serverConnection.callVote();
    }
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

  /**
   * Adds an amount to the bars value then crops the top image appropriately. 
   * @param perc An amount to add to the bars value of 0-504, can be negative to lower the bar. 
   */
  setBar(perc) {
    this.fill += perc;
    this.tBar.setCrop(0, 0, this.fill, 84);
  }
}
