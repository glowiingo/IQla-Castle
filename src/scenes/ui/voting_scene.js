// Worked on by: William (Front End)

class voting_scene extends Phaser.Scene {
  constructor() {
    super({
      key: 'voting_scene',
    });
  }

  init() {
    // initialize and prepare data
    // constants, configurations, etc.
  }

  preload() {
    this.load.image(
      'votePortrait',
      '../../assets/votingScene/VotePortrait.png'
    );
  }

  create() {
    // temp voting activation
    let showVote = false;
    this.scene.setVisible(false);
    this.keyPress = this.input.keyboard.addKey('V');
    this.keyPress.on('down', () => {
      showVote = !showVote;
      if (showVote) {
        this.scene.setVisible(true);
      } else {
        this.scene.setVisible(false);

        // reset the voting scene when closed
        this.scene.restart();
      }
    });

    const screenX = this.cameras.main.width;
    const screenY = this.cameras.main.height;
    //=================================================================================
    this.players = Object.keys(this.registry.values.sceneData.otherPlayers) // This array should be the players
    //=================================================================================
    this.playerPortraits = [];
    this.voted = false;

    // Display the portraits of the players.
    for (let i = 0; i < this.players.length; i++) {
      let yPos = screenY / 5;
      let xPos = screenX / 5;

      let portrait;
      if (i < 5) {
        portrait = new Portrait(xPos * i, yPos, 'votePortrait', this);
        portrait.draw();
      } else {
        portrait = new Portrait(xPos * (i - 5), yPos * 3, 'votePortrait', this);
        portrait.draw();
      }
      this.playerPortraits.push(portrait);
    }

    for (let i = 0; i < this.playerPortraits.length; i++) {
      this.playerPortraits[i].others = this.playerPortraits;
    }

    // Get who was voted for.
    this.input.on('pointerdown', () => {
      if (this.voted) {
        return;
      }
      for (let i = 0; i < this.playerPortraits.length; i++) {
        if (this.playerPortraits[i].mouseStatus === mouseStatus.selected) {
          this.voted = true;
          this.add.text(screenX / 12, 50, 'You voted for ' + this.players[i], {
            font: '55px Ariel',
            fill: 'yellow',
          });

          // change who was voted for from string to id
          this.scene.get('gameplay_scene').vote(this.players[i]);
        }
      }
    });
  }
}

const mouseStatus = {
  hover: 1,
  selected: 2,
  none: 0,
};

class Portrait {
  constructor(x, y, sprite, game) {
    this.xpos = x;
    this.ypos = y;
    this.mouseStatus = mouseStatus.none;
    this.sprite = sprite;
    this.spr = game.add.sprite(this.xpos, this.ypos, this.sprite);
    this.game = game;
    this.disabled = false;
  }

  updateColor(ms) {
    switch (ms) {
      case mouseStatus.none:
        this.spr.setTint(0xffffff);
        break;
      case mouseStatus.hover:
        this.spr.setTint(0xffff00);
        break;
      case mouseStatus.selected:
        this.spr.setTint(0xff0000);
        break;
    }
  }

  // Change the colors of the portraits depending on mouse state.
  draw() {
    this.spr.setScale(0.9);
    this.spr.setDisplayOrigin(-20, 0);
    this.spr.setInteractive();
    this.spr
      .on('pointerover', () => {
        if (this.disabled) {
          return;
        }

        if (this.mouseStatus != mouseStatus.selected) {
          this.mouseStatus = mouseStatus.hover;
          this.updateColor(this.mouseStatus);
        }
      })

      .on('pointerdown', () => {
        if (this.disabled) {
          return;
        }

        this.mouseStatus = mouseStatus.selected;
        this.updateColor(this.mouseStatus);

        for (let i = 0; i < this.others.length; i++) {
          this.others[i].disabled = true;
        }
      })

      .on('pointerout', () => {
        if (this.disabled) {
          return;
        }

        if (this.mouseStatus === mouseStatus.hover) {
          this.mouseStatus = mouseStatus.none;
          this.updateColor(this.mouseStatus);
        }
      });
  }
}
