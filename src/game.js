import * as Phaser from 'phaser'
import { Load } from './states/load'
import { TestNarrativeText } from './states/test/testNarrativeText'
import { TestPlayer } from './states/test/testPlayer'
import { TestContextMenu } from './states/test/testContextMenu'

export class Game extends Phaser.Game {
  constructor () {
    super(800, 450, Phaser.AUTO, 'game-canvas', null)
    this.state.add('load', Load)

    // test states
    this.state.add('testNarrativeText', TestNarrativeText)
    this.state.add('testPlayer', TestPlayer)
    this.state.add('testContextMenu', TestContextMenu)

    this.state.start('load')
  }

}
