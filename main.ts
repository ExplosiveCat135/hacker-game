sprites.onOverlap(SpriteKind.Food, SpriteKind.Projectile, function (sprite, otherSprite) {
    sprite.destroy()
    otherSprite.destroy()
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Projectile, function (sprite, otherSprite) {
    info.changeScoreBy(-1)
    scene.cameraShake(3, 200)
    otherSprite.destroy(effects.fire, 200)
    sprites.destroyAllSpritesOfKind(SpriteKind.Food, effects.fire, 500)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    info.changeScoreBy(1)
    if (info.score() >= NextLevel) {
        NextLevel += 5
        info.startCountdown(15)
        BackgroundColour += 1
        scene.setBackgroundColor(BackgroundColour)
        mainPlayer.sayText("Level up!", 1000, false)
        FoodChance = FoodChance * 0.9
        EnemyChance = EnemyChance * 1.1
    }
    otherSprite.destroy(effects.hearts, 200)
})
let projectile: Sprite = null
let Food1: Sprite = null
let BackgroundColour = 0
let NextLevel = 0
let FoodChance = 0
let EnemyChance = 0
let mainPlayer: Sprite = null
mainPlayer = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . 7 . . 7 . 7 7 7 7 . 7 7 7 7 
    . . 7 . . 7 . 7 . . 7 . 7 . . . 
    . . 7 7 7 7 . 7 7 7 7 . 7 . . . 
    . . 7 . . 7 . 7 . . 7 . 7 . . . 
    . . 7 . . 7 . 7 . . 7 . 7 7 7 7 
    . . . . . . . . . . . . . . . . 
    . . 7 . . 7 . 7 7 7 7 . 7 7 7 7 
    . . 7 . 7 . . 7 . . . . 7 . . 7 
    . . 7 7 . . . 7 7 7 7 . 7 7 7 7 
    . . 7 . 7 . . 7 . . . . 7 7 . . 
    . . 7 . . 7 . 7 7 7 7 . 7 . 7 . 
    `, SpriteKind.Player)
let FoodList = [img`
    . . . . . . . . . . . . . . . . 
    . 5 5 5 5 . 5 . . . 5 . 5 5 5 5 
    . 5 . . . . . 5 . 5 . . 5 . . 5 
    . 5 5 5 5 . . . 5 . . . 5 5 5 5 
    . 5 . . . . . 5 . 5 . . 5 . . . 
    . 5 5 5 5 . 5 . . . 5 . 5 . . . 
    . . . . . . . . . . . . . . . . 
    . 5 . . . . 5 5 5 5 5 . 5 5 5 . 
    . 5 . . . . 5 . . . 5 . . 5 . . 
    . 5 . . . . 5 . . . 5 . . 5 . . 
    . 5 . . . . 5 . . . 5 . . 5 . . 
    . 5 5 5 5 . 5 5 5 5 5 . 5 5 5 . 
    . . . . . . . . . . . . . . . . 
    . 5 5 5 5 5 . . . . . . . . . . 
    . . . 5 . . . . . . . . . . . . 
    . . . 5 . . . . . . . . . . . . 
    `]
let EnemyList = [img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    2 2 2 2 . . 2 . . . 2 . 2 2 2 2 
    2 . . . 2 . 2 . . . 2 . 2 . . . 
    2 . . . 2 . 2 . . . 2 . 2 . . . 
    2 2 2 2 2 . 2 . . . 2 . 2 . 2 2 
    2 . . . 2 . 2 . . . 2 . 2 . . 2 
    2 . . . 2 . 2 . . . 2 . 2 . . 2 
    2 2 2 2 . . 2 2 2 2 2 . 2 2 2 2 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `]
let SpecialList = [assets.image`myImage`]
game.splash("You are the HACKER. ", "Use the arrows to move.")
game.splash("Collect the EXPLOITS.", "Avoid the BUGS.")
mainPlayer.setStayInScreen(true)
controller.moveSprite(mainPlayer, 100, 100)
info.startCountdown(15)
EnemyChance = 20
FoodChance = 80
let SpecialChance = 10
NextLevel = 5
BackgroundColour = 0
game.onUpdateInterval(500, function () {
    if (Math.percentChance(FoodChance)) {
        Food1 = sprites.create(FoodList._pickRandom(), SpriteKind.Food)
        Food1.setPosition(randint(10, 130), randint(10, 130))
        Food1.setVelocity(randint(-20, 20), randint(-20, 20))
        Food1.setBounceOnWall(true)
    }
    if (Math.percentChance(EnemyChance)) {
        projectile = sprites.createProjectileFromSide(EnemyList._pickRandom(), 0, 25)
        projectile.x = randint(10, 100)
    }
})
