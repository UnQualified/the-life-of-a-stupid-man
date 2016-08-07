import * as Phaser from 'phaser';
import InputHelper from './InputHelper';

export default class Player extends Phaser.Sprite {

  constructor (game, x, y, sprite) {
    super(game, x, y, sprite);

    this.anchor.setTo(0.5, 1);
    this.target = { x: x, y: y };
    this.moving = false;
    this.canMove = true;
    this.boundingBox = 2;
    this.speed = 85; // * 4; /* for debug */
    this.context = {
      fromSignal: false,
      engaged: false
    };
    // use the engaged option to stop the player when they reach a game object
    this.isBeingFollowedByCamera = false;

    this.inputHelper = new InputHelper();

    this.arrivedAtObject = new Phaser.Signal();

    // add physics
    this.game.physics.enable(this, Phaser.Physics.ARCADE);

    // animations
    this.animationStarted = false;
    this.animations.add('walk', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
    this.animations.add('still', [0]);
    // .animations.play('walk', 10, true);
    this.smoothed = false;
    let scale = 1.5;
    this.scale = { x: scale, y: scale };

    // add the player
    this.game.add.existing(this);
  }

  update () {
    this.handleInput();
    this.handleMovement();
  }

  handleInput () {
    if (this.inputHelper.poll(this.game.input.mousePointer.isDown)) {
      if (!this.moving && this.canMove) {
        this.moving = true;
        if (!this.context.fromSignal) {
          this.target.x = this.game.input.mousePointer.worldX;
        } else {
          // this.context.fromSignal = false;
        }
      }
    }
  }

  handleMovement () {
    if (this.moving && this.canMove) {
      if (this.x < this.target.x - this.boundingBox) {
        this.body.velocity.x = this.speed;
        // this.animations.play('walk', 10, true);
        this.startAnimation('walk', 10);
        if (this.scale.x < 0) {
          this.scale.x = this.scale.x * -1;
        }
      } else if (this.x > this.target.x + this.boundingBox) {
        this.body.velocity.x = this.speed * -1;
        // this.scale.x = -this.scale.x;
        // this.animations.play('walk', 10, true);
        this.startAnimation('walk', 10);
        if (this.scale.x > 0) {
          this.scale.x = this.scale.x * -1;
        }
      } else {
        this.body.velocity.x = 0;
        this.x = Math.floor(this.x);
        this.moving = false;
        // this.animations.play('still', 1, false);
        // this.frame = 0;
        // this.startAnimation('still', 1, false);
        this.stopAnimation();
        if (this.context.fromSignal) {
          this.context.fromSignal = false;
          this.context.engaged = true;
          this.canMove = false;
          this.arrivedAtObject.dispatch(this);
        }
      }
    }
  }

  startAnimation (anim, speed, loop = true) {
    if (!this.animationStarted) {
      this.animations.play(anim, speed, loop);
      this.animationStarted = true;
    }
  }

  stopAnimation () {
    this.animations.stop();
    this.animationStarted = false;
    this.frame = 0;
  }

  /** stop moving the player */
  stop () {
    this.moving = false;
    this.canMove = false;
    this.body.velocity = { x: 0, y: 0 };
    this.target = { x: this.x, y: this.y };
    this.stopAnimation();
  }

  /** start moving the player */
  start () {
    this.moving = false;
    this.canMove = true;
    console.log('moving again');
  }

  /** this is the signal when a GameObject is clicked */
  gameObjectSignal (gameObject) {
    if (this.x < gameObject.x) {
      this.target.x = gameObject.x - gameObject.width - 20;
    } else {
      this.target.x = gameObject.x + gameObject.width + 20;
    }
    this.context.fromSignal = true;
  }

  /** Method to handle signal when a context menu on a game object is clicked */
  menuClickSignal (menu) {
    console.log('The menu was clicked for the player!', menu);
    this.stop();
    this.game.time.events.add(Phaser.Timer.SECOND * 0.5, this.start, this);
  }

  resumeSignal () {
    this.stop();
    this.start();
  }

  setDeadZone () {
    let zone = {
      x: this.game.width * 0.3,
      y: (this.game.height * 0.3) + this.game.yOffset,
      width: this.game.width * 0.015,
      height: this.game.height * 0.6
    };
    return new Phaser.Rectangle(zone.x, zone.y, zone.width, zone.height);
  }

  setupCamera () {
    this.game.camera.follow(this, Phaser.Camera.FOLLOW_LOCKON, 0.01, 0.01);
    this.isBeingFollowedByCamera = true;
    this.game.camera.deadzone = this.setDeadZone();
  }

  render () {
    // show the camera deadzone
    if (this.isBeingFollowedByCamera) {
      this.game.context.fillStyle = 'rgba(255,0,0,0.6)';
      let zone = this.game.camera.deadzone;
      if (this.game.camera.deadzone !== null) {
        this.game.context.fillRect(zone.x, zone.y, zone.width, zone.height);
      }
    }
  }

}
