import * as Phaser from 'phaser';

export class Load extends Phaser.State {
  preload () {
    let textStyle = {font: '45px Arial', alight: 'center', stroke: 'blue', fill: 'blue'};
    this.game.add.text(80, 150, 'loading...', textStyle);

    // load assets
    this.game.load.image('red-square', 'assets/images/red-square.png');
    this.game.load.image('person', 'assets/images/person.png');
    this.game.load.image('cafe', 'assets/images/cafe.png');
    this.game.load.image('long-building', 'assets/images/long-building.png');

    this.game.load.spritesheet('player', 'assets/spritesheets/stupid-man.png', 65, 94, 12);

    this.test = false;
  }

  create () {
    if (this.test) {
      // this.game.state.start('testNarrativeText')
      this.game.state.start('testContextMenu');
    } else {
      this.game.state.start('intro');
    }
  }
}
