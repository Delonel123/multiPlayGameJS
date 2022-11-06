class Sprite {
    constructor({ position, imageSrc, scale = 1, frameMax = 1 }) {
        this.position = position
        this.width = 50
        this.height = 150
        this.image = new Image()
        this.image.src = imageSrc
        this.scale = scale
        this.frameMax = frameMax
        this.framesCurrent = 0
        this.frameElapsed = 0;
        this.framesHold = 5
    }

    draw() {
        c.drawImage(
            this.image,
            this.framesCurrent * (this.image.width / this.frameMax),
            0,
            this.image.width / this.frameMax,
            this.image.height,

            this.position.x,
            this.position.y,
            (this.image.width / this.frameMax) * this.scale,
            this.image.height * this.scale)
    }

    update() {
        this.draw()
        this.frameElapsed++;
        if (this.frameElapsed % this.framesHold === 0) {
            if (this.framesCurrent < this.frameMax - 1) {
                this.framesCurrent++
            } else {
                this.framesCurrent = 0
            }
        }
    }

}

class Fighter {
    constructor({ position, velocity, color = 'red', offset }) {
        this.position = position
        this.velocity = velocity
        this.width = 50
        this.height = 150
        this.lastKey
        this.atackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset,
            width: 100,
            height: 50,
        }
        this.color = color,
            this.isAtacking = false,
            this.health = 100
    }

    draw() {
        c.fillStyle = this.color
        c.fillRect(this.position.x, this.position.y, this.width, this.height)


        // atack box
        if (this.isAtacking) {
            c.fillStyle = 'green'
            c.fillRect(this.atackBox.position.x, this.atackBox.position.y, this.atackBox.width, this.atackBox.height)
        }
    }

    update() {
        this.draw()

        this.atackBox.position.x = this.position.x + this.atackBox.offset.x
        this.atackBox.position.y = this.position.y

        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;

        if (this.position.y + this.height + this.velocity.y >= canvas.height - 96) {
            this.velocity.y = 0;
        } else {
            this.velocity.y += gravity;
        }
    }

    attack() {
        this.isAtacking = true;
        setTimeout(() => {
            this.isAtacking = false;
        }, 100)
    }
}