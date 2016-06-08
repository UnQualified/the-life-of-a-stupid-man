# 8. Sparks: Flowers of Fire

## Objects

`Player`: adds a player to the state.

```js
this.player = new Player(this.game, x, y);
```

`GameObject`: adds a standard game object to the scene. Not interactive.
`SelectableGameObject`: a game object that a player can interact with

```js
this.boringObject = new GameObject(this.game, x, y, 'spriteKey');
this.interestingObject = new SelectableGameObject(this.game, x, y, spriteKey, ['sentences']);
```

To add physics to both types of game objects, you need to enable them in the physics engine, *and* in the instance itself.

```js
this.game.physics.arcade.enable([this.boringObject, this.interestingObject]);

this.boringObject.addPhysics({
  collideWorldBounds: true,
  allowGravity: false,
  immovable: true
});

this.interestingObject.addPhysics({
  collideWorldBounds: true,
  allowGravity: true
});
```

You can also add a `Phaser.Signal` that is attached to the player:

```js
this.interestingObject.addSignal(this.player.selectableObjectSignal());
```

All custom objects need to be added:

```js
this.add.existing(this.player);
this.add.existing(this.boringObject);
this.add.existing(this.interestingObject);
```

---

## Yeoman instructions

Congrats! To start developing you new game right away, type the following command in a terminal:

_Tip: you can also use Gulp to manage development tasks._

```sh
npm start     # Also `gulp`: launches the project development environment.
```

The following npm scripts are also available:

```sh
npm run dist  # Or `gulp dist`: Prepares the game for distribution.
npm run clean # Or `gulp dist:clean`: Deletes build files.
```

Should you consider distributing your game as an open source project, please [include a LICENSE file](http://choosealicense.com/) in your project root.
