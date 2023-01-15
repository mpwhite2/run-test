@namespace
class SpriteKind:
    Blocker = SpriteKind.create()
    Boss = SpriteKind.create()
    Fire = SpriteKind.create()
    Bomb = SpriteKind.create()

def on_overlap_tile(sprite, location):
    game.over(False)
scene.on_overlap_tile(SpriteKind.player,
    assets.tile("""
        myTile0
    """),
    on_overlap_tile)

def on_on_overlap(sprite2, otherSprite):
    sprite2.destroy()
    info.change_score_by(1)
sprites.on_overlap(SpriteKind.enemy, SpriteKind.Bomb, on_on_overlap)

def on_overlap_tile2(sprite3, location2):
    music.jump_up.play()
    game.show_long_text("You have completed a level! ", DialogLayout.BOTTOM)
    sprites.destroy_all_sprites_of_kind(SpriteKind.enemy)
    sprites.destroy_all_sprites_of_kind(SpriteKind.food)
    statusbar.value = 100
    if Level == 1:
        Lev2()
    elif Level == 2:
        Lev3()
    elif Level == 3:
        Lev4()
scene.on_overlap_tile(SpriteKind.player,
    assets.tile("""
        myTile1
    """),
    on_overlap_tile2)

def on_up_pressed():
    if characterAnimations.matches_rule(mySprite3,
        characterAnimations.rule(Predicate.HITTING_WALL_DOWN)) and statusbar.value > 0:
        mySprite3.vy = -150
        statusbar.value += -10
controller.up.on_event(ControllerButtonEvent.PRESSED, on_up_pressed)

def CreateEnemy2(Col: number, Row: number):
    global Enemy2
    Enemy2 = sprites.create(img("""
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
        """),
        SpriteKind.enemy)
    tiles.place_on_tile(Enemy2, tiles.get_tile_location(Col, Row))
    animation.run_image_animation(Enemy2,
        [img("""
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
            """),
            img("""
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
            """)],
        200,
        True)
    Enemy2.follow(mySprite3, 50)

