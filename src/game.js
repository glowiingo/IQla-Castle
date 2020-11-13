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
    height: 600
  },
  backgroundColor: "0x000000",
  physics: {
    default: 'arcade',
    arcade: {
      enableBody: true,
      debug: true,
    }
  },
  scene: [preload_scene, temp_menu_scene, mainmenu_scene, gameplay_scene, kill_scene,
    mapOverlay_scene, showPositionPlayer_scene, minigame_scene_manager, mouse_click_minigame, book_click_minigame,
    trap_gameplay_scene, playerUI_scene, voting_scene, title_screen_scene, create_game_scene, join_game_scene]
  // Specify scenes in the array above
}
console.log("game.js with specified config");

const game = new Phaser.Game(config);
