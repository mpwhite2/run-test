namespace SpriteKind {
    export const Blocker = SpriteKind.create()
    export const Boss = SpriteKind.create()
    export const Fire = SpriteKind.create()
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile0`, function (sprite, location) {
    game.over(false)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile1`, function (sprite, location) {
    music.jumpUp.play()
    game.showLongText("You have completed a level! ", DialogLayout.Bottom)
    sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
    sprites.destroyAllSpritesOfKind(SpriteKind.Food)
    statusbar.value = 100
    if (Level == 1) {
        Lev2()
    } else if (Level == 2) {
        Lev3()
    } else {
        if (Level == 3) {
            game.over(true)
        }
    }
})
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (characterAnimations.matchesRule(mySprite, characterAnimations.rule(Predicate.HittingWallDown)) && statusbar.value > 0) {
        mySprite.vy = -130
        statusbar.value += -10
    }
})
function CreateEnemy2 (Col: number, Row: number) {
    Enemy2 = sprites.create(img`
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
        `, SpriteKind.Enemy)
    tiles.placeOnTile(Enemy2, tiles.getTileLocation(Col, Row))
    animation.runImageAnimation(
    Enemy2,
    [img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . a a a a . . . . . . 
        . . . . . a a a a a a . . . . . 
        . . . . a a a a a a a a . . . . 
        . . . . a a f a a f a a . . . . 
        . . a a a a f a a f a a a a . . 
        . a a a a a a a a a a a a a a . 
        . a a . a a a f f a a a . a a . 
        . . a . a a f a a f a a . a . . 
        . . . . a a a a a a a a . . . . 
        . . . . a a a a a a a a . . . . 
        . . . . . a a a a a a . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . a a a a . . . . . . 
        . . . . . a a a a a a . . . . . 
        . . . . a a a a a a a a . . . . 
        . . . a a a f a a f a a a . . . 
        . . . a a a f a a f a a a . . . 
        . . a a a a a a a a a a a a . . 
        . a a . a a a f f a a a . a a . 
        . a a . a a f a a f a a . a a . 
        . a . . a a a a a a a a . . a . 
        . . . . a a a a a a a a . . . . 
        . . . . . a a a a a a . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `],
    200,
    true
    )
    Enemy2.follow(mySprite, 50)
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (statusbar.value > 0 && characterAnimations.matchesRule(mySprite, characterAnimations.rule(Predicate.HittingWallDown))) {
        mySprite.vy = -200
        statusbar.value += -20
    }
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Fire, function (sprite, otherSprite) {
    sprite.destroy()
    otherSprite.destroy()
})
controller.anyButton.onEvent(ControllerButtonEvent.Pressed, function () {
    controller.moveSprite(mySprite, 100, 0)
})
function Lev2 () {
    Level = 2
    tiles.setCurrentTilemap(tilemap`level2`)
    tiles.placeOnTile(mySprite, tiles.getTileLocation(3, 5))
    CreateEnemy(39, 7)
    CreateEnemy(39, 7)
    CreateEnemy(25, 2)
    CreateEnemy(15, 15)
    CreateEnemy(36, 9)
    CreateEnemy2(39, 7)
    CreateEnemy2(39, 3)
    CreateEnemy2(19, 1)
    CreateEnemy2(31, 5)
    doSomething()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Fire, function (sprite, otherSprite) {
    game.over(false)
})
function MoveEnemy (mySprite: Sprite) {
    forever(function(){
    if (mySprite.isHittingTile(CollisionDirection.Left) || mySprite.isHittingTile(CollisionDirection.Right) || (mySprite.isHittingTile(CollisionDirection.Top) || mySprite.isHittingTile(CollisionDirection.Bottom))) {
        if (Math.percentChance(25)) {
            mySprite.vx = 50
        } else if (Math.percentChance(33.33)) {
            mySprite.vx = -50
        } else if (Math.percentChance(50)) {
            mySprite.vy = 50
        } else {
            mySprite.vy = -50
        }
    }
}
    )
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Right) {
        projectile = sprites.createProjectileFromSprite(img`
            . . . . . . 
            . . . . . . 
            e . . . e . 
            e e e e e e 
            e . . . e . 
            . . . . . . 
            . . . . . . 
            `, mySprite, 200, 0)
        music.knock.play()
        projectile.setKind(SpriteKind.Projectile)
    }
    if (Left) {
        projectile = sprites.createProjectileFromSprite(img`
            . . . . . . 
            . . . . . . 
            . e . . . e 
            e e e e e e 
            . e . . . e 
            . . . . . . 
            . . . . . . 
            `, mySprite, -200, 0)
        music.knock.play()
        projectile.setKind(SpriteKind.Projectile)
    }
})
function Lev3 () {
    Level = 3
    tiles.setCurrentTilemap(tilemap`level3`)
    tiles.placeOnTile(mySprite, tiles.getTileLocation(3, 4))
    CreateEnemy2(46, 15)
    CreateEnemy2(48, 7)
    CreateEnemy2(22, 6)
    CreateEnemy2(24, 14)
    CreateEnemy2(35, 14)
    CreateEnemy2(13, 12)
    CreateEnemy(47, 11)
    CreateEnemy(47, 11)
    CreateEnemy(47, 11)
    CreateEnemy(1, 10)
    CreateEnemy(30, 5)
    CreateEnemy(15, 11)
    CreateEnemy(20, 12)
    CreateEnemy(20, 13)
    doSomething()
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Boss, function (sprite, otherSprite) {
    BossHealth += -1
    sprite.destroy()
    otherSprite.startEffect(effects.ashes, 250)
    info.changeScoreBy(1)
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Projectile, function (sprite, otherSprite) {
    sprite.destroy(effects.ashes, 500)
    otherSprite.destroy()
    info.changeScoreBy(1)
})
function Lev1 () {
    Level = 1
    tiles.setCurrentTilemap(tilemap`level1`)
    CreateEnemy(28, 5)
    CreateEnemy(28, 5)
    CreateEnemy(28, 4)
    CreateEnemy(8, 5)
    CreateEnemy(16, 2)
    CreateEnemy(20, 16)
    CreateEnemy(3, 2)
    doSomething()
}
scene.onHitWall(SpriteKind.Boss, function (sprite, location) {
    tiles.setTileAt(location, assets.tile`transparency16`)
    tiles.setWallAt(location, false)
})
function doSomething () {
    for (let index = 0; index < 2; index++) {
        mySprite2 = sprites.create(img`
            . . b b b b b b b b b b b b . . 
            . b e 4 4 4 4 4 4 4 4 4 4 e b . 
            b e 4 4 4 4 4 4 4 4 4 4 4 4 e b 
            b e 4 4 4 4 4 4 4 4 4 4 4 4 e b 
            b e 4 4 4 4 4 4 4 4 4 4 4 4 e b 
            b e e 4 4 4 4 4 4 4 4 4 4 e e b 
            b e e e e e e e e e e e e e e b 
            b e e e e e e e e e e e e e e b 
            b b b b b b b d d b b b b b b b 
            c b b b b b b c c b b b b b b c 
            c c c c c c b c c b c c c c c c 
            b e e e e e c b b c e e e e e b 
            b e e e e e e e e e e e e e e b 
            b c e e e e e e e e e e e e c b 
            b b b b b b b b b b b b b b b b 
            . b b . . . . . . . . . . b b . 
            `, SpriteKind.Food)
        tiles.placeOnRandomTile(mySprite2, assets.tile`transparency16`)
    }
}
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Build > 0) {
        if (mySprite.tileKindAt(TileDirection.Top, assets.tile`myTile`)) {
            game.over(false)
        }
        Loc = mySprite.tilemapLocation()
        tiles.setTileAt(Loc, assets.tile`myTile`)
        tiles.setWallAt(Loc, true)
        mySprite.y += -16
        Build += -1
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile2`, function (sprite, location) {
    game.over(true)
})
function CreateEnemy3 (Col: number, Row: number) {
    Enemy3 = sprites.create(img`
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
        `, SpriteKind.Boss)
    characterAnimations.loopFrames(
    Enemy3,
    [img`
        ........................
        ........................
        ...........22...........
        .........2222...........
        .....cc22222...22.......
        ...cc555555222222.......
        ..c5555555555b22........
        .c555555555555b..22.....
        c555551ff555555b222.....
        c55d55ff55555555b22.....
        c5555555555555555b......
        .cbb31bb55555d555b..2...
        .c5333bb55ddddd55d222...
        .c533b55ddddddddddb2....
        .c5555ddddb55bddddd222..
        ..ccccbbbb555bddddd222..
        ...cdcbc5555bddddddcc...
        ....ccbc55bcdddddddbcccc
        .....cbbccbd55dddddddddc
        .....ccbbbd555ddddddddbc
        ...ccbdcbb555ddbbdddbcc.
        ...cbdddcc55ddbbbbccc...
        ...cccccccbdddbccc......
        ........cd555ddc........
        `,img`
        ........................
        ........................
        ..........222...........
        .........2222...........
        .....ccc2222..222.......
        ...cc555555222222.......
        ..c5555555555b22........
        .c555555555555b..22.....
        c555551ff555555b222.....
        c55d55ff55555555b2......
        c5555555555555555b......
        .cbb31bb5555dd555b.22...
        .c5333b555ddddd55d222...
        .c533b55ddddddddddb.....
        .c5555dddbb55bddddd222..
        ..ccccbbbb555bddddd222..
        ...cdcbc5555bddddddcc...
        ....ccbc55bc5ddddddbcccc
        .....cbbcc5555dddddddddc
        .....ccbbb555ddbddddddc.
        .....cdcbc55ddbbbdddcc..
        ...ccdddccddddbcbbcc....
        ...ccccccd555ddccc......
        ........cccccccc........
        `,img`
        ........................
        ..........22............
        .........222............
        .....ccc2222.222........
        ...cc55555522222........
        ..c5555555555b22........
        .c55551ff55555b.222.....
        c55555ff5555555b222.....
        c55d555555555555b2......
        c55555bb555555555b.2....
        .cbb31b5555ddd555b22....
        .c5333b555ddddd55d22....
        .c533b55ddddddd5dd2.....
        ..c555dbbb555bddddb.2...
        ...cccb55555bbddddd22...
        ....ccb555ccddddddd22...
        ..ccccbcccbdddddddd22...
        ..c55cbbbbd55dddddddbcc.
        ...c5ccbbd555dddddddddcc
        ....cccbb555ddbbbddddddc
        ......ccb55ddbbbbddddcc.
        ....ccddcbdddbbbbbccc...
        ....ccccd555ddccccc.....
        ........cccccc..........
        `,img`
        ........................
        ..........22............
        .........222............
        .....cc22222.222........
        ...cc555555c2222........
        ..c5555555555b22........
        .c55551ff55555b.222.....
        c55555ff5555555b222.....
        c55d555555555555bc......
        c55555bb555555555b.2....
        .cbb31b5555ddd555b22....
        .c5333b555ddddd55d22....
        .c533b55ddddddd5dd2.....
        ..c555dbbb555bddddb.2...
        ...cccb55555bbddddd22...
        ....ccb555ccddddddd22...
        ..ccccbcccddddddddd2ccc.
        ..c55cbbbd55ddddddddcdc.
        ...c5cccd555ddddddddddc.
        ....cc555d5ddbbbbddddbc.
        ......5555ddbbbbbdddbc..
        ......c5555dbbbbbbccc...
        .......c555cccccccc.....
        ........ccc.............
        `,img`
        ........................
        ..........22............
        .........222............
        .....cc22222.222........
        ...cc555555c2222........
        ..c5555555555b22........
        .c55551ff55555b.222.....
        c55555ff5555555b222.....
        c55d555555555555b2......
        c55555bb555555555b.2....
        .cbb31b5555ddd555b22....
        .c5333b555ddddd55d22....
        .c533b55ddddddd5dd2.....
        ..c555dbbb555bddddb.2...
        ...cccb555555bddddd22...
        ....ccb5555ccdddddd222..
        ..ccccbcccbdddddddd22dc.
        ..c55cbbbbdddddddddbddc.
        ...c5cbbbd55ddddddddddc.
        ....cccbdd55dbbbbddddbc.
        .....cccd555dbbbbdddbc..
        .....c555dddbbbbbbccc...
        .....c55555dbcccccc.....
        ......c5555cc...........
        `,img`
        ........................
        ..........22............
        .........222............
        .....cc22222..22........
        ...cc555555c2222........
        ..c5555555555b22........
        .c555555555555b..22.....
        c555551ff555555b222.....
        c55d55ff55555555b2......
        c5555555555555555b......
        .cbb31bb5555dd555b.22...
        .c5333b555ddddd55d222...
        .c533b55ddddddd5dd22....
        .c5555ddddb55bddddb.....
        ..ccccbbbbb55bddddd222..
        ..ccccbc5555bdddddd222c.
        ..c55cbc555cddddddd22dc.
        ...c5cbbcccdddddddddddc.
        ....cccbbbbd55dddddddbc.
        ....cbcbbbd555ddddddbcc.
        .....cccbb555dbbbddccc..
        .......cc555dbbbbbcc....
        .......cbddddbcccc......
        ......cd5555dc..........
        `],
    50,
    characterAnimations.rule(Predicate.MovingLeft)
    )
    characterAnimations.loopFrames(
    Enemy3,
    [img`
        ........................
        ........................
        ...........22...........
        ...........2222.........
        .......22...22222cc.....
        .......222222555555cc...
        ........22b5555555555c..
        .....22..b555555555555c.
        .....222b555555ff155555c
        .....22b55555555ff55d55c
        ......b5555555555555555c
        ...2..b555d55555bb13bbc.
        ...222d55ddddd55bb3335c.
        ....2bdddddddddd55b335c.
        ..222dddddb55bdddd5555c.
        ..222dddddb555bbbbcccc..
        ...ccddddddb5555cbcdc...
        ccccbdddddddcb55cbcc....
        cddddddddd55dbccbbc.....
        cbdddddddd555dbbbcc.....
        .ccbdddbbdd555bbcdbcc...
        ...cccbbbbdd55ccdddbc...
        ......cccbdddbccccccc...
        ........cdd555dc........
        `,img`
        ........................
        ........................
        ...........222..........
        ...........2222.........
        .......222..2222ccc.....
        .......222222555555cc...
        ........22b5555555555c..
        .....22..b555555555555c.
        .....222b555555ff155555c
        ......2b55555555ff55d55c
        ......b5555555555555555c
        ...22.b555dd5555bb13bbc.
        ...222d55ddddd555b3335c.
        .....bdddddddddd55b335c.
        ..222dddddb55bbddd5555c.
        ..222dddddb555bbbbcccc..
        ...ccddddddb5555cbcdc...
        ccccbdddddd5cb55cbcc....
        cddddddddd5555ccbbc.....
        .cddddddbdd555bbbcc.....
        ..ccdddbbbdd55cbcdc.....
        ....ccbbcbddddccdddcc...
        ......cccdd555dcccccc...
        ........cccccccc........
        `,img`
        ........................
        ............22..........
        ............222.........
        ........222.2222ccc.....
        ........22222555555cc...
        ........22b5555555555c..
        .....222.b55555ff15555c.
        .....222b5555555ff55555c
        ......2b555555555555d55c
        ....2.b555555555bb55555c
        ....22b555ddd5555b13bbc.
        ....22d55ddddd555b3335c.
        .....2dd5ddddddd55b335c.
        ...2.bddddb555bbbd555c..
        ...22dddddbb55555bccc...
        ...22dddddddcc555bcc....
        ...22ddddddddbcccbcccc..
        .ccbddddddd55dbbbbc55c..
        ccddddddddd555dbbcc5c...
        cddddddbbbdd555bbccc....
        .ccddddbbbbdd55bcc......
        ...cccbbbbbdddbcddcc....
        .....cccccdd555dcccc....
        ..........cccccc........
        `,img`
        ........................
        ............22..........
        ............222.........
        ........222.22222cc.....
        ........2222c555555cc...
        ........22b5555555555c..
        .....222.b55555ff15555c.
        .....222b5555555ff55555c
        ......cb555555555555d55c
        ....2.b555555555bb55555c
        ....22b555ddd5555b13bbc.
        ....22d55ddddd555b3335c.
        .....2dd5ddddddd55b335c.
        ...2.bddddb555bbbd555c..
        ...22dddddbb55555bccc...
        ...22dddddddcc555bcc....
        .ccc2dddddddddcccbcccc..
        .cdcdddddddd55dbbbc55c..
        .cdddddddddd555dccc5c...
        .cbddddbbbbdd5d555cc....
        ..cbdddbbbbbdd5555......
        ...cccbbbbbbd5555c......
        .....cccccccc555c.......
        .............ccc........
        `,img`
        ........................
        ............22..........
        ............222.........
        ........222.22222cc.....
        ........2222c555555cc...
        ........22b5555555555c..
        .....222.b55555ff15555c.
        .....222b5555555ff55555c
        ......2b555555555555d55c
        ....2.b555555555bb55555c
        ....22b555ddd5555b13bbc.
        ....22d55ddddd555b3335c.
        .....2dd5ddddddd55b335c.
        ...2.bddddb555bbbd555c..
        ...22dddddb555555bccc...
        ..222ddddddcc5555bcc....
        .cd22ddddddddbcccbcccc..
        .cddbdddddddddbbbbc55c..
        .cdddddddddd55dbbbc5c...
        .cbddddbbbbd55ddbccc....
        ..cbdddbbbbd555dccc.....
        ...cccbbbbbbddd555c.....
        .....ccccccbd55555c.....
        ...........cc5555c......
        `,img`
        ........................
        ............22..........
        ............222.........
        ........22..22222cc.....
        ........2222c555555cc...
        ........22b5555555555c..
        .....22..b555555555555c.
        .....222b555555ff155555c
        ......2b55555555ff55d55c
        ......b5555555555555555c
        ...22.b555dd5555bb13bbc.
        ...222d55ddddd555b3335c.
        ....22dd5ddddddd55b335c.
        .....bddddb55bdddd5555c.
        ..222dddddb55bbbbbcccc..
        .c222ddddddb5555cbcccc..
        .cd22dddddddc555cbc55c..
        .cdddddddddddcccbbc5c...
        .cbddddddd55dbbbbccc....
        .ccbdddddd555dbbbcbc....
        ..cccddbbbd555bbccc.....
        ....ccbbbbbd555cc.......
        ......ccccbddddbc.......
        ..........cd5555dc......
        `],
    50,
    characterAnimations.rule(Predicate.MovingRight)
    )
    Enemy3.follow(mySprite, 40)
    Enemy3.setFlag(SpriteFlag.GhostThroughWalls, true)
    tiles.placeOnTile(Enemy3, tiles.getTileLocation(Col, Row))
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    tiles.placeOnRandomTile(otherSprite, assets.tile`transparency16`)
    Build += 10
    statusbar.value = 100
})
scene.onHitWall(SpriteKind.Projectile, function (sprite, location) {
    tiles.setTileAt(location, assets.tile`transparency16`)
    tiles.setWallAt(location, false)
    sprite.destroy()
    Build += 1
})
function Lev4 () {
    Level = 4
    tiles.setCurrentTilemap(tilemap`level0`)
    CreateEnemy3(57, 14)
    CreateEnemy(57, 8)
    CreateEnemy(57, 14)
    CreateEnemy(57, 8)
    CreateEnemy(57, 8)
    CreateEnemy(32, 7)
    CreateEnemy(16, 4)
    CreateEnemy(12, 13)
    CreateEnemy(24, 3)
    CreateEnemy(45, 3)
    CreateEnemy(21, 11)
    CreateEnemy(1, 13)
    CreateEnemy2(54, 14)
    CreateEnemy2(57, 8)
    CreateEnemy2(30, 14)
    CreateEnemy2(56, 9)
    CreateEnemy2(21, 3)
    CreateEnemy2(49, 1)
}
function CreateEnemy (Col: number, Row: number) {
    Enemy1 = sprites.create(img`
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
        `, SpriteKind.Enemy)
    animation.runImageAnimation(
    Enemy1,
    [img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . 4 2 . . . . . . . 
        . . . . . . 4 4 4 2 . . . . . . 
        . . . . . 4 4 4 4 4 2 . . . . . 
        . . . . . 4 f 4 4 f 2 . . . . . 
        . . . . 4 4 f 4 4 f 4 2 . . . . 
        . . . . 4 4 4 4 4 4 4 2 . . . . 
        . . . 4 4 4 4 4 4 4 4 4 2 . . . 
        . . 4 4 4 4 f f f f 4 4 4 2 . . 
        . 4 4 4 4 f 4 4 4 4 f 4 4 4 2 . 
        4 4 . 4 4 f 4 4 4 4 f 4 4 4 4 2 
        4 . . 4 4 4 4 4 4 4 4 4 4 . 4 2 
        4 . . . 4 4 4 4 4 4 4 4 . . . 2 
        4 . . . . 4 4 4 4 4 4 . . . . 4 
        . . . . . . 4 4 4 4 . . . . . . 
        . . . . . . . 4 4 . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . 4 2 . . . . . . . 
        . . . . . . 4 4 4 2 . . . . . . 
        . . . . . 4 4 4 4 4 2 . . . . . 
        . . . . . 4 f 4 4 f 2 . . . . . 
        . . . . 4 4 f 4 4 f 4 2 . . . . 
        . . . . 4 4 4 4 4 4 4 2 . . . . 
        . . . 4 4 4 4 4 4 4 4 4 2 . . . 
        . . 4 4 4 4 f f f f 4 4 4 2 . . 
        . . 4 4 4 f 4 4 4 4 f 4 4 2 . . 
        . 4 4 4 4 f 4 4 4 4 f 4 4 4 2 . 
        . 4 4 4 4 4 4 4 4 4 4 4 4 4 2 . 
        . 4 4 . 4 4 4 4 4 4 4 4 . 4 2 . 
        . 4 . . . 4 4 4 4 4 4 . . . 2 . 
        . 4 . . . . 4 4 4 4 . . . . 4 . 
        . . . . . . . 4 4 . . . . . . . 
        `],
    500,
    true
    )
    Enemy1.vx = -50
    MoveEnemy(Enemy1)
    tiles.placeOnTile(Enemy1, tiles.getTileLocation(Col, Row))
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    game.over(false)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Boss, function (sprite, otherSprite) {
    game.over(false)
})
let projectile2: Sprite = null
let Enemy1: Sprite = null
let Enemy3: Sprite = null
let Loc: tiles.Location = null
let mySprite2: Sprite = null
let projectile: Sprite = null
let Enemy2: Sprite = null
let Level = 0
let Build = 0
let statusbar: StatusBarSprite = null
let Right = false
let Left = false
let OldX = 0
let mySprite: Sprite = null
mySprite = sprites.create(assets.image`Player`, SpriteKind.Player)
scene.setBackgroundColor(12)
statusbar = statusbars.create(20, 4, StatusBarKind.Energy)
statusbar.setStayInScreen(true)
statusbar.setColor(7, 2)
statusbar.attachToSprite(mySprite)
statusbar.max = 100
Left = false
Right = false
info.setScore(0)
Build = 0
Level = 0
mySprite.setVelocity(0, 0)
Lev4()
let BossHealth = 10
game.onUpdateInterval(30, function () {
    mySprite.vy += 5
})
forever(function () {
    music.playMelody("C E D C C5 C - - ", 120)
})
forever(function () {
    statusbar.positionDirection(CollisionDirection.Top)
    scene.cameraFollowSprite(mySprite)
    characterAnimations.loopFrames(
    mySprite,
    [img`
        ..............ffffff....
        .............f2feeeeff..
        ............f222feeeeff.
        ............feeeeffeeef.
        ...........fe2222eeffff.
        ...........f2effff222ef.
        .........eecffeeefffffff
        ........ee...e44fbe44eff
        ........e....eddf14d4eef
        ........eeeecdeddd4eeef.
        ........e..edd4e44eeff..
        ........ee..ee442222f...
        .........ee..f2e2222f...
        .............f554444f...
        ..............ffffff....
        ................fff.....
        ........................
        ........................
        ........................
        ........................
        ........................
        ........................
        ........................
        ........................
        `,img`
        ........................
        ..............fff.......
        .............f2fffff....
        ...........ff22eeeeeff..
        ..........ff222eeeeeeff.
        ..........feeeefffeeeef.
        .........fe2222eeefffff.
        .........f2efffff222efff
        .......eefffeeefffffffff
        ......ee.fee44fbbe44efef
        ......e...feddfbb4d4eef.
        ......eeeeefddddd4eeef..
        ......e...dee2222222f...
        ......ee..d44e544444f...
        .......ee.dedffffffff...
        .............ff...fff...
        ........................
        ........................
        ........................
        ........................
        ........................
        ........................
        ........................
        ........................
        `,img`
        ...............ff.......
        .............ff2ffff....
        ............ff2feeeeff..
        ...........ff22feeeeeff.
        ...........feeeeffeeeef.
        ..........fe2222eefffff.
        ..........f2effff222efff
        ..........fffeeeffffffff
        ........eefee44fbe44efef
        .......ee..feddfb4d4eef.
        .......e....eeddd4eeef..
        .......eeeeeddee2222f...
        .......e...edd44e444f...
        .......ee...eeeefffff...
        ........ee....ffffffff..
        ...............ff..fff..
        ........................
        ........................
        ........................
        ........................
        ........................
        ........................
        ........................
        ........................
        `,img`
        ..............ffffff....
        .............f2feeeeff..
        ............f222feeeeff.
        ............feeeeffeeef.
        ...........fe2222eeffff.
        ...........f2effff222ef.
        ...........fffeeefffffff
        ...........fee44fbe44eff
        .........ee.feddf14d4eef
        ........ee...fdddd4eeef.
        ........e....fe444eddf..
        ........eeeedefe22eddf..
        ........e...ecfe22fee...
        ........ee....fc4444f...
        .........ee....fffff....
        ................fff.....
        ........................
        ........................
        ........................
        ........................
        ........................
        ........................
        ........................
        ........................
        `],
    100,
    characterAnimations.rule(Predicate.MovingLeft)
    )
    characterAnimations.loopFrames(
    mySprite,
    [img`
        ....ffffff..............
        ..ffeeeef2f.............
        .ffeeeef222f............
        .feeeffeeeef............
        .ffffee2222ef...........
        .fe222ffffe2f...........
        fffffffeeeffcee.........
        ffe44ebf44e...ee........
        fee4d41fdde....e........
        .feee4dddedceeee........
        ..ffee44e4dde..e........
        ...f222244ee..ee........
        ...f2222e2f..ee.........
        ...f444455f.............
        ....ffffff..............
        .....fff................
        ........................
        ........................
        ........................
        ........................
        ........................
        ........................
        ........................
        ........................
        `,img`
        ........................
        .......fff..............
        ....fffff2f.............
        ..ffeeeee22ff...........
        .ffeeeeee222ff..........
        .feeeefffeeeef..........
        .fffffeee2222ef.........
        fffe222fffffe2f.........
        fffffffffeeefffee.......
        fefe44ebbf44eef.ee......
        .fee4d4bbfddef...e......
        ..feee4dddddfeeeee......
        ...f2222222eed...e......
        ...f444445e44d..ee......
        ...ffffffffded.ee.......
        ...fff...ff.............
        ........................
        ........................
        ........................
        ........................
        ........................
        ........................
        ........................
        ........................
        `,img`
        .......ff...............
        ....ffff2ff.............
        ..ffeeeef2ff............
        .ffeeeeef22ff...........
        .feeeeffeeeef...........
        .fffffee2222ef..........
        fffe222ffffe2f..........
        ffffffffeeefff..........
        fefe44ebf44eefee........
        .fee4d4bfddef..ee.......
        ..feee4dddee....e.......
        ...f2222eeddeeeee.......
        ...f444e44dde...e.......
        ...fffffeeee...ee.......
        ..ffffffff....ee........
        ..fff..ff...............
        ........................
        ........................
        ........................
        ........................
        ........................
        ........................
        ........................
        ........................
        `,img`
        ....ffffff..............
        ..ffeeeef2f.............
        .ffeeeef222f............
        .feeeffeeeef............
        .ffffee2222ef...........
        .fe222ffffe2f...........
        fffffffeeefff...........
        ffe44ebf44eef...........
        fee4d41fddef.ee.........
        .feee4ddddf...ee........
        ..fdde444ef....e........
        ..fdde22efedeeee........
        ...eef22efce...e........
        ...f4444cf....ee........
        ....fffff....ee.........
        .....fff................
        ........................
        ........................
        ........................
        ........................
        ........................
        ........................
        ........................
        ........................
        `],
    100,
    characterAnimations.rule(Predicate.MovingRight)
    )
    if (characterAnimations.matchesRule(mySprite, characterAnimations.rule(Predicate.MovingRight, Predicate.MovingUp))) {
        mySprite.setImage(img`
            ........................
            ....ffffff..............
            ..ffeeeef2f.............
            .ffeeeef222f............
            .feeeffeeeef............
            .ffffee2222ef...........
            .fe222ffffe2f...........
            fffffffeeeffcee.........
            ffe44ebf44e...ee........
            fee4d41fdde....e........
            .feee4ddded.eeee........
            ..ffee44e4dddc.e........
            ...f222244ee..ee........
            ...f2222e2f..ee.........
            ...f444455f.............
            ....ffffff..............
            .....fff................
            ........................
            ........................
            ........................
            ........................
            ........................
            ........................
            ........................
            `)
    }
    if (characterAnimations.matchesRule(mySprite, characterAnimations.rule(Predicate.MovingLeft, Predicate.MovingUp))) {
        mySprite.setImage(img`
            ........................
            ..............ffffff....
            .............f2feeeeff..
            ............f222feeeeff.
            ............feeeeffeeef.
            ...........fe2222eeffff.
            ...........f2effff222ef.
            .........eecffeeefffffff
            ........ee...e44fbe44eff
            ........e....eddf14d4eef
            ........eeee.deddd4eeef.
            ........e.cddd4e44eeff..
            ........ee..ee442222f...
            .........ee..f2e2222f...
            .............f554444f...
            ..............ffffff....
            ................fff.....
            ........................
            ........................
            ........................
            ........................
            ........................
            ........................
            ........................
            `)
    }
    if (characterAnimations.matchesRule(mySprite, characterAnimations.rule(Predicate.MovingRight))) {
        Right = true
        Left = false
    }
    if (characterAnimations.matchesRule(mySprite, characterAnimations.rule(Predicate.MovingLeft))) {
        Left = true
        Right = false
    }
})
forever(function () {
    if (BossHealth == 0) {
        sprites.destroyAllSpritesOfKind(SpriteKind.Boss, effects.fire, 500)
    }
})
game.onUpdateInterval(500, function () {
    if (Level == 4 && BossHealth > 0) {
        projectile2 = sprites.createProjectileFromSprite(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . 4 4 4 4 4 . . . . . . 
            . . . 4 4 4 5 5 5 d 4 4 4 4 . . 
            . . 4 d 5 d 5 5 5 d d d 4 4 . . 
            . . 4 5 5 1 1 1 d d 5 5 5 4 . . 
            . 4 5 5 5 1 1 1 5 1 1 5 5 4 4 . 
            . 4 d d 1 1 5 5 5 1 1 5 5 d 4 . 
            . 4 5 5 1 1 5 1 1 5 5 d d d 4 . 
            . 2 5 5 5 d 1 1 1 5 1 1 5 5 2 . 
            . 2 d 5 5 d 1 1 1 5 1 1 5 5 2 . 
            . . 2 4 d d 5 5 5 5 d d 5 4 . . 
            . . . 2 2 4 d 5 5 d d 4 4 . . . 
            . . 2 2 2 2 2 4 4 4 2 2 2 . . . 
            . . . 2 2 4 4 4 4 4 4 2 2 . . . 
            . . . . . 2 2 2 2 2 2 . . . . . 
            `, Enemy3, 50, 50)
        projectile2.setKind(SpriteKind.Fire)
        projectile2.follow(mySprite, 50)
        timer.after(2000, function () {
            projectile2.destroy()
        })
    }
})
