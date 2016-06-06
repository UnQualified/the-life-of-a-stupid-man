import InputHelper from './InputHelper';
import NarrativeText from './NarrativeText';

export default class Player extends Phaser.Sprite {

  constructor(game, x, y) {
    super(game, x, y, 'red-square');

    this.anchor.set(0.5);

    // objects to control mouse input
    this.controls = { curr: null, prev: null };
    this.target = { x: 0, y: 0 };
    this.clickPressed = false;
    this.boundingBox = 2;

    // flag to determine whether player can change direction mid-movement
    this.waitForStopToMoveAgain = true;

    // flag that indicates whether the player is moving towards an object
    this.movingTowardsObject = false;

    // the object recieved from selected object signal
    this.selectedObject = null;

    // player state
    this.states = {
      normal: 'normal',
      context: 'context'
    };
    this.state = this.states.normal;

    this.inputHelper = new InputHelper();
  }

  update() {

    // check for mouse input
    if (this.state === this.states.normal)
      this.handleInput();

    this.handleMovement();

    // check to see if the player can be unfrozen
    if (this.state === this.states.context) {
      if (this.selectedObject.narrativeText.finished) {
        this.state = this.states.normal;
        this.selectedObject.narrativeText.reset();
      }
    }
  }

  // handle player input, set variables as necessary.
  // move normally unless target is actually a selectableObject that
  // has been clicked
  handleInput() {
    let inputChecker = this.inputHelper.poll(this.game.input.mousePointer.isDown);
    if (inputChecker) {
      if (this.waitForStopToMoveAgain) {
        if (!this.clickPressed) {
          this.clickPressed = true;
          if (!this.recievedFromSignal)
            this.target.x = this.game.input.mousePointer.x;
          else
            this.recievedFromSignal = false;
        }
      }
      else {
        this.clickPressed = true;
        if (!this.recievedFromSignal)
          this.target.x = this.game.input.mousePointer.x;
        else
          this.recievedFromSignal = false;
      }
    }
  }

  handleMovement() {
    // move the player, if correct conditions are met
    if (this.clickPressed) {
      if (this.x < this.target.x - this.boundingBox) {
        this.x += 2;
      }
      else if (this.x > this.target.x + this.boundingBox) {
        this.x -= 2;
      }
      else {
        this.x = Math.floor(this.x);
        this.clickPressed = false;
      }

      // if moving towards a selectable object, send signal when there
      if (this.movingTowardsObject) {
        if (!this.isMoving()) {
          this.movingTowardsObject = false;
          this.state = this.states.context;
          this.selectedObject.senderSignal.dispatch('from player');
        }
      }
    }
  }

  // function to bind signal to a selectable gameObject
  selectableObjectSignal() {
    let signal = new Phaser.Signal();
    signal.add(function() {
      this.recievedFromSignal = true;
      let target = arguments[0];
      this.selectedObject = target;
      if (this.x < target.x) {
        this.target.x = target.x - target.width * 4;
        this.movingTowardsObject = true;
      }
      else {
        this.target.x = target.x + target.width * 4;
        this.movingTowardsObject = true;
      }
    }, this);
    return signal;
  }

  // check whether the player is actually moving at a
  // given moment in time
  isMoving() {
    let isMoving = false;
    this.currLoc = this.x;
    if (this.currLoc !== this.prevLoc) {
      isMoving = true;
    }
    this.prevLoc = this.currLoc;
    return isMoving;
  }

}
