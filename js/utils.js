function rectangularCollision({
    playerRectangular, enemyRectangular
}) {
    return (
        playerRectangular.atackBox.position.x + playerRectangular.atackBox.width >= enemyRectangular.position.x
        && playerRectangular.atackBox.position.x <= enemyRectangular.position.x + enemyRectangular.width
        && playerRectangular.atackBox.position.y + playerRectangular.atackBox.height >= enemyRectangular.position.y
        && playerRectangular.atackBox.position.y <= enemyRectangular.position.y + enemyRectangular.height
    )
}

function determineWinner({ player, enemy, timerID }) {
    clearTimeout(timerID)
    document.querySelector('#displayText').style.display = 'flex'
    if (player.health === enemy.health) {
        document.querySelector('#displayText').innerHTML = 'Tie'
    } else if (player.health > enemy.health) {
        document.querySelector('#displayText').innerHTML = 'Player 1 Wins'
    } else if (player.health < enemy.health) {
        console.log('test')
        document.querySelector('#displayText').innerHTML = 'Player 2 Wins'
    }
}

let timer = 60
let timerID
function decreaseTimer() {
    if (timer > 0) {
        timerID = setTimeout(decreaseTimer, 1000)
        timer--
        document.querySelector('#timer').innerHTML = timer;
    }
    if (timer === 0) {
        determineWinner({player, enemy, timerID});
    }

}