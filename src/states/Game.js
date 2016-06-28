/*
 * Game state
 * ==========
 *
 * A sample Game state, displaying the Phaser logo.
 */

//import Logo from '../objects/Logo';
import Player from '../objects/Player';
import GameObject from '../objects/GameObject';
import SelectableGameObject from '../objects/SelectableGameObject';
import NarrativeText from '../objects/NarrativeText';
import EventPoint from '../objects/EventPoint';
import { text } from '../objects/textTrees';

export default class Game extends Phaser.State {

  create() {

    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = 200;

    this.player = new Player(this.game, 200, 425);

    this.cafe = new GameObject(this.game, 200, 230, 'cafe');

    this.eventPoint = new EventPoint(this.game, 550, 425, false, () => {
      this.player.stop();
      console.log('Right... Now what?');
      this.game.time.events.add(Phaser.Timer.SECOND * 2, () => {
        console.log('O_o');
        this.player.state = this.player.states.normal;
      });
    });

    this.game.world.setBounds(0, 0, 1920, 3000);
    this.game.camera.follow(this.player);
    this.game.camera.deadzone = new Phaser.Rectangle(450, 390, 145, 60);

    this.add.existing(this.player);
    this.add.existing(this.cafe);
  }

  update() {
    this.eventPoint.update(this.player.getRectangle());
  }

}