def on_b_pressed():
    global Bomb2, projectile3
    Bomb2 = sprites.create(img("""
            . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . d . . . . . 
                    . . . . . . . . . d . 4 . . . . 
                    . . . . . . . . d . . . . . . . 
                    . . . . . . . f f . . . . . . . 
                    . . . . . . f f f f . . . . . . 
                    . . . . . f f f f f f . . . . . 
                    . . . . f f f f f f f f . . . . 
                    . . . . f f f f f f f f . . . . 
                    . . . . . f f f f f f . . . . . 
                    . . . . . . f f f f . . . . . . 
                    . . . . . . . f f . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . .
        """),
        SpriteKind.Bomb)
    Bomb2.set_flag(SpriteFlag.GHOST, True)
    Bomb2.set_flag(SpriteFlag.GHOST_THROUGH_TILES, True)
    Bomb2.set_position(mySprite3.x, mySprite3.y)
    Bomb2.start_effect(effects.fire)
    animation.run_image_animation(Bomb2,
        [img("""
                . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . d . . . . . 
                        . . . . . . . . . d . 2 . . . . 
                        . . . . . . . . d . . . . . . . 
                        . . . . . . . f f . . . . . . . 
                        . . . . . . f f f f . . . . . . 
                        . . . . . f f f f f f . . . . . 
                        . . . . f f f f f f f f . . . . 
                        . . . . f f f f f f f f . . . . 
                        . . . . . f f f f f f . . . . . 
                        . . . . . . f f f f . . . . . . 
                        . . . . . . . f f . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . .
            """),
            img("""
                . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . 2 . . . . . 
                        . . . . . . . . . d . . . . . . 
                        . . . . . . . . d . . . . . . . 
                        . . . . . . . f f . . . . . . . 
                        . . . . . . f f f f . . . . . . 
                        . . . . . f f f f f f . . . . . 
                        . . . . f f f f f f f f . . . . 
                        . . . . f f f f f f f f . . . . 
                        . . . . . f f f f f f . . . . . 
                        . . . . . . f f f f . . . . . . 
                        . . . . . . . f f . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . .
            """),
            img("""
                . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . 2 . . . . . . 
                        . . . . . . . . d . . . . . . . 
                        . . . . . . . f f . . . . . . . 
                        . . . . . . f f f f . . . . . . 
                        . . . . . f f f f f f . . . . . 
                        . . . . f f f f f f f f . . . . 
                        . . . . f f f f f f f f . . . . 
                        . . . . . f f f f f f . . . . . 
                        . . . . . . f f f f . . . . . . 
                        . . . . . . . f f . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . .
            """),
            img("""
                . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . 2 . . . . . . . 
                        . . . . . . . f f . . . . . . . 
                        . . . . . . f f f f . . . . . . 
                        . . . . . f f f f f f . . . . . 
                        . . . . f f f f f f f f . . . . 
                        . . . . f f f f f f f f . . . . 
                        . . . . . f f f f f f . . . . . 
                        . . . . . . f f f f . . . . . . 
                        . . . . . . . f f . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . .
            """),
            img("""
                . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . 2 2 . . . . . . . 
                        . . . . . . 2 2 2 2 . . . . . . 
                        . . . . . 2 2 2 2 2 2 . . . . . 
                        . . . . 2 2 2 2 2 2 2 2 . . . . 
                        . . . . 2 2 2 2 2 2 2 2 . . . . 
                        . . . . . 2 2 2 2 2 2 . . . . . 
                        . . . . . . 2 2 2 2 . . . . . . 
                        . . . . . . . 2 2 . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . .
            """)],
        200,
        False)
    pause(1000)
    Bomb2.set_flag(SpriteFlag.GHOST, False)
    Bomb2.set_image(img("""
        ............222222222222222.............
                ...........222222222222222222...........
                ..........222222222222222222222.........
                .......22222222222222f2222222222........
                .....2222222222222222222222222222.......
                ....222222222222222222222222222222......
                ...2222222422222222222222224222222......
                ..222222222222222222222222222222222.....
                ..2222222222222222222222222222222222....
                .2222222222222f222222222222222222222....
                .22222222222222222222222222222225222222.
                .2222222f222222222222222522222222222222.
                22222222222222222222222222f222222222222.
                222222222222222222242222222222222222222.
                222222222222222222222222222222222222222.
                222222222222522222222222222222222222222.
                222222222222222222222222222222222222222.
                222422222222222222222222222222222222222.
                222222222222222f2222222222f222222222222.
                222222222222222222224222222222222422222.
                222222f22222222222222222222222222222222.
                222222222222222222222222222222222222222.
                222222222222224222222222222222222222222.
                22222222222222222222222222222222222222..
                222222222222222222222222222222222f2222..
                22222222222222222222f22222222222222222..
                22222252222222222222222222222222222222..
                22222222222222222222222222222222222222..
                2222222222222f222222222222252222222222..
                .2222222222222222222222222222222222222..
                .22222222222222222222222222222222222....
                ..2222222222222222222222222f22222222....
                ..2222222222222222222222222222222222....
                ..2222222222222222222222222222222222....
                ...222222222222f22222222222222222222....
                ....22222222222222222222222222222222....
                .....222222222222222225222222222222.....
                ........2222222222222222222252222.......
                ...........222222522222222222222........
                .............222222222222222222.........
    """))
    Bomb2.x += -12
    Bomb2.y += -12
    music.big_crash.play()
    for index in range(10):
        projectile3 = sprites.create_projectile_from_sprite(img("""
                . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . 4 . . . . . 
                            . . . . 2 . . . . 4 4 . . . . . 
                            . . . . 2 4 . . 4 5 4 . . . . . 
                            . . . . . 2 4 d 5 5 4 . . . . . 
                            . . . . . 2 5 5 5 5 4 . . . . . 
                            . . . . . . 2 5 5 5 5 4 . . . . 
                            . . . . . . 2 5 4 2 4 4 . . . . 
                            . . . . . . 4 4 . . 2 4 4 . . . 
                            . . . . . 4 4 . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . .
            """),
            Bomb2,
            randint(-200, 200),
            randint(-200, 200))
        projectile3.set_kind(SpriteKind.Bomb)
        projectile3.set_flag(SpriteFlag.AUTO_DESTROY, False)
    pause(1000)
    Bomb2.destroy()
    sprites.destroy_all_sprites_of_kind(SpriteKind.Bomb)
