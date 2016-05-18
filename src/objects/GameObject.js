export default class GameObject extends Phaser.Sprite {

  constructor(game, x, y, key, selectable) {
    super(game, x, y, key);
    this.anchor.set(0.5);

    this.selectable = selectable;
    if (true === this.selectable) {
      this.inputEnabled = true;
      this.tintColour = Math.random() * 0xffffff;
      this.mouseDown = false;

      this.text = this.game.add.text(
        this.x, this.y,
        'Object',
        { fill: '#f00', align: 'center' }
      );
      this.text.visible = false;

      this.senderSignal = new Phaser.Signal();
      this.senderSignal.add(function() {
        // signal from object
      }, this);
    }
  }

  update() {
    if (true === this.selectable)
      this.handleSelectable();
  }

  handleSelectable() {
    if (this.input.pointerOver()) {
      this.tint = this.tintColour;
      this.text.visible = true;
    }
    else {
      this.tint = 0xffffff;
      this.text.visible = false;
    }

    if (this.input.pointerDown()) {
      if (undefined !== this.signal) {
        if (!this.mouseDown) {
          this.signal.dispatch(this);
          this.mouseDown = true;
        }
      }
    }

    if (this.input.pointerUp()) {
      this.mouseDown = false;
    }
  }

  addSignal(signal) {
    this.signal = signal;
  }

  addPhysics(spec) {

    if (undefined === spec)
      return;

    this.game.physics.arcade.enable([this]);

    if (undefined !== spec.collideWorldBounds)
      this.body.collideWorldBounds = spec.collideWorldBounds;

    if (undefined !== spec.immovable)
      this.body.immovable = spec.immovable;

    if (undefined !== spec.allowGravity)
      this.body.allowGravity = spec.allowGravity;
  }
}
