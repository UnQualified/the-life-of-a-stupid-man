export default class InputHelper {

  constructor (pollForInput = true) {
    this.controls = { curr: null, prev: null };
    this.clickPressed = false;
    this.pollForInput = pollForInput;
  }

  pollForInput () {
    this.pollForInput = true;
  }

  cancelPollForInput () {
    this.pollForInput = false;
  }

  poll (inputEvent) {
    let retVal = false;
    this.controls.curr = inputEvent;
    if (!this.controls.curr && this.controls.prev) {
      retVal = true;
    }
    this.controls.prev = this.controls.curr;
    return retVal;
  }
}