controller.B.on_event(ControllerButtonEvent.PRESSED, on_b_pressed)

def on_on_overlap2(sprite4, otherSprite2):
    sprite4.destroy()
sprites.on_overlap(SpriteKind.projectile, SpriteKind.Fire, on_on_overlap2)

def on_button_pressed():
    controller.move_sprite(mySprite3, 100, 0)
controller.any_button.on_event(ControllerButtonEvent.PRESSED, on_button_pressed)

def Lev2():
    global Level
    Level = 2
    tiles.set_current_tilemap(tilemap("""
        level2
    """))
    tiles.place_on_tile(mySprite3, tiles.get_tile_location(3, 5))
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

def on_on_overlap3(sprite5, otherSprite3):
    game.over(False)
sprites.on_overlap(SpriteKind.player, SpriteKind.Fire, on_on_overlap3)

def MoveEnemy(mySprite: Sprite):
    
    def on_forever():
        if mySprite.is_hitting_tile(CollisionDirection.LEFT) or mySprite.is_hitting_tile(CollisionDirection.RIGHT) or (mySprite.is_hitting_tile(CollisionDirection.TOP) or mySprite.is_hitting_tile(CollisionDirection.BOTTOM)):
            if Math.percent_chance(25):
                mySprite.vx = 50
            elif Math.percent_chance(33.33):
                mySprite.vx = -50
            elif Math.percent_chance(50):
                mySprite.vy = 50
            else:
                mySprite.vy = -50
    forever(on_forever)
    

def on_a_pressed():
    global projectile
    if Right:
        projectile = sprites.create_projectile_from_sprite(img("""
                . . . . . . 
                            . . . . . . 
                            e . . . e . 
                            e e e e e e 
                            e . . . e . 
                            . . . . . . 
                            . . . . . .
            """),
            mySprite3,
            200,
            0)
        music.knock.play()
        projectile.set_kind(SpriteKind.projectile)
    if Left:
        projectile = sprites.create_projectile_from_sprite(img("""
                . . . . . . 
                            . . . . . . 
                            . e . . . e 
                            e e e e e e 
                            . e . . . e 
                            . . . . . . 
                            . . . . . .
            """),
            mySprite3,
            -200,
            0)
        music.knock.play()
        projectile.set_kind(SpriteKind.projectile)
controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)

def Lev3():
    global Level
    Level = 3
    tiles.set_current_tilemap(tilemap("""
        level3
    """))
    tiles.place_on_tile(mySprite3, tiles.get_tile_location(3, 4))
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

def on_on_overlap4(sprite6, otherSprite4):
    global BossHealth
    BossHealth += -1
    sprite6.destroy()
    otherSprite4.start_effect(effects.ashes, 250)
    info.change_score_by(1)
sprites.on_overlap(SpriteKind.projectile, SpriteKind.Boss, on_on_overlap4)

def on_on_overlap5(sprite7, otherSprite5):
    sprite7.destroy(effects.ashes, 500)
    otherSprite5.destroy()
    info.change_score_by(1)
sprites.on_overlap(SpriteKind.enemy, SpriteKind.projectile, on_on_overlap5)

def on_on_overlap6(sprite8, otherSprite6):
    global BossHealth
    BossHealth += -8
    info.change_score_by(8)
    sprites.destroy_all_sprites_of_kind(SpriteKind.Bomb)
    pause(1000)
sprites.on_overlap(SpriteKind.Bomb, SpriteKind.Boss, on_on_overlap6)

def Lev1():
    global Level
    Level = 1
    tiles.set_current_tilemap(tilemap("""
        level1
    """))
    CreateEnemy(28, 5)
    CreateEnemy(28, 5)
    CreateEnemy(28, 4)
    CreateEnemy(8, 5)
    CreateEnemy(16, 2)
    CreateEnemy(20, 16)
    CreateEnemy(3, 2)
    doSomething()

