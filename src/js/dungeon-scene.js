import Player from "./player.js";
import { getRoomType } from "./nlp.js";
import TilemapVisibility from "./tilemap-visibility.js";
import TILES from "./tile-mappings/index.js";
/**
 * Scene that generates a new dungeon
 */
// @ts-ignore
export default class DungeonScene extends Phaser.Scene {
  constructor() {
    super({});
    this.level = 0;
  }

  init(data) {
    this.activeMapName = data.activeTileMap ? data.activeTileMap : "atlantis";
    this.ACTIVE_TILES = TILES[this.activeMapName];
    if (data.level) this.level = data.level;
  }

  preload() {
    // @ts-ignore
    this.load.image(
      "ruineddungeons",
      "https://world-of-wordcraft.s3.us-east-2.amazonaws.com/dist/assets/tilesets/ruineddungeons.png"
    );
    // @ts-ignore
    this.load.image(
      "clouds",
      "https://world-of-wordcraft.s3.us-east-2.amazonaws.com/dist/assets/tilesets/clouds.png"
    );
    // @ts-ignore
    this.load.image(
      "darkdimension",
      "https://world-of-wordcraft.s3.us-east-2.amazonaws.com/dist/assets/tilesets/darkdimension.png"
    );

    // @ts-ignore
    this.load.spritesheet(
      "character_2",
      "https://world-of-wordcraft.s3.us-east-2.amazonaws.com/dist/assets/spritesheets/character_2.png",
      {
        frameWidth: 26,
        frameHeight: 36,
      }
    );
  }

