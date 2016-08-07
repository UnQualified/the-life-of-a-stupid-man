import * as Phaser from 'phaser';
import { Load } from './states/load';
import { Intro } from './states/intro';
import { TestNarrativeText } from './states/test/testNarrativeText';
import { TestPlayer } from './states/test/testPlayer';
import { TestContextMenu } from './states/test/testContextMenu';

export class Game extends Phaser.Game {
  constructor () {
    super(800, 450, Phaser.AUTO, 'game-canvas', null);
    this.state.add('load', Load);
    this.state.add('intro', Intro);

    // test states
    this.state.add('testNarrativeText', TestNarrativeText);
    this.state.add('testPlayer', TestPlayer);
    this.state.add('testContextMenu', TestContextMenu);

    this.state.start('load');
  }

}
