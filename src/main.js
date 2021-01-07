import "./windowSettings";
import config from "./config";
import Particle from "./particle";

class Main {
    constructor() {
        this.particles = []

        this.init();
    }
    init() {
        for (let i = 0; i < config.particlesCount; i++) {
            this.particles.push(new Particle());
        }
        window.addEventListener("mousemove", (e) => {
            let array = [];
            for(let i = 0;i<config.particlesCount;i++){
                if(e.clientX >= this.particles[i].x-50 && e.clientX <= this.particles[i].x+50 &&
                    e.clientY >= this.particles[i].y-50 && e.clientY <= this.particles[i].y+50){
                    array.push(this.particles[i]);
                }
            }

            if(array.length){
                array.map(i=>i.changeDirection({
                    x:e.clientX,
                    y:e.clientY
                }))
            }
            array = [];
        })
        this.loop();
    }
    connect() {
        const { ctx } = GL;
        for (let i of this.particles) {
            let x1 = i.getCord().x;
            let y1 = i.getCord().y;

            for (let k of this.particles) {

                let x2 = k.getCord().x;
                let y2 = k.getCord().y;
                let dd = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
                let alpha = 1 - dd / config.maxDistance;
                if (dd > config.maxDistance) continue;
                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.lineWidth = config.particleLineWidth;
                ctx.strokeStyle = config.lineColor+`${alpha})`;
                ctx.stroke();
            }
        }
    }
    clear(){
        const {ctx} = GL;
        ctx.fillStyle = config.backgroundColor;
        ctx.fillRect(0, 0, GL.w, GL.h);
    }
    draw() {

        const { ctx } = GL;
        this.clear();
        this.connect();
        for (let i of this.particles) {
            i.draw();
        }
    }
    loop() {
        this.draw();

        requestAnimationFrame(() => this.loop());
    }
}

new Main();