import * as Phaser from 'phaser';
import Player from 'player';
// import GameObject from 'gameObject'
import NarrativeText from 'narrativeText';
import Environment from 'environment';
import BackgroundImage from 'background-image';
import { sparks } from '../objects/snippets';

export class Intro extends Phaser.State {

  preload () {
    this.game.stage.backgroundColor = '#262e30';
  }

  create () {
    // narrative text objects
    let timeDelay = 100;
    this.yOffset = 450;
    this.narrText = new NarrativeText(this.game, 0, 0, sparks[0], timeDelay);

    // static objects
    for (let i = 0; i < 5; i++) {
      new BackgroundImage(this.game, 10 + (500 * i), this.yOffset, 'background-1', 0.6);
    }
    this.game.add.sprite(400, 80 + this.yOffset, 'long-building');
    this.zero = this.game.add.sprite(0, this.yOffset * 2, '');
    /*
    this.game.add.sprite(0, 0, 'cafe')

    // mile markers
    this.mileMarkers = [
    new GameObject(this.game, 600, 300, 'red-square'),
    new GameObject(this.game, 1200, 300, 'red-square'),
    new GameObject(this.game, 1800, 300, 'red-square'),
    new GameObject(this.game, 2200, 300, 'red-square'),
    new GameObject(this.game, 2600, 300, 'red-square'),
    new GameObject(this.game, 3000, 300, 'person')
    ]
    */

    // remember to add the player last, so that they are on top of all other objects
    this.player = new Player(this.game, 100, 300 + this.yOffset, 'player');

    // world setup
    this.game.world.setBounds(0, 0, 3500, 900);// 450)

    // add the signals
    /*
    this.mileMarkers.forEach(gameObject => {
    gameObject.signalOnClick.add(this.player.gameObjectSignal, this.player)
    this.player.arrivedAtObject.add(this.player.resumeSignal, this.player)
    })
    */
    this.narrText.onFinished.add(this.player.resumeSignal, this.player);

    this.environment = new Environment(this.game);
    this.environment.addRain();

    // wait, then move the camera
    this.cameraFollowingPlayer = false;
    this.game.time.events.add(Phaser.Timer.SECOND * 3, function () {
      // get the camera to follow the player
      this.player.setupCamera();
    }, this);
  }

  update () {
    // this needs to be encapsulated somehow...
    // perhaps using another object?
    if (this.player.x > 250) {
      if (!this.narrText.started) {
        // this.game.camera.shake(0.005, 2500);
        this.player.stop();
        this.narrText.startCycleSignal();
      }
    }
  }

  render () {
    // show context info, if enabled
    if (this.game.context !== null) {
      this.player.render();
    }
    this.game.debug.cameraInfo(this.game.camera, 10, 32);
  }
}
