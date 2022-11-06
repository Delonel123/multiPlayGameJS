const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height)

const gravity = 0.7

const backGroundImage = new Sprite({
    position: {
        x: 0,
        y: 0,
    },
    imageSrc: './images/background.png'
})

const shopImage = new Sprite({
    position: {
        x: 600,
        y: 128,
    },
    imageSrc: './images/shop.png',
    scale: 2.75,
    frameMax: 6
})

const player = new Fighter({
    position: {
        x: 0,
        y: 0,
    },
    velocity: {
        x: 0,
        y: 1,
    },
    offset: {
        x: 0,
        y: 0,
    }
})


const enemy = new Fighter({
    position: {
        x: 400,
        y: 0,
    },
    velocity: {
        x: 0,
        y: 10,
    },
    offset: {
        x: -50,
        y: 0,
    },
    color: 'blue'
})

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowUp: {
        pressed: false
    },
}



decreaseTimer()

function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height);

    backGroundImage.update()
    shopImage.update()
    player.update()
    enemy.update()

    player.velocity.x = 0
    enemy.velocity.x = 0;

    //player movement
    if (keys.d.pressed && player.lastKey === 'd') {
        player.velocity.x = 5;
    } else if (keys.a.pressed && player.lastKey === 'a') {
        player.velocity.x = -5;
    }

    //enemy movement
    if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.velocity.x = 5;
    } else if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        enemy.velocity.x = -5;
    }

    // deteck for collision
    if (
        rectangularCollision({
            playerRectangular: player,
            enemyRectangular: enemy
        }) && player.isAtacking) {
        player.isAtacking = false;
        enemy.health -= 20;
        document.querySelector('#enemyHelth').style.width = `${enemy.health}%`
        console.log('Player attack');
    }

    if (
        rectangularCollision({
            playerRectangular: enemy,
            enemyRectangular: player
        }) && enemy.isAtacking) {
        enemy.isAtacking = false;
        player.health -= 20;
        document.querySelector('#playerHelth').style.width = `${player.health}%`
        console.log('Enemy attack');
    }

    // end game 
    if (enemy.health <= 0 || player.health <= 0) {
        determineWinner({player, enemy, timerID});
        
    }
}

animate()


window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = true;
            player.lastKey = 'd'
            break;
        case 'a':
            keys.a.pressed = true;
            player.lastKey = 'a'
            break;
        case 'w':
            player.velocity.y = -20;
            break;
        case ' ':
            player.attack();
            break;

        case 'ArrowRight':
            keys.ArrowRight.pressed = true;
            enemy.lastKey = 'ArrowRight'
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true;
            enemy.lastKey = 'ArrowLeft'
            break;
        case 'ArrowUp':
            enemy.velocity.y = -20;
            break;
        case 'ArrowDown':
            enemy.attack()
            break;
    }
})

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = false;
            break;
        case 'a':
            keys.a.pressed = false;
            break;
        case 'w':
            keys.w.pressed = false;
            break;
    }

    //enemy keys
    switch (event.key) {
        case 'ArrowRight':
            keys.ArrowRight.pressed = false;
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false;
            break;
        case 'ArrowUp':
            keys.ArrowUp.pressed = false;
            break;
    }
})

