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
    
  }


  clearChat() {
    document.getElementById('chatbox').value = '';
  }

  receiveMsg(name, text) {
    let date = new Date();
    let chat_string = '[' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + '] (';
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
    // stop player from getting stuck in a walk animation
    this.scene.get('gameplay_scene').player.setVelocityX(0);
    this.scene.get('gameplay_scene').player.setVelocityY(0);
    this.scene.get('gameplay_scene').player.playerWalkAnimStop();

    this.showChat = !this.showChat;
    if (this.showChat) {
      this.scene.setVisible(true);
      this.scene.get('gameplay_scene').player.removeCaptures();
      this.textbox.style.display = 'block';
      this.chatbox.style.display = 'block';
    } else {
      this.scene.setVisible(false);
      this.textbox.style.display = 'none';
      this.chatbox.style.display = 'none';
    }
  }
}
