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
import { text } from '../objects/textTrees';

export default class Game extends Phaser.State {

  create() {
    // TODO: Replace this with really cool game code here :)

    //const {centerX: x, centerY: y} = this.world;
    //this.add.existing(new Logo(this.game, x, y));

    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = 200;

    this.player = new Player(this.game, 200, 425);

    this.table = new GameObject(this.game, 600, 400, 'table');
    this.vase = new SelectableGameObject(this.game, 600, 300, 'vase', text.sceneOne._1);//, true);
    this.vase2 = new SelectableGameObject(this.game, 100, 300, 'vase', ['__one__', '__two__']);

    this.cafe = new GameObject(this.game, 200, 230, 'cafe');

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
    this.vase2.addSignal(this.player.selectableObjectSignal());

    let messageOptions = ['hello?', 'who is there?'];
    this.menu = new NarrativeText(this.game, 100, 100, messageOptions);
    this.menu.text.visible = true;

    this.game.world.setBounds(0, 0, 1920, 3000);
    this.game.camera.follow(this.player);
    this.game.camera.deadzone = new Phaser.Rectangle(450, 390, 145, 60);

    this.add.existing(this.player);
    this.add.existing(this.cafe);
    this.add.existing(this.table);
    this.add.existing(this.vase);
    this.add.existing(this.vase2);

  }

  update() {
    this.game.physics.arcade.collide(this.table, this.vase);

    this.menu.update();
  }

}
