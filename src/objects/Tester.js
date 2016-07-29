import assert from 'assert'

export default class Tester {
  constructor (name) {
    this.name = name
    this.tests = []
  }

  addEqualTest (expected, actual, name = 'equal test') {
    let p = new Promise((resolve, reject) => {
      resolve(assert.equal(expected, actual, name))
      this.passMessage(name)
    })
    this.tests.push(p)
  }

  addNotEqualTest (expected, actual, name = 'not equal test') {
    let p = new Promise((resolve, reject) => {
      resolve(assert.notEqual(expected, actual, name))
      this.passMessage(name)
    })
    this.tests.push(p)
  }

  runTests () {
    let testsRun = new Promise((resolve, reject) => {
      if (this.tests.length > 0) {
        Promise.all(this.tests).then(value => {
          Tester.colourConsole('green', `=> All ${this.name} tests passed`)
          resolve(true)
        }).catch(reason => {
          this.failMessage(reason)
          reject(reason)
        })
      } else {
        throw new Error('no tests to run')
        reject()
      }
    })
    return testsRun
  }

  static colourConsole (colour, msg, type = 'log') {
    if (type === 'log') {
      console.log('%c%s', `color:${colour}`, msg)
    }
  }

  passMessage (name) {
    this.constructor.colourConsole('green', `=> ok: ${name} passed`)
  }

  failMessage (fail) {
    let msg = `=> fail: ${fail.name} - ${fail.message}\n`
    msg += `=>       expected: ${fail.expected}\n`
    msg += `=>       actual:   ${fail.actual}`
    Tester.colourConsole('red', fail)
  }
}
