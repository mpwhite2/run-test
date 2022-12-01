// Auto-generated code. Do not edit.
namespace myTiles {
    //% fixedInstance jres blockIdentity=images._tile
    export const transparency16 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile1 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile2 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile3 = image.ofBuffer(hex``);

    helpers._registerFactory("tilemap", function(name: string) {
        switch(helpers.stringTrim(name)) {
            case "level0":
            case "level5":return tiles.createTilemap(hex`1e001000010101010101010101010101010101010101010101010101010101010101010000000000000000000000000000000000000000000000000000000001010000000000000000000000000000000000000000000000000000000001010001000000000101010000000000000101000000000101010000000001010000000000000000000000000000000000000000000000000000000001010000000000000000000000000000000000000001010000000000000002010000000000000000000000000000000000000000000000000101010101010000000000000000000001010100000000000000000000000100000000010000000000000000000000000000000000000101010000000100000000010000000000000000000000000000000000010100000000000100000000010000000101010000000101010000000000010000000000000100000000010000000100000000000000000000000000010000000000000100000000010000000100000000000000000000010000010000000000000100000000010100000100000000000000000000010000010000000000000100000000010100000100000003000000000000010000010000000000000100000000030103030100000003000000000000010000010000000303030100000000`, img`
222222222222222222222222222222
2............................2
2............................2
2.2....222......22....222....2
2............................2
2...................22........
2........................22222
2..........222...........2....
2..................222...2....
2.................22.....2....
2...222...222.....2......2....
2...2.............2......2....
2...2..........2..2......2....
22..2..........2..2......2....
22..2..........2..2......2....
.2..2..........2..2......2....
`, [myTiles.transparency16,myTiles.tile1,myTiles.tile3,myTiles.tile2], TileScale.Sixteen);
            case "level2":
            case "level2":return tiles.createTilemap(hex`2800100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010101000000000000000000000000000001010101010000000000000000000000000000000000000000010100000000000000000000000000000000000000000000000101000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001010101010000000000000000000000000000000000000000000000000000000000000000000000010101010100000000000000000000010101010100000000000000000100000000000000000000000101010000000000000000000000000000000000000000000000000001000000000000010101000001010100030000000000000000000000000000000000000000000000010000000101000000010000010101010100000000000000000000000000000000000000000000000100000000010000000000000100000000000000000000000000000000000000000000000000000001000000000100000000000001000000000000000000000000000000000101010201010000000000000000000001000000000000010000000001010101010000000000010101000101010001010100000000000000010001000000000100000000000000000000000000000000000000000000000000000000000000000100000100000001000000000000000000000000000000000000000000000000000000000000000001000000000000010000000000000000020202020000000000000000000202020000000000000000000000000000000100000000`, img`
........................................
...222..............22222...............
.....22.......................22........
........................................
...................................22222
...................................22222
..........22222........2...........222..
.......................2......222..222..
.......................2...22...2..22222
.......................2....2......2....
.......................2....2......2....
............222.22..........2......2....
22222.....222.222.222.......2.2....2....
............................2..2...2....
............................2......2....
...................................2....
`, [myTiles.transparency16,myTiles.tile1,myTiles.tile2,myTiles.tile3], TileScale.Sixteen);
            case "level1":
            case "level1":return tiles.createTilemap(hex`1000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000`, img`
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
`, [myTiles.transparency16], TileScale.Sixteen);
        }
        return null;
    })

    helpers._registerFactory("tile", function(name: string) {
        switch(helpers.stringTrim(name)) {
            case "transparency16":return transparency16;
            case "myTile":
            case "tile1":return tile1;
            case "myTile0":
            case "tile2":return tile2;
            case "myTile1":
            case "tile3":return tile3;
        }
        return null;
    })

}
// Auto-generated code. Do not edit.
