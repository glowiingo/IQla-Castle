// Worked on by: Alexis C. Mendiola

/**
 * Class contains a sprite, x/y coordinates, and information regarding what type of interactable
 * object it is (minigame, iqla, etc.).
 * 
 * NOTE: The taskListId in each MapObject MUST match the order in which they're defined in the
 * playerUI_scene.js' taskList array.
 */
class MapObject extends Phaser.Physics.Arcade.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.sprite);
    this.x = config.x;
    this.y = config.y;
    this.isMinigameObj = config.isMinigameObj;
    this.triggeredScene = config.triggeredScene;
    this.isIqlaInteractable = config.isIqlaInteractable;
    this.taskListId = config.taskId;
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
    if (this.isIqlaInteractable === null) { // If interactable is neutral.
      return true;
    }
    return isIqla && this.isIqlaInteractable || !isIqla && !this.isIqlaInteractable;
  }
  
  /**
   * @return {number} taskListId
   */
  getTaskListId() {
    return this.taskListId;
  }
}