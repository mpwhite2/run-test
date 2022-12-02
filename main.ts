namespace SpriteKind {
    export const Blocker = SpriteKind.create()
    export const Boss = SpriteKind.create()
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
    if (statusbar.value > 0) {
        mySprite.vy = -200
        statusbar.value += -20
    }
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
        ........................
        ........................
        ..........ffff..........
        ........ff1111ff........
        .......fb111111bf.......
        .......f1111111df.......
        ......fd1111111ddf......
        ......fd111111dddf......
        ......fd111ddddddf......
        ......fd1dfbddddbf......
        ......fbddfcdbbbcf......
        .......f11111bbcf.......
        .......f1b1fffff........
        .......fbfc111bf........
        ........ff1b1bff........
        .........fbfbfff.f......
        ..........ffffffff......
        ............fffff.......
        ........................
        ........................
        ........................
        ........................
        `,img`
        ........................
        ........................
        ........................
        ........................
        .........fffff..........
        ........f11111ff........
        .......fb111111bf.......
        .......f1111111dbf......
        ......fd111111dddf......
        ......fd11111ddddf......
        ......fd11dddddddf......
        ......f111dddddddf......
        ......f11fcddddddf......
        .....fb1111bdddbf.......
        .....f1b1bdfcfff........
        .....fbfbffffffff.......
        ......fffffffffff.ff....
        ...........ffffffff.....
        ........f1b1bffffff.....
        ........fbfbffffff......
        ........................
        ........................
        ........................
        ........................
        `],
    500,
    characterAnimations.rule(Predicate.MovingLeft)
    )
    characterAnimations.loopFrames(
    Enemy3,
    [img`
        ........................
        ........................
        ........................
        ........................
        ..........ffff..........
        ........ff1111ff........
        .......fb111111bf.......
        .......fd1111111f.......
        ......fdd1111111df......
        ......fddd111111df......
        ......fdddddd111df......
        ......fbddddbfd1df......
        ......fcbbbdcfddbf......
        .......fcbb11111f.......
        ........fffff1b1f.......
        ........fb111cfbf.......
        ........ffb1b1ff........
        ......f.fffbfbf.........
        ......ffffffff..........
        .......fffff............
        ........................
        ........................
        ........................
        ........................
        `,img`
        ........................
        ........................
        ........................
        ........................
        ..........fffff.........
        ........ff11111f........
        .......fb111111bf.......
        ......fbd1111111f.......
        ......fddd111111df......
        ......fdddd11111df......
        ......fddddddd11df......
        ......fddddddd111f......
        ......fddddddcf11f......
        .......fbdddb1111bf.....
        ........fffcfdb1b1f.....
        .......ffffffffbfbf.....
        ....ff.fffffffffff......
        .....ffffffff...........
        .....ffffffb1b1f........
        ......ffffffbfbf........
        ........................
        ........................
        ........................
        ........................
        `],
    500,
    characterAnimations.rule(Predicate.MovingRight)
    )
    characterAnimations.loopFrames(
    Enemy3,
    [img`
        ........................
        ........................
        ........................
        ........................
        ..........ffff..........
        ........ff1111ff........
        .......fb111111bf.......
        .......f11111111f.......
        ......fd11111111df......
        ......fd11111111df......
        ......fddd1111dddf......
        ......fbdbfddfbdbf......
        ......fcdcf11fcdcf......
        .......fb111111bf.......
        ......fffcdb1bdffff.....
        ....fc111cbfbfc111cf....
        ....f1b1b1ffff1b1b1f....
        ....fbfbffffffbfbfbf....
        .........ffffff.........
        ...........fff..........
        ........................
        ........................
        ........................
        ........................
        `,img`
        ........................
        ........................
        ........................
        ........................
        ..........ffff..........
        ........ff1111ff........
        .......fb111111bf.......
        .......f11111111f.......
        ......fd11111111df......
        ......fd11111111df......
        ......fddd1111dddf......
        ......fbdbfddfbdbf......
        ......fcdcf11fcdcf......
        .......fb111111ffff.....
        ......fffcdb1bc111cf....
        ....fc111cbfbf1b1b1f....
        ....f1b1b1ffffbfbfbf....
        ....fbfbfffffff.........
        .........fffff..........
        ..........fff...........
        ........................
        ........................
        ........................
        ........................
        `,img`
        ........................
        ........................
        ........................
        ........................
        ..........ffff..........
        ........ff1111ff........
        .......fb111111bf.......
        .......f11111111f.......
        ......fd11111111df......
        ......fd11111111df......
        ......fddd1111dddf......
        ......fbdbfddfbdbf......
        ......fcdcf11fcdcf......
        .......fb111111bf.......
        ......fffcdb1bdffff.....
        ....fc111cbfbfc111cf....
        ....f1b1b1ffff1b1b1f....
        ....fbfbffffffbfbfbf....
        .........ffffff.........
        ...........fff..........
        ........................
        ........................
        ........................
        ........................
        `,img`
        ........................
        ........................
        ........................
        ........................
        ..........ffff..........
        ........ff1111ff........
        .......fb111111bf.......
        .......f11111111f.......
        ......fd11111111df......
        ......fd11111111df......
        ......fddd1111dddf......
        ......fbdbfddfbdbf......
        ......fcdcf11fcdcf......
        .....ffff111111bf.......
        ....fc111cdb1bdfff......
        ....f1b1bcbfbfc111cf....
        ....fbfbfbffff1b1b1f....
        .........fffffffbfbf....
        ..........fffff.........
        ...........fff..........
        ........................
        ........................
        ........................
        ........................
        `],
    100,
    characterAnimations.rule(Predicate.MovingUp)
    )
    characterAnimations.runFrames(
    Enemy3,
    [img`
        ........................
        ........................
        ........................
        ........................
        ..........ffff..........
        ........ff1111ff........
        .......fb111111bf.......
        .......f11111111f.......
        ......fd11111111df......
        ......fd11111111df......
        ......fddd1111dddf......
        ......fbdbfddfbdbf......
        ......fcdcf11fcdcf......
        .......fb111111bf.......
        ......fffcdb1bdffff.....
        ....fc111cbfbfc111cf....
        ....f1b1b1ffff1b1b1f....
        ....fbfbffffffbfbfbf....
        .........ffffff.........
        ...........fff..........
        ........................
        ........................
        ........................
        ........................
        `,img`
        ........................
        ........................
        ........................
        ........................
        ..........ffff..........
        ........ff1111ff........
        .......fb111111bf.......
        .......f11111111f.......
        ......fd11111111df......
        ......fd11111111df......
        ......fddd1111dddf......
        ......fbdbfddfbdbf......
        ......fcdcf11fcdcf......
        .......fb111111ffff.....
        ......fffcdb1bc111cf....
        ....fc111cbfbf1b1b1f....
        ....f1b1b1ffffbfbfbf....
        ....fbfbfffffff.........
        .........fffff..........
        ..........fff...........
        ........................
        ........................
        ........................
        ........................
        `,img`
        ........................
        ........................
        ........................
        ........................
        ..........ffff..........
        ........ff1111ff........
        .......fb111111bf.......
        .......f11111111f.......
        ......fd11111111df......
        ......fd11111111df......
        ......fddd1111dddf......
        ......fbdbfddfbdbf......
        ......fcdcf11fcdcf......
        .......fb111111bf.......
        ......fffcdb1bdffff.....
        ....fc111cbfbfc111cf....
        ....f1b1b1ffff1b1b1f....
        ....fbfbffffffbfbfbf....
        .........ffffff.........
        ...........fff..........
        ........................
        ........................
        ........................
        ........................
        `,img`
        ........................
        ........................
        ........................
        ........................
        ..........ffff..........
        ........ff1111ff........
        .......fb111111bf.......
        .......f11111111f.......
        ......fd11111111df......
        ......fd11111111df......
        ......fddd1111dddf......
        ......fbdbfddfbdbf......
        ......fcdcf11fcdcf......
        .....ffff111111bf.......
        ....fc111cdb1bdfff......
        ....f1b1bcbfbfc111cf....
        ....fbfbfbffff1b1b1f....
        .........fffffffbfbf....
        ..........fffff.........
        ...........fff..........
        ........................
        ........................
        ........................
        ........................
        `],
    100,
    characterAnimations.rule(Predicate.MovingDown)
    )
    Enemy3.follow(mySprite, 40)
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
controller.moveSprite(mySprite, 100, 0)
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
Lev1()
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
