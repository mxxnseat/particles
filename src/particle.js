import config from "./config";

export default class Particle {
    constructor() {
        this.init();
        this.radius = Math.random() * (config.particleMaxRadius - config.particleMinRadius) + config.particleMinRadius;

    }
    init() {
        this.x = Math.random() * GL.w;
        this.y = Math.random() * GL.h;
        this.dirX = Math.random() * (config.particleVelocity * 2) - config.particleVelocity;
        this.dirY = Math.random() * (config.particleVelocity * 2) - config.particleVelocity;

        if (this.x < 0 || this.x > GL.w || this.y < 0 || this.y > GL.h) return this.init();

        this.draw();
    }
    changeDirection(clientCursorCord) {
        if(clientCursorCord.x<this.x){
            this.dirX *=-1;
            this.x +=20;
        }
        else if(clientCursorCord.x>this.x){
            this.dirX *=-1;
            this.x -=20;
        }
        if(clientCursorCord.y<this.y){
            this.dirY *=-1;
            this.y +=20;
        }
        else if(clientCursorCord.y>this.y){
            this.dirY *=-1;
            this.y -=20;
        }
        
    }
    move() {
        if (this.x < this.radius || this.x > GL.w) this.dirX *= -1;
        if (this.y < this.radius || this.y > GL.h) this.dirY *= -1;

        if (this.x < this.radius){
            this.x = this.radius;
        }else if(this.x > GL.w) this.x = GL.w;

        if (this.y < this.radius){
            this.y = this.radius;
        }else if(this.y > GL.h) this.y = GL.h;
        
        

        this.x += this.dirX;
        this.y += this.dirY;
    }
    getCord() {
        return { x: this.x, y: this.y };
    }
    draw() {
        const { ctx } = GL;
        this.move();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fillStyle = config.particleColor;
        ctx.lineWidth = config.outlineWidth;
        ctx.strokeStyle = config.outlineColor;
        ctx.stroke();
        ctx.fill()
    }
}