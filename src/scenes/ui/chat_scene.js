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
    this.chatbox = document.getElementById('chatbox');

    // prevent spacebar default functionality
    this.input.keyboard.addKey('SPACE', false, false);

    this.input.keyboard.addKey('ENTER', false, false).on('down', () => {
      if (this.textbox.value !== '') {
        let name = this.scene.get('gameplay_scene').player.playerName;
        this.scene.get('gameplay_scene').sceneData.serverConnection.sendMessage(name, this.textbox.value);
        this.textbox.value = '';
      }
    });
    
    // bypass player movement inputs
      // disable player movement keys

    // this.input.keyboard.on('keydown', (event) => {
    //   if (this.showChat === true) {
    //     console.log(document.getElementById('textbox').focus())
    //     // if (event.key.length === 1) {
    //     //   document.getElementById('textbox').value += event.key;
    //     // } else if (event.key === 'Backspace') {
    //     //   let str = document.getElementById('textbox').value;
    //     //   document.getElementById('textbox').value = str.substring(0, str.length - 1);
    //     // } else if (event.key === 'Enter') {
    
    //     // }
    //   }
    // }, true, false);
  }


  clearChat() {
    document.getElementById('chatbox').value = '';
  }

  receiveMsg(name, text) {
    let date = new Date();
    let chat_string = "[" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + "] (";
    chat_string += name + '): ' + text + '\r\n';
    this.chatbox.value += chat_string;
  }

  hide() {
    this.showChat = false;
    this.scene.setVisible(false);
    this.textbox.style.display = 'none';
    this.chatbox.style.display = 'none';
  }

  toggleVisible() {
    this.scene.get('gameplay_scene').player.removeCaptures();
    // stop player from getting stuck in a walk animation
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
