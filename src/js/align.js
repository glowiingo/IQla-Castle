class Align {
    static scaleToGame(object, percent) {
        object.displayWidth = game.config.width * percent;
        object.scaleY = obj.scaleX;
    }
    static centerH (object) {
        object.x = game.config.width / 2 - object.displayWidth / 2;
    }
    static centerV (object) {
        object.y = game.config.height / 2 - object.displayHeight / 2;
    }
    static centerC (object) {
        object.x = game.config.width / 2 - object.displayWidth / 2;
        object.y = game.config.height / 2 - object.displayHeight / 2;
    }
    static center (object) {
        object.x = game.config.width / 2;
        object.y = game.config.height / 2;
    }
}