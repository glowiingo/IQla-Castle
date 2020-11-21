// Worked on by: Gloria

const config = {
  type: Phaser.AUTO,

  // Following parent and dom setting is to allow adding dom element
  parent: 'container',
  dom: {
    createContainer: true,
  },

  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 800,
    height: 600,
  },
  backgroundColor: '0x000000',
  physics: {
    default: 'arcade',
    arcade: {
      enableBody: true,
      debug: true,
    },
  },
  scene: [preload_scene, gameplay_scene, kill_scene,
    mapOverlay_scene, minigame_scene_manager, mouse_click_minigame, book_click_minigame,
    trap_gameplay_scene, playerUI_scene, title_screen_scene, join_game_scene,
    voting_scene, showPositionPlayer_scene, chat_scene, trap_making_minigame, temp_game_end_scene, endGame_scene]
  // Specify scenes in the array above
};
console.log('game.js with specified config');

const game = new Phaser.Game(config);