  create() {
    this.level++;
    this.hasPlayerReachedStairs = false;

    // Generate a random world with a few extra options:
    //  - Rooms should only have odd number dimensions so that they have a center tile.
    //  - Doors should be at least 2 tiles away from corners, so that we can place a corner tile on
    //    either side of the door location
    // @ts-ignore
    this.dungeon = new Dungeon({
      width: 50,
      height: 50,
      doorPadding: 2,
      rooms: {
        width: { min: 7, max: 15, onlyOdd: true },
        height: { min: 7, max: 15, onlyOdd: true },
        maxRooms: 12,
      },
    });

    this.dungeon.drawToConsole();

    // Creating a blank tilemap with dimensions matching the dungeon
    // @ts-ignore
    const map = this.make.tilemap({
      tileWidth: 80,
      tileHeight: 80,
      width: this.dungeon.width,
      height: this.dungeon.height,
    });
    const tileset = map.addTilesetImage(this.ACTIVE_TILES.IMAGE, null, 16, 16);
    this.groundLayer = map.createBlankLayer("Ground", tileset).fill(this.ACTIVE_TILES.BLANK);
    this.stuffLayer = map.createBlankLayer("Stuff", tileset);
    const shadowLayer = map.createBlankLayer("Shadow", tileset).fill(this.ACTIVE_TILES.BLANK);

    this.tilemapVisibility = new TilemapVisibility(shadowLayer);

    // Use the array of rooms generated to place tiles in the map
    // Note: using an arrow function here so that "this" still refers to our scene
    this.dungeon.rooms.forEach((room) => {
      const { x, y, width, height, left, right, top, bottom } = room;

      // Fill the floor with mostly clean tiles
      this.groundLayer.weightedRandomize(
        this.ACTIVE_TILES.FLOOR,
        x + 1,
        y + 1,
        width - 2,
        height - 2
      );

      // Place the room corners tiles
      this.groundLayer.putTileAt(this.ACTIVE_TILES.WALL.TOP_LEFT, left, top);
      this.groundLayer.putTileAt(this.ACTIVE_TILES.WALL.TOP_RIGHT, right, top);
      this.groundLayer.putTileAt(this.ACTIVE_TILES.WALL.BOTTOM_RIGHT, right, bottom);
      this.groundLayer.putTileAt(this.ACTIVE_TILES.WALL.BOTTOM_LEFT, left, bottom);

      // Fill the walls with mostly clean tiles
      this.groundLayer.weightedRandomize(this.ACTIVE_TILES.WALL.TOP, left + 1, top, width - 2, 1);
      this.groundLayer.weightedRandomize(
        this.ACTIVE_TILES.WALL.BOTTOM,
        left + 1,
        bottom,
        width - 2,
        1
      );
      this.groundLayer.weightedRandomize(this.ACTIVE_TILES.WALL.LEFT, left, top + 1, 1, height - 2);
      this.groundLayer.weightedRandomize(
        this.ACTIVE_TILES.WALL.RIGHT,
        right,
        top + 1,
        1,
        height - 2
      );

      // Dungeons have rooms that are connected with doors. Each door has an x & y relative to the
      // room's location. Each direction has a different door to tile mapping.
      const doors = room.getDoorLocations(); // → Returns an array of {x, y} objects
      for (let i = 0; i < doors.length; i++) {
        if (doors[i].y === 0) {
          this.groundLayer.putTilesAt(
            this.ACTIVE_TILES.DOOR.TOP,
            x + doors[i].x - 1,
            y + doors[i].y
          );
        } else if (doors[i].y === room.height - 1) {
          this.groundLayer.putTilesAt(
            this.ACTIVE_TILES.DOOR.BOTTOM,
            x + doors[i].x - 1,
            y + doors[i].y
          );
        } else if (doors[i].x === 0) {
          this.groundLayer.putTilesAt(
            this.ACTIVE_TILES.DOOR.LEFT,
            x + doors[i].x,
            y + doors[i].y - 1
          );
        } else if (doors[i].x === room.width - 1) {
          this.groundLayer.putTilesAt(
            this.ACTIVE_TILES.DOOR.RIGHT,
            x + doors[i].x,
            y + doors[i].y - 1
          );
        }
      }
    });

    // Separate out the rooms into:
    //  - The starting room (index = 0)
    //  - A random room to be designated as the end room (with stairs and nothing else)
    //  - An array of 90% of the remaining rooms, for placing random stuff (leaving 10% empty)
    const rooms = this.dungeon.rooms.slice();
    const startRoom = rooms.shift();
    // @ts-ignore
    const endRoom = Phaser.Utils.Array.RemoveRandomElement(rooms);
    // @ts-ignore
    const otherRooms = Phaser.Utils.Array.Shuffle(rooms).slice(0, rooms.length * 0.9);

    // Place the stairs
    // @ts-ignore
    this.stuffLayer.putTileAt(this.ACTIVE_TILES.STAIRS, endRoom.centerX, endRoom.centerY);

    // Place stuff in the 90% "otherRooms"
    otherRooms.forEach((room) => {
      const rand = Math.random();
      if (rand <= 0.25) {
        // 25% chance of chest
        this.stuffLayer.putTileAt(this.ACTIVE_TILES.CHEST, room.centerX, room.centerY);
      } else if (rand <= 0.5) {
        // 50% chance of a pot anywhere in the room... except don't block a door!
        // @ts-ignore
        const x = Phaser.Math.Between(room.left + 2, room.right - 2);
        // @ts-ignore
        const y = Phaser.Math.Between(room.top + 2, room.bottom - 2);
        // TODO @seang: we need better calculation for tile overlap and door/path blocking
        // if (this.activeMapName === "atlantis") {
        //   this.ACTIVE_TILES.POND.forEach((pondColumn, index) => {
        //     const spreadIndices = {
        //       0: -1,
        //       1: 0,
        //       2: 1,
        //     };
        //     const centerSpreadIndex = room.centerX + spreadIndices[index];
        //     console.log({
        //       centerSpreadIndex,
        //       roomCenterX: room.centerX,
        //       target: this.ACTIVE_TILES.POND[index],
        //       index,
        //     });
        //     this.stuffLayer.putTilesAt(
        //       this.ACTIVE_TILES.POND[index],
        //       centerSpreadIndex,
        //       room.centerY + 1
        //     );
        //   });
        // }
        this.stuffLayer.weightedRandomize(this.ACTIVE_TILES.POT, x, y, 1, 1);
      } else {
        // 25% of either 2 or 4 towers, depending on the room size
        if (room.height >= 9) {
          this.stuffLayer.putTilesAt(this.ACTIVE_TILES.TOWER, room.centerX - 1, room.centerY + 1);
          this.stuffLayer.putTilesAt(this.ACTIVE_TILES.TOWER, room.centerX + 1, room.centerY + 1);
          this.stuffLayer.putTilesAt(this.ACTIVE_TILES.TOWER, room.centerX - 1, room.centerY - 2);
          this.stuffLayer.putTilesAt(this.ACTIVE_TILES.TOWER, room.centerX + 1, room.centerY - 2);
        } else {
          this.stuffLayer.putTilesAt(this.ACTIVE_TILES.TOWER, room.centerX - 1, room.centerY - 1);
          this.stuffLayer.putTilesAt(this.ACTIVE_TILES.TOWER, room.centerX + 1, room.centerY - 1);
        }
      }
    });

    this.groundLayer.setCollisionByExclusion([
      -1,
      this.ACTIVE_TILES.FLOOR[0].index,
      ...this.ACTIVE_TILES.FLOOR[1].index,
    ]);
    this.stuffLayer.setCollisionByExclusion([
      -1,
      this.ACTIVE_TILES.FLOOR[0].index,
      ...this.ACTIVE_TILES.FLOOR[1].index,
    ]);

    const restartScene = (data) => {
      this.stuffLayer.setTileIndexCallback(this.ACTIVE_TILES.STAIRS, null, {});
      this.hasPlayerReachedStairs = true;
      this.player.freeze();
      // @ts-ignore
      const cam = this.cameras.main;
      cam.fade(250, 0, 0, 0);
      cam.once("camerafadeoutcomplete", () => {
        this.player.destroy();
        // @ts-ignore
        this.scene.restart(data);
      });
    };

    this.stuffLayer.setTileIndexCallback(
      this.ACTIVE_TILES.STAIRS,
      () => restartScene({ activeTileMap: this.activeMapName }),
      {}
    );

    // Place the player in the first room
    const playerRoom = startRoom;
    const x = map.tileToWorldX(playerRoom.centerX);
    const y = map.tileToWorldY(playerRoom.centerY);
    this.player = new Player(this, x, y);

    // Watch the player and tilemap layers for collisions, for the duration of the scene:
    // @ts-ignore
    this.physics.add.collider(this.player.sprite, this.groundLayer);
    // @ts-ignore
    this.physics.add.collider(this.player.sprite, this.stuffLayer);

    // Phaser supports multiple cameras, but you can access the default camera like this:
    // @ts-ignore
    const camera = this.cameras.main;

    // Constrain the camera so that it isn't allowed to move outside the width/height of tilemap
    camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    camera.startFollow(this.player.sprite);

    // Help text that has a "fixed" position on the screen
    // @ts-ignore
    this.add
      .text(
        16,
        16,
        `Find the stairs. Go deeper.\nEnter a new description to change your surroundings\n\nCurrent level: ${this.level}`,
        {
          font: "18px monospace",
          // @ts-ignore
          fill: "#000000",
          padding: { x: 20, y: 10 },
          backgroundColor: "#ffffff",
        }
      )
      .setScrollFactor(0);
    // @ts-ignore

    const form = `
      <input type="text" style="width:300px;margin-left:135px" name="dungeonPrompt" placeholder="Dungeon description.." />
    `;
    // @ts-ignore
    const dungeonPrompt = this.add.dom(100, 130).createFromHTML(form).setScrollFactor(0);
    //
    // @ts-ignore
    const returnKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    // @ts-ignore
    // @ts-ignore
    returnKey.on("down", (event) => {
      // @ts-ignore
      const textVal = dungeonPrompt.getChildByName("dungeonPrompt").value;
      getRoomType(textVal).then((bestGuess) => {
        console.log(bestGuess);
        restartScene({ activeTileMap: bestGuess, level: this.level - 1 });
      });
    });
  }

  // @ts-ignore
  // @ts-ignore
  update(time, delta) {
    if (this.hasPlayerReachedStairs) return;

    this.player.update();

    // Find the player's room using another helper method from the dungeon that converts from
    // dungeon XY (in grid units) to the corresponding room object
    const playerTileX = this.groundLayer.worldToTileX(this.player.sprite.x);
    const playerTileY = this.groundLayer.worldToTileY(this.player.sprite.y);
    const playerRoom = this.dungeon.getRoomAt(playerTileX, playerTileY);

    this.tilemapVisibility.setActiveRoom(playerRoom);
  }
}
