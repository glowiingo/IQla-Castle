// Worked on by: William (Front End)

class chat_scene extends Phaser.Scene {
  constructor() {
    super({
      key: 'chat_scene',
    });
  }

  init() {
    this.showChat = false;
  }

  preload() {}

  create() {
    const screenX = this.cameras.main.width;
    const screenY = this.cameras.main.height;

    this.textbox = document.getElementById('textbox');
    //this.textbox.style.display = 'block';

    this.chatbox = document.getElementById('chatbox');
    //this.chatbox.style.display = 'block';

    // temp scene activation
    this.keyPress = this.input.keyboard.addKey('CTRL');
    this.keyPress.on('down', () => {
      this.toggleVisible();
    });

    // bypass player movement inputs
    window.addEventListener('keydown', function(e) {
      if(e.keyCode === 32) {
        e.preventDefault();
      }
    });

    this.input.keyboard.on('keydown', (event) => {
      if (this.showChat === true) {
        if (event.key.length === 1) {
          document.getElementById('textbox').value += event.key;
        } else if (event.key === 'Backspace') {
          let str = document.getElementById('textbox').value;
          document.getElementById('textbox').value = str.substring(0, str.length - 1);
        } else if (event.key === 'Enter') {
          if (document.getElementById('textbox').value !== '') {
            let name = this.scene.get('gameplay_scene').player.playerName;
          this.scene.get('gameplay_scene').sceneData.serverConnection.sendMessage(name, document.getElementById('textbox').value);
          document.getElementById('textbox').value = '';
          }
        }
      }
    });

  }

  receiveMsg(name, text) {
    this.chatbox.value += name + ': ' + text + '\r\n';
  }



  toggleVisible() {
    this.scene.get('gameplay_scene').player.setVelocityX(0);
    this.scene.get('gameplay_scene').player.setVelocityY(0);
    this.scene.get('gameplay_scene').player.player_walk_anim_stop();
    this.showChat = !this.showChat;
    if (this.showChat) {
      this.scene.setVisible(true);
      this.textbox.style.display = 'block';
      this.chatbox.style.display = 'block';
    } else {
      this.scene.setVisible(false);
      this.textbox.style.display = 'none';
      this.chatbox.style.display = 'none';
    }
  }
}