def on_hit_wall(sprite9, location3):
    tiles.set_tile_at(location3, assets.tile("""
        transparency16
    """))
    tiles.set_wall_at(location3, False)
scene.on_hit_wall(SpriteKind.Boss, on_hit_wall)

def doSomething():
    global mySprite2
    for index2 in range(2):
        mySprite2 = sprites.create(img("""
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
            """),
            SpriteKind.food)
        tiles.place_on_random_tile(mySprite2, assets.tile("""
            transparency16
        """))

def on_on_overlap7(sprite10, otherSprite7):
    game.over(False)
sprites.on_overlap(SpriteKind.player, SpriteKind.Bomb, on_on_overlap7)

def on_down_pressed():
    global Loc, Build
    if Build > 1.5:
        if mySprite3.tile_kind_at(TileDirection.TOP, assets.tile("""
            myTile
        """)):
            game.over(False)
        Loc = mySprite3.tilemap_location()
        tiles.set_tile_at(Loc, assets.tile("""
            myTile
        """))
        tiles.set_wall_at(Loc, True)
        mySprite3.y += -16
        Build += -1.5
controller.down.on_event(ControllerButtonEvent.PRESSED, on_down_pressed)

def on_overlap_tile3(sprite11, location4):
    game.over(True)
scene.on_overlap_tile(SpriteKind.player,
    assets.tile("""
        myTile2
    """),
    on_overlap_tile3)

def CreateEnemy3(Col2: number, Row2: number):
    global Enemy3
    Enemy3 = sprites.create(img("""
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
        """),
        SpriteKind.Boss)
    characterAnimations.loop_frames(Enemy3,
        [img("""
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
            """),
            img("""
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
            """),
            img("""
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
            """),
            img("""
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
            """),
            img("""
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
            """),
            img("""
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
            """)],
        50,
        characterAnimations.rule(Predicate.MOVING_LEFT))
    characterAnimations.loop_frames(Enemy3,
        [img("""
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
            """),
            img("""
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
            """),
            img("""
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
            """),
            img("""
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
            """),
            img("""
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
            """),
            img("""
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
            """)],
        50,
        characterAnimations.rule(Predicate.MOVING_RIGHT))
    Enemy3.follow(mySprite3, 20, 200)
    Enemy3.set_flag(SpriteFlag.GHOST_THROUGH_WALLS, True)
    tiles.place_on_tile(Enemy3, tiles.get_tile_location(Col2, Row2))

def on_on_overlap8(sprite12, otherSprite8):
    global Build
    tiles.place_on_random_tile(otherSprite8, assets.tile("""
        transparency16
    """))
    Build += 10
    statusbar.value = 100
sprites.on_overlap(SpriteKind.player, SpriteKind.food, on_on_overlap8)

def on_hit_wall2(sprite13, location5):
    global Build
    tiles.set_tile_at(location5, assets.tile("""
        transparency16
    """))
    tiles.set_wall_at(location5, False)
    sprite13.destroy()
    Build += 1
scene.on_hit_wall(SpriteKind.projectile, on_hit_wall2)

def Lev4():
    global Level
    Level = 4
    tiles.set_current_tilemap(tilemap("""
        level0
    """))
    tiles.place_on_tile(mySprite3, tiles.get_tile_location(4, 3))
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
    CreateEnemy(8, 14)
    CreateEnemy(49, 10)
    CreateEnemy2(54, 14)
    CreateEnemy2(57, 8)
    CreateEnemy2(30, 14)
    CreateEnemy2(56, 9)
    CreateEnemy2(21, 3)
    CreateEnemy2(49, 1)
    doSomething()
def CreateEnemy(Col3: number, Row3: number):
    global Enemy1
    Enemy1 = sprites.create(img("""
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
        """),
        SpriteKind.enemy)
    animation.run_image_animation(Enemy1,
        [img("""
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
            """),
            img("""
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
            """)],
        500,
        True)
    Enemy1.vx = -50
    MoveEnemy(Enemy1)
    tiles.place_on_tile(Enemy1, tiles.get_tile_location(Col3, Row3))

