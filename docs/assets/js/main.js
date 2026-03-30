const canvas = document.getElementById("fluid-canvas");
const ctx = canvas.getContext("2d");

let w = canvas.width = window.innerWidth;
let h = canvas.height = window.innerHeight;

const pointer = {
  x: w / 2,
  y: h / 2,
  tx: w / 2,
  ty: h / 2
};

const particles = [];
const PARTICLE_COUNT = 70;

for (let i = 0; i < PARTICLE_COUNT; i++) {
  particles.push({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    r: Math.random() * 2.2 + 1.2
  });
}

function resizeCanvas() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);

window.addEventListener("mousemove", (e) => {
  pointer.tx = e.clientX;
  pointer.ty = e.clientY;
});

window.addEventListener("touchmove", (e) => {
  if (e.touches[0]) {
    pointer.tx = e.touches[0].clientX;
    pointer.ty = e.touches[0].clientY;
  }
}, { passive: true });

function drawBackgroundGlow() {
  const grad = ctx.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, 260);
  grad.addColorStop(0, "rgba(164, 140, 255, 0.20)");
  grad.addColorStop(0.35, "rgba(110, 180, 255, 0.12)");
  grad.addColorStop(1, "rgba(13, 15, 20, 0)");

  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(pointer.x, pointer.y, 260, 0, Math.PI * 2);
  ctx.fill();
}

function connectParticles() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 120) {
        ctx.strokeStyle = `rgba(180, 200, 255, ${0.08 * (1 - dist / 120)})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
}

function updateParticles() {
  for (const p of particles) {
    const dx = pointer.x - p.x;
    const dy = pointer.y - p.y;
    const dist = Math.sqrt(dx * dx + dy * dy) || 1;

    if (dist < 220) {
      p.vx += dx / dist * 0.003;
      p.vy += dy / dist * 0.003;
    }

    p.x += p.vx;
    p.y += p.vy;

    p.vx *= 0.985;
    p.vy *= 0.985;

    if (p.x < -20) p.x = w + 20;
    if (p.x > w + 20) p.x = -20;
    if (p.y < -20) p.y = h + 20;
    if (p.y > h + 20) p.y = -20;

    ctx.beginPath();
    ctx.fillStyle = "rgba(220, 230, 255, 0.55)";
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
  }
}

function animate() {
  pointer.x += (pointer.tx - pointer.x) * 0.08;
  pointer.y += (pointer.ty - pointer.y) * 0.08;

  ctx.clearRect(0, 0, w, h);

  const bg = ctx.createLinearGradient(0, 0, w, h);
  bg.addColorStop(0, "#0d0f14");
  bg.addColorStop(0.5, "#121623");
  bg.addColorStop(1, "#0b1220");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  drawBackgroundGlow();
  updateParticles();
  connectParticles();

  requestAnimationFrame(animate);
}
animate();

const kuromiWidget = document.getElementById("kuromi-widget");
const bubble = document.getElementById("kuromi-bubble");

const messages = [
  "Hi，我是库洛米～",
  "欢迎来到 denXpinn 的主页！",
  "今天也要可爱一下～",
  "记得常来更新博客哦～",
  "去看看最新文章吧～"
];

let msgIndex = 0;

kuromiWidget.addEventListener("click", () => {
  kuromiWidget.classList.add("active");
  msgIndex = (msgIndex + 1) % messages.length;
  bubble.textContent = messages[msgIndex];

  kuromiWidget.animate(
    [
      { transform: "translateY(0px) scale(1)" },
      { transform: "translateY(-8px) scale(1.04)" },
      { transform: "translateY(0px) scale(1)" }
    ],
    {
      duration: 500,
      easing: "ease-out"
    }
  );

  clearTimeout(window.kuromiTimer);
  window.kuromiTimer = setTimeout(() => {
    kuromiWidget.classList.remove("active");
  }, 2600);
});