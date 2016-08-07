import assert from 'assert';

export default class Tester {
  constructor (name) {
    this.name = name;
    this.tests = [];
  }

  addEqualTest (expected, actual, name = 'equal test') {
    let p = new Promise((resolve) => {
      resolve(assert.equal(expected, actual, name));
      this.passMessage(name);
    });
    this.tests.push(p);
  }

  addNotEqualTest (expected, actual, name = 'not equal test') {
    let p = new Promise((resolve) => {
      resolve(assert.notEqual(expected, actual, name));
      this.passMessage(name);
    });
    this.tests.push(p);
  }

  runTests () {
    let testsRun = new Promise((resolve, reject) => {
      if (this.tests.length > 0) {
        Promise.all(this.tests).then(() => {
          Tester.colourConsole('green', `=> All ${this.name} tests passed`);
          resolve(true);
        }).catch(reason => {
          this.failMessage(reason);
          reject(reason);
        });
      } else {
        throw new Error('no tests to run');
      }
    });
    return testsRun;
  }

  static colourConsole (colour, msg, type = 'log') {
    if (type === 'log') {
      console.log('%c%s', `color:${colour}`, msg);
    }
  }

  passMessage (name) {
    this.constructor.colourConsole('green', `=> ok: ${name} passed`);
  }

  failMessage (fail) {
    Tester.colourConsole('red', fail);
  }
}
