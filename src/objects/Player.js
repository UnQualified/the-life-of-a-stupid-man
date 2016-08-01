import * as Phaser from 'phaser'
import InputHelper from './InputHelper'

export default class Player extends Phaser.Sprite {

  constructor (game, x, y, sprite) {
    super(game, x, y, sprite)

    this.anchor.setTo(0.5, 1)
    this.target = { x: x, y: y }
    this.moving = false
    this.canMove = true
    this.boundingBox = 2
    this.speed = 210
    this.context = {
      fromSignal: false,
      engaged: false
    }
    // use the engaged option to stop the player when they reach a game object

    this.inputHelper = new InputHelper()

    this.arrivedAtObject = new Phaser.Signal()

    // add physics
    this.game.physics.enable(this, Phaser.Physics.ARCADE)

    // setup the camera
    this.setupCamera()

    // add the player
    this.game.add.existing(this)
  }

  update () {
    this.handleInput()
    this.handleMovement()
  }

  handleInput () {
    if (this.inputHelper.poll(this.game.input.mousePointer.isDown)) {
      if (!this.moving && this.canMove) {
        this.moving = true
        if (!this.context.fromSignal) {
          this.target.x = this.game.input.mousePointer.worldX
        } else {
          // this.context.fromSignal = false;
        }
      }
    }
  }

  handleMovement () {
    if (this.moving && this.canMove) {
      if (this.x < this.target.x - this.boundingBox) {
        this.body.velocity.x = this.speed
      } else if (this.x > this.target.x + this.boundingBox) {
        this.body.velocity.x = this.speed * -1
      } else {
        this.body.velocity.x = 0
        this.x = Math.floor(this.x)
        this.moving = false
        if (this.context.fromSignal) {
          this.context.fromSignal = false
          this.context.engaged = true
          this.canMove = false
          this.arrivedAtObject.dispatch(this)
        }
      }
    }
  }

  /** stop moving the player */
  stop () {
    this.moving = false
    this.canMove = false
    this.body.velocity = { x: 0, y: 0 }
    this.target = { x: this.x, y: this.y }
  }

  /** start moving the player */
  start () {
    this.moving = false
    this.canMove = true
    console.log('moving again')
  }

  /** this is the signal when a GameObject is clicked */
  gameObjectSignal (gameObject, thing) {
    if (this.x < gameObject.x) {
      this.target.x = gameObject.x - gameObject.width - 20
    } else {
      this.target.x = gameObject.x + gameObject.width + 20
    }
    this.context.fromSignal = true
  }

  /** Method to handle signal when a context menu on a game object is clicked */
  menuClickSignal (menu) {
    console.log('The menu was clicked for the player!')
    this.stop()
    this.game.time.events.add(Phaser.Timer.SECOND * 0.5, this.start, this)
  }

  resumeSignal () {
    this.stop()
    this.start()
  }

  setupCamera () {
    // camera setup
    let zone = {
      x: (this.game.width * 0.25) - (this.game.width * 0.05),
      y: this.game.height * 0.3,
      width: this.game.width * 0.3,
      height: this.game.height * 0.5
    }
    this.game.camera.follow(this)
    this.game.camera.deadzone = new Phaser.Rectangle(zone.x, zone.y, zone.width, zone.height)
  }

  render () {
    // show the camera deadzone
    let zone = this.game.camera.deadzone
    this.game.context.fillStyle = 'rgba(255,0,0,0.6)'
    this.game.context.fillRect(zone.x, zone.y, zone.width, zone.height)
  }

}
