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
    this.load.image("chatButton", "../../assets/votingScene/chatButton.png");
  }

  create() {
    this.showVote = false;
    this.scene.setVisible(false);

    this.screenX = this.cameras.main.width;
    this.screenY = this.cameras.main.height;

    // temp voting activation, actual voting activation should call toggleVisible
    this.keyPress = this.input.keyboard.addKey('V');
    this.keyPress.on('down', () => {
      this.toggleVisible();
    });


    let rect = new Phaser.Geom.Rectangle(0, 50, this.screenX, this.screenY - 50);
    let g = this.add.graphics()
    g.fillStyle(0x000000, 0.8);
    g.fillRectShape(rect);

    this.chatButton = this.add.sprite(this.screenX - 50, 110, 'chatButton');

    this.chatButton.setInteractive();
    this.chatButton.setScale(0.25);
    this.chatButton.tintFill = false;
    this.chatButton
      .on('pointerdown', () => this.scene.get("chat_scene").toggleVisible())
      .on('pointerover', () => this.chatButton.setTint(0x00FF00))
      .on('pointerout', () => this.chatButton.clearTint());
    
    this.voted = false;

    // Display the portraits of the players.
    this.displayPortraits();
  } 

  displayPortraits() {
    for (let i = 0; i < this.players.length; i++) {
      let yPos =this.screenY / 5;
      let xPos =this.screenX / 5;

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
    this.scene.get('gameplay_scene').vote(votedFor);
  }

  toggleVisible() {
    this.showVote = !this.showVote;
    if (this.showVote) {
      this.scene.setVisible(true);
    } else {
      this.scene.setVisible(false);
      this.scene.get("chat_scene").hide();
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
