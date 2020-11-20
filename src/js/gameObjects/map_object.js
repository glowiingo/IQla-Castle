// Worked on by: Alexis

class MapObject extends Phaser.Physics.Arcade.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.sprite);
    this.x = config.x;
    this.y = config.y;
    this.isMinigameObj = config.isMinigameObj;
    this.triggeredScene = config.triggeredScene;
    this.isIqlaInteractable = config.isIqlaInteractable;
  }

  /**
   * Return the name of the scene to launch.
   */
  getLaunchKey() {
    return (this.isMinigameObj) ? 'minigame_scene_manager' : this.triggeredScene;
  }

  /**
   * Return the name of the minigame scene to launch with minigame_scene_manager, or null.
   */
  getLaunchData() {
    return (this.isMinigameObj) ? this.triggeredScene : null;
  }

  /**
   * Return true if player type and interactable type match.
   * @param {boolean} isIqla 
   */
  canInteract(isIqla) {
    return isIqla && this.isIqlaInteractable || !isIqla && !this.isIqlaInteractable;
  }
}