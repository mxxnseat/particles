const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

let w = canvas.width = innerWidth;
let h = canvas.height = innerHeight;

window.addEventListener("resize", () => {
    w = canvas.width = innerWidth;
    h = canvas.height = innerHeight;
    window.GL.w = w;
    window.GL.h = h;
})

export default window.GL = {
    w,
    h,
    ctx
}