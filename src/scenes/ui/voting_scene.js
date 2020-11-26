// Worked on by: William (Front End)

class voting_scene extends Phaser.Scene {
  constructor() {
    super({
      key: 'voting_scene',
    });
  }

  init() {
    this.players = [];
    this.playerPortraits = [];
  }

  preload() {
    this.load.image(
      'votePortrait',
      '../../assets/votingScene/VotePortrait.png'
    );
    this.load.image('chatButton', '../../assets/votingScene/chatButton.png');
    this.load.image('skip', '../../assets/votingScene/Skip.png');
  }

  create() {
    this.showVote = false;
    this.scene.setVisible(false);
    this.voted = false;
    this.canClick = false;

    this.screenX = this.cameras.main.width;
    this.screenY = this.cameras.main.height;

    // create semi-transparent rectangle
    let rect = new Phaser.Geom.Rectangle(0, 50, this.screenX, this.screenY - 50);
    let g = this.add.graphics()
    g.fillStyle(0x000000, 0.8);
    g.fillRectShape(rect);

    // chat toggle button
    this.chatButton = this.add.sprite(this.screenX - 50, 110, 'chatButton');
    this.chatButton.setInteractive();
    this.chatButton.setScale(0.25);
    this.chatButton.tintFill = false;
    this.chatButton
      .on('pointerdown', () => {
        if (this.canClick) {
          this.scene.get('chat_scene').toggleVisible();
        }
      })
      .on('pointerover', () => this.chatButton.setTint(0x00FF00))
      .on('pointerout', () => this.chatButton.clearTint());
    
    // Display the portraits of the players.
    this.displayPortraits();

    this.skip = this.add.image(this.screenX - 100, 50, 'skip');
    this.skip.setOrigin(0,0);
    this.skip.setScale(0.2);
    this.skip.setInteractive();

    this.skip.on('pointerdown',() => {
      if (this.voted || !this.canClick) {
        return;
      }

      this.vote('skip');
      this.voted = true;
      this.votedText = this.add.text(this.screenX / 12, 50, 'You skipped vote', {
        font: '55px Ariel',
        fill: 'green',
      });
    }); 
    
  } 

  removePlayerById(id) {
    for (let i = 0; i < this.players.length; i++) {
      if (this.players[i].id === id) {
        this.players.splice(i,1);
        break;
      }
    }
    for (let i = 0; i < this.playerPortraits.length; i++) {
      this.playerPortraits[i].destroy();
    }
    this.playerPortraits = [];
    this.displayPortraits();
  }

  displayPortraits() {
    for (let i = 0; i < this.players.length; i++) {
      let yPos =this.screenY / 5;
      let xPos =this.screenX / 5;

      // create portrait objects and draw them
      let portrait;
      if (i < 5) {
        portrait = new Portrait(xPos * i, yPos, 'votePortrait', 
          this.players[i].playerName.substring(0,12), this.players[i].id, this);
        portrait.draw();
      } else {
        portrait = new Portrait(xPos * (i - 5), yPos * 3, 'votePortrait', 
          this.players[i].playerName.substring(0,12), this.players[i].id, this);
        portrait.draw();
      }
      this.playerPortraits.push(portrait);
    }

    for (let i = 0; i < this.playerPortraits.length; i++) {
      this.playerPortraits[i].others = this.playerPortraits;
    }
  }

  vote(votedFor) {
    this.voted = true;
    this.scene.get('gameplay_scene').vote(votedFor);
  }

  /**
   * This function toggles the voting scene on/off on call.
   */
  toggleVisible() {
    if (!this.scene.get('gameplay_scene').gameStart || this.scene.get('gameplay_scene').sceneData.player.alive == false) {
      return;
    }

    // toggle the visibility and ability to click in the voting scene

    this.showVote = !this.showVote;
    if (this.showVote) {
      this.canClick = true;
      this.scene.setVisible(true);
      this.scene.get('gameplay_scene').player.toggleMovementDisabled(); // Disables Movement of player when meeting is called.
      // this.scene.stop('playerUI_scene');
      // this.scene.stop('gameplay_scene');
      this.scene.get('gameplay_scene').player.sendToStartPos(); // is supposed to send all players to spawn.
    } else {
      this.canClick = false;
      this.scene.setVisible(false);
      this.scene.get('chat_scene').hide();
      // this.scene.wake('playerUI_scene');
      // this.scene.wake('gameplay_scene');
      this.scene.get('gameplay_scene').player.toggleMovementDisabled();

      // reset the voting scene when closed
      this.voted = false;
      for (let i = 0; i < this.playerPortraits.length; i++) {
        this.playerPortraits[i].updateColor(mouseStatus.none);
        this.playerPortraits[i].disabled = false;
        if (this.votedText) {
          this.votedText.destroy();
        }
      }
    }
  }
}

// status of mouse relative to portrait
const mouseStatus = {
  hover: 1,
  selected: 2,
  none: 0,
};

class Portrait {
  constructor(x, y, sprite, name, id, game) {
    this.xpos = x;
    this.ypos = y;
    this.id = id;
    this.mouseStatus = mouseStatus.none;
    this.sprite = sprite;
    this.name = name;
    this.spr = game.add.sprite(this.xpos, this.ypos, this.sprite);
    this.nametag = game.add.text(this.xpos, this.ypos + 10, name,{
      fontFamily: 'Ariel',
      fontSize: '22px',
      color: 'green',
      backgroundColor: 'white',
      stroke: 'black',
      strokeThickness: 3,
    });
    this.nametag.setDisplayOrigin(-20, 0);
    this.game = game;
    this.disabled = false;
  }

  destroy() {
    this.spr.destroy();
    this.nametag.destroy();
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

  // Change the colors of the portraits depending on mouse status
  draw() {
    this.spr.setScale(0.9);
    this.spr.setDisplayOrigin(-20, 0);
    this.spr.setInteractive();
    this.spr
      .on('pointerover', () => {
        if (this.disabled || this.game.voted) {
          return;
        }

        if (this.mouseStatus != mouseStatus.selected) {
          this.mouseStatus = mouseStatus.hover;
          this.updateColor(this.mouseStatus);
        }
      })

      .on('pointerdown', () => {
        // conditions that prevent voting
        if (this.disabled || this.game.voted || !this.game.canClick) {
          return;
        }

        this.mouseStatus = mouseStatus.selected;
        this.updateColor(this.mouseStatus);

        for (let i = 0; i < this.others.length; i++) {
          this.others[i].disabled = true;
        }

        this.game.votedText = this.game.add.text(this.game.screenX / 12, 50, 'You voted for ' + this.name.substring(0,12), {
          font: '55px Ariel',
          fill: 'green',
        });
        this.game.vote(this.id);
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
