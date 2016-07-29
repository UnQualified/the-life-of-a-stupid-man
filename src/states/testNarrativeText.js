import * as Phaser from 'phaser'
import NarrativeText from '../objects/NarrativeText'
import assert from 'assert'
import Tester from '../objects/Tester'

export class TestNarrativeText extends Phaser.State {
  preload () {
    this.game.stage.backgroundColor = '#4488AA'

    // create the objects
    this.intro = [
      'The wonder of the world.',
      'The beauty and the power.',
      'The colours, light and shade.',
      'These I saw.',
      'Look ye also,',
      'While life lasts'
    ]
    this.narrText = new NarrativeText(this.game, 0, 0, this.intro, 1000, () => {
      console.log('callback!!')
    })

    // run all the tests
    this.testSetupText().then(value => {
      Tester.colourConsole('green', 'Yay! NarrativeText is all good! \ud83d\ude01')
      // go to the next state, after all the tests have passed
      // this.game.state.start('testPlayer');
    }).catch(reason => {
      Tester.colourConsole('red', `Boo! NarrativeText is not good: ${reason}`)
    })
  }

  update () {
    if (!this.narrText.started) {
      this.narrText.startCycle().then(value => {
        Tester.colourConsole('yellow', '=> Finished startCycle... Starting testPlayer state')
        this.game.state.start('testPlayer')
      }).catch(reason => {
        Tester.colourConsole('red', '=> Could not finish startCycle... Not moving to new state')
        throw new Error('startCycle error')
      })
    }
    // console.log(this.narrText.onFinished);
  }

  /** test setupText */
  testSetupText () {

    let testSetupText = new Tester('setupText')

    /** Check the initialisation is ok... */
    testSetupText.addEqualTest(
      this.narrText.text.length,
      this.intro.length,
      'narrativeText.object is same length as text array'
    )

    this.narrText.text.forEach((item, index) => {
      testSetupText.addEqualTest(
        typeof item,
        'object',
        'NarrativeText.text is an array of objects'
      )
      testSetupText.addEqualTest(
        item.ogText,
        this.intro[index],
        'NarrativeText.text.ogText matches the string from the original array'
      )
      testSetupText.addNotEqualTest(
        item.phaserText,
        undefined,
        'NarrativeText.text.phaserText is not undefined'
      )
    })

    return testSetupText.runTests()
  }
}
