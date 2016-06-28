export default class EventPoint {

  constructor(game, x, y, freezePlayer, callback) {
    this.game = game;
    this.freezePlayer = freezePlayer;
    this.size = 100;
    this.rect = new Phaser.Rectangle(x, y, this.size, this.size);
    this.callback = callback
    this.expired = false;
  }

  update(rectangle) {
    if (Phaser.Rectangle.intersects(this.rect, rectangle)) {
      if (!this.expired) {
        this.callback();
        this.expired = true;
        return true;
      }
    } else {
      return false;
    }
  }
}
