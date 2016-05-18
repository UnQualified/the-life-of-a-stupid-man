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

export default class Game extends Phaser.State {

  create() {
    // TODO: Replace this with really cool game code here :)

    //const {centerX: x, centerY: y} = this.world;
    //this.add.existing(new Logo(this.game, x, y));

    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = 200;

    this.player = new Player(this.game, 200, 400);

    this.table = new GameObject(this.game, 600, 400, 'table');
    this.vase = new SelectableGameObject(this.game, 600, 300, 'vase');//, true);

    this.game.physics.arcade.enable([this.table, this.vase]);

    this.table.addPhysics({
      collideWorldBounds: true,
      allowGravity: false,
      immovable: true
    });
    this.vase.addPhysics({
      collideWorldBounds: true,
      allowGravity: true
    });

    this.vase.addSignal(this.player.selectableObjectSignal());

    this.add.existing(this.player);
    this.add.existing(this.table);
    this.add.existing(this.vase);

  }

  update() {
    this.game.physics.arcade.collide(this.table, this.vase);
  }

}