def on_on_overlap9(sprite14, otherSprite9):
    game.over(False)
sprites.on_overlap(SpriteKind.player, SpriteKind.enemy, on_on_overlap9)

def on_on_overlap10(sprite15, otherSprite10):
    game.over(False)
sprites.on_overlap(SpriteKind.player, SpriteKind.Boss, on_on_overlap10)

projectile2: Sprite = None
Enemy1: Sprite = None
Enemy3: Sprite = None
Loc: tiles.Location = None
mySprite2: Sprite = None
projectile: Sprite = None
projectile3: Sprite = None
Bomb2: Sprite = None
Enemy2: Sprite = None
Level = 0
Build = 0
statusbar: StatusBarSprite = None
mySprite3: Sprite = None
OldX = 0
Left = False
Right = False
mySprite3 = sprites.create(assets.image("""
    Player
"""), SpriteKind.player)
scene.set_background_color(12)
statusbar = statusbars.create(20, 4, StatusBarKind.energy)
statusbar.set_stay_in_screen(True)
statusbar.set_color(7, 2)
statusbar.attach_to_sprite(mySprite3)
statusbar.max = 100
Left = False
Right = False
info.set_score(0)
Build = 0
Level = 0
mySprite3.set_velocity(0, 0)
BossHealth = 20
# Select Level//** 
Lev1()

def on_update_interval():
    mySprite3.vy += 5
game.on_update_interval(30, on_update_interval)

def on_forever2():
    music.play_melody("C E D C C5 C - - ", 120)
forever(on_forever2)

def on_forever3():
    global Right, Left
    statusbar.position_direction(CollisionDirection.TOP)
    scene.camera_follow_sprite(mySprite3)
    characterAnimations.loop_frames(mySprite3,
        [img("""
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
            """),
            img("""
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
            """),
            img("""
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
            """),
            img("""
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
            """)],
        100,
        characterAnimations.rule(Predicate.MOVING_LEFT))
    characterAnimations.loop_frames(mySprite3,
        [img("""
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
            """),
            img("""
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
            """),
            img("""
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
            """),
            img("""
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
            """)],
        100,
        characterAnimations.rule(Predicate.MOVING_RIGHT))
    if characterAnimations.matches_rule(mySprite3,
        characterAnimations.rule(Predicate.MOVING_RIGHT, Predicate.MOVING_UP)):
        mySprite3.set_image(img("""
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
        """))
    if characterAnimations.matches_rule(mySprite3,
        characterAnimations.rule(Predicate.MOVING_LEFT, Predicate.MOVING_UP)):
        mySprite3.set_image(img("""
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
        """))
    if characterAnimations.matches_rule(mySprite3, characterAnimations.rule(Predicate.MOVING_RIGHT)):
        Right = True
        Left = False
    if characterAnimations.matches_rule(mySprite3, characterAnimations.rule(Predicate.MOVING_LEFT)):
        Left = True
        Right = False
forever(on_forever3)

def on_forever4():
    if BossHealth < 1:
        sprites.destroy_all_sprites_of_kind(SpriteKind.Boss, effects.fire, 500)
forever(on_forever4)

def on_update_interval2():
    global projectile2
    if Level == 4 and BossHealth > 0:
        projectile2 = sprites.create_projectile_from_sprite(img("""
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
            """),
            Enemy3,
            50,
            50)
        projectile2.set_kind(SpriteKind.Fire)
        projectile2.follow(mySprite3, 50)
        projectile2.set_flag(SpriteFlag.DESTROY_ON_WALL, True)
game.on_update_interval(500, on_update_interval2)

def on_overlap_tile4(sprite16, location6):
    global Build
    sprite16.destroy()
    tiles.set_tile_at(location6, assets.tile("""
        transparency16
    """))
    Build += 1
scene.on_overlap_tile(SpriteKind.Bomb,
    assets.tile("""
        myTile
    """),
    on_overlap_tile4)
