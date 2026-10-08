// ACTIVAR BIENVENIDA TRAS CARGA COMPLETA
window.addEventListener('load', () => {
    setTimeout(() => {
        launchCelebrationAnimation(true);
    }, 400);
});

// ANIMACIÓN CON RÁFAGAS PROGRAMADAS (CADA 1.2 SEGUNDOS)
function launchCelebrationAnimation(isWelcome = false) {
    const oldCanvas = document.getElementById('victoryCanvas');
    if (oldCanvas) oldCanvas.remove();

    const canvas = document.createElement('canvas');
    canvas.id = 'victoryCanvas';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const colors = ['#2563eb', '#3b82f6', '#60a5fa', '#38bdf8', '#22c55e', '#eab308', '#ffffff'];

    function addBurst(x, y, amount = 55) {
        for (let i = 0; i < amount; i++) {
            particles.push({
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * 20,
                vy: (Math.random() - 0.5) * 18 - 5,
                size: Math.random() * 7 + 4,
                color: colors[Math.floor(Math.random() * colors.length)],
                alpha: 1,
                gravity: 0.18,
                rotation: Math.random() * 360,
                rotSpeed: (Math.random() - 0.5) * 8
            });
        }
    }

    if (isWelcome) {
        let burstsCount = 0;
        const positions = [
            { x: canvas.width * 0.25, y: canvas.height * 0.4 }, // 1ª Ráfaga: Izquierda
            { x: canvas.width * 0.75, y: canvas.height * 0.4 }, // 2ª Ráfaga: Derecha (1.2s)
            { x: canvas.width * 0.50, y: canvas.height * 0.4 }  // 3ª Ráfaga: Centro (2.4s)
        ];

        // Disparo inicial
        addBurst(positions[0].x, positions[0].y);
        burstsCount++;

        // Intervalo exacto cada 1.2 segundos
        const burstInterval = setInterval(() => {
            if (burstsCount < positions.length) {
                addBurst(positions[burstsCount].x, positions[burstsCount].y);
                burstsCount++;
            } else {
                clearInterval(burstInterval);
            }
        }, 1200);

    } else {
        addBurst(canvas.width / 2, canvas.height / 2, 120);
    }

    function render() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.vy += p.gravity;
            p.alpha -= 0.007;
            p.rotation += p.rotSpeed;

            if (p.alpha <= 0) {
                particles.splice(i, 1);
                continue;
            }

            ctx.save();
            ctx.globalAlpha = Math.max(p.alpha, 0);
            ctx.translate(p.x, p.y);
            ctx.rotate((p.rotation * Math.PI) / 180);
            ctx.fillStyle = p.color;
            ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
            ctx.restore();
        }

        // Mantiene el renderizado activo mientras caen partículas
        if (particles.length > 0 || isWelcome) {
            if (particles.length === 0 && !isWelcome) {
                canvas.remove();
            } else {
                requestAnimationFrame(render);
            }
        }
    }

    render();
}
// CONTROL DE AUDIO
const bgMusic = document.getElementById('bgMusic');

function toggleAudio() {
    if (bgMusic.paused) {
        bgMusic.play();
        document.getElementById('audioText').innerText = "MÚSICA: ON";
    } else {
        bgMusic.pause();
        document.getElementById('audioText').innerText = "MÚSICA: OFF";
    }
}

// CONTROL DE MODALES
function openModal(id) {
    const targetModal = document.getElementById(id);
    if (targetModal) {
        targetModal.classList.replace('hidden', 'flex');
        if (id === 'modalMemorama') startMemorama();
        if (id === 'modalJump') startJumpGame();
    }
}

function closeModal(id) {
    const targetModal = document.getElementById(id);
    if (targetModal) {
        targetModal.classList.replace('flex', 'hidden');
    }
}

// CURIOSIDADES Y TRIVIAS
const trivias = [
    "🏆 ¡Somos empresa líder en Arequipa con 20 años de experiencia técnica ofreciendo excelencia y alta confianza!",
    "⭐ ¡Recomendados oficialmente en Google con una puntuación de 4.8/5 y más de 100 opiniones reales!",
    "🔵 Llegar a nosotros es muy fácil: Solo entra a la Galería Nova Center y busca la icónica 'Tienda AZUL' de Arequipa.",
    "🏢 Te atendemos en la Calle Octavio Muñoz Nájar 221 (Galería Nova Center): Tienda Principal #214 (Piso 2) y Tienda #132 (Piso 1).",
    "🎮 Especialistas certificados en laptops Gaming y Alta Gama: Lenovo Legion, ASUS ROG, HP Victus, Dell, Acer Nitro, MSI, etc...",
    "🔬 ¡Contamos con Laboratorio Especializado de Electrónica para reparación de placas madre, Reballing y programación de BIOS!",
    "💾 Recuperación profesional de datos en discos duros (HDD), unidades de estado sólido (SSD), memorias USB y tarjetas.",
    "🚚 Atendemos a todo el Sur del Perú: Recibimos y coordinamos envíos desde Camaná, Mollendo, Moquegua, Ilo, Puno, Juliaca, Cusco y Tacna.",
    "🛠️ Mantenimiento físico especializado: Limpieza profunda, renovación de pasta térmica y revisión del sistema de refrigeración para evitar sobrecalentamiento.",
    "📑 Empresa formalmente constituida en Perú: ICOMPUTEC E.I.R.L."
];

function showRandomTrivia() {
    const random = trivias[Math.floor(Math.random() * trivias.length)];
    document.getElementById('triviaText').innerText = random;
    openModal('modalTrivia');
}

// CATÁLOGO DE COMPONENTES
const allMemoIcons = [
    { name: 'Laptop', src: 'assets/laptop.png' },
    { name: 'Impresora', src: 'assets/printer.png' },
    { name: 'PC', src: 'assets/pc.png' },
    { name: 'Monitor', src: 'assets/monitor.png' },
    { name: 'Teclado', src: 'assets/keyboard.png' },
    { name: 'Auriculares', src: 'assets/headphones.png' },
    { name: 'GPU', src: 'assets/gpu.png' },
    { name: 'SSD', src: 'assets/ssd.png' },
    { name: 'Mouse', src: 'assets/mouse.png' },
    { name: 'Chip', src: 'assets/chip.png' },
    { name: 'Cooler', src: 'assets/cooler.png' },
    { name: 'Cámara', src: 'assets/webcam.png' },
    { name: 'Microscopio', src: 'assets/microscope.png' },
    { name: 'Cargador', src: 'assets/charger.png' },
    { name: 'USB', src: 'assets/usb.png' }
];

// PRECARGA DE IMÁGENES AL NAVEGADOR
window.addEventListener('DOMContentLoaded', () => {
    allMemoIcons.forEach(item => {
        const img = new Image();
        img.src = item.src;
    });
});

// MEMORAMA
let currentDifficulty = 'easy';
let memoCards = [], flipped = [], matched = 0, canClick = false;

function setDifficulty(mode) {
    currentDifficulty = mode;
    const btnEasy = document.getElementById('btnEasy');
    const btnHard = document.getElementById('btnHard');

    if (mode === 'easy') {
        btnEasy.className = "px-3 py-1.5 rounded-lg text-xs font-bold border border-blue-500 bg-blue-600 text-white transition-all";
        btnHard.className = "px-3 py-1.5 rounded-lg text-xs font-bold border border-blue-500/40 bg-slate-800 text-slate-300 hover:text-white transition-all";
    } else {
        btnHard.className = "px-3 py-1.5 rounded-lg text-xs font-bold border border-blue-500 bg-blue-600 text-white transition-all";
        btnEasy.className = "px-3 py-1.5 rounded-lg text-xs font-bold border border-blue-500/40 bg-slate-800 text-slate-300 hover:text-white transition-all";
    }

    startMemorama();
}

function startMemorama() {
    const grid = document.getElementById('memoGrid');
    const timerText = document.getElementById('memoTimer');
    grid.innerHTML = '';
    flipped = []; matched = 0; canClick = false;

    const pairsCount = (currentDifficulty === 'easy') ? 6 : 10;
    grid.className = (currentDifficulty === 'easy') ? "grid gap-2 my-4 grid-easy" : "grid gap-2 my-4 grid-hard";

    const selectedIcons = [...allMemoIcons]
        .sort(() => Math.random() - 0.5)
        .slice(0, pairsCount);

    memoCards = [...selectedIcons, ...selectedIcons].sort(() => Math.random() - 0.5);

    memoCards.forEach((item, i) => {
        const scene = document.createElement('div');
        scene.className = 'card-scene h-14 md:h-16 w-full cursor-pointer select-none';
        
        scene.innerHTML = `
            <div class="card-inner is-flipped" id="card-${i}">
                <div class="card-front">
                    <span class="text-[8px] md:text-[9px] font-black tracking-widest text-blue-400 select-none">ICOMPUTEC</span>
                </div>
                <div class="card-back">
                    <img src="${item.src}" alt="${item.name}" />
                </div>
            </div>
        `;
        
        scene.onclick = () => clickMemoCard(i, item.name, pairsCount);
        grid.appendChild(scene);
    });

    timerText.innerText = "👀 Memoriza las posiciones...";
    
    setTimeout(() => {
        document.querySelectorAll('.card-inner').forEach(card => card.classList.remove('is-flipped'));
        timerText.innerText = "🧠 ¡Encuentra todas las parejas!";
        canClick = true;
    }, 1500);
}

function clickMemoCard(index, iconName, totalPairs) {
    const cardInner = document.getElementById(`card-${index}`);
    
    if (!canClick || cardInner.classList.contains('is-flipped') || cardInner.classList.contains('is-matched') || flipped.length >= 2) return;

    cardInner.classList.add('is-flipped');
    flipped.push({ index, iconName, element: cardInner });

    if (flipped.length === 2) {
        if (flipped[0].iconName === flipped[1].iconName) {
            flipped[0].element.classList.add('is-matched');
            flipped[1].element.classList.add('is-matched');
            matched++;
            flipped = [];
            
            if (matched === totalPairs) {
                document.getElementById('memoTimer').innerText = "🎉 ¡Completado!";
                setTimeout(() => {
                    openModal('modalVictoria');
                    launchCelebrationAnimation();
                }, 400);
            }
        } else {
            canClick = false;
            setTimeout(() => {
                flipped[0].element.classList.remove('is-flipped');
                flipped[1].element.classList.remove('is-flipped');
                flipped = [];
                canClick = true;
            }, 1200);
        }
    }
}

// ANIMACIÓN DE CONFETI
function launchCelebrationAnimation() {
    const canvas = document.createElement('canvas');
    canvas.id = 'victoryCanvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '99999';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const colors = ['#2563eb', '#3b82f6', '#60a5fa', '#22c55e', '#eab308', '#ec4899', '#ffffff'];

    for (let i = 0; i < 140; i++) {
        particles.push({
            x: canvas.width / 2,
            y: canvas.height / 2,
            vx: (Math.random() - 0.5) * 20,
            vy: (Math.random() - 0.5) * 20 - 4,
            size: Math.random() * 8 + 4,
            color: colors[Math.floor(Math.random() * colors.length)],
            alpha: 1,
            gravity: 0.25
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let activeParticles = 0;

        particles.forEach(p => {
            if (p.alpha > 0) {
                p.x += p.vx;
                p.y += p.vy;
                p.vy += p.gravity;
                p.alpha -= 0.01;

                ctx.save();
                ctx.globalAlpha = Math.max(p.alpha, 0);
                ctx.fillStyle = p.color;
                ctx.fillRect(p.x, p.y, p.size, p.size);
                ctx.restore();

                activeParticles++;
            }
        });

        if (activeParticles > 0) {
            requestAnimationFrame(animate);
        } else {
            canvas.remove();
        }
    }

    animate();
}

// JUEGO ICOMPUTEC JUMP
let jumpCanvas, ctx, player, platforms, gameLoop;
const keys = {};

window.addEventListener('keydown', e => keys[e.key] = true);
window.addEventListener('keyup', e => keys[e.key] = false);

function startJumpGame() {
    jumpCanvas = document.getElementById('jumpCanvas');
    if (!jumpCanvas) return;
    ctx = jumpCanvas.getContext('2d');
    player = { x: 135, y: 280, w: 22, h: 22, dy: -8, gravity: 0.35, speed: 5 };
    platforms = [
        { x: 100, y: 330, w: 100, h: 10 },
        { x: 30, y: 240, w: 80, h: 10 },
        { x: 180, y: 160, w: 80, h: 10 },
        { x: 80, y: 80, w: 80, h: 10 }
    ];
    
    cancelAnimationFrame(gameLoop);
    updateJumpGame();
}

function updateJumpGame() {
    ctx.clearRect(0, 0, jumpCanvas.width, jumpCanvas.height);
    
    if (keys['ArrowLeft'] || keys['a'] || keys['A']) player.x -= player.speed;
    if (keys['ArrowRight'] || keys['d'] || keys['D']) player.x += player.speed;

    if (player.x < -player.w) player.x = jumpCanvas.width;
    if (player.x > jumpCanvas.width) player.x = -player.w;

    player.dy += player.gravity;
    player.y += player.dy;

    ctx.fillStyle = '#2563eb';
    ctx.fillRect(player.x, player.y, player.w, player.h);

    ctx.fillStyle = '#1e3a8a';
    platforms.forEach(p => {
        ctx.fillRect(p.x, p.y, p.w, p.h);
        if (player.dy > 0 && player.x + player.w > p.x && player.x < p.x + p.w &&
            player.y + player.h >= p.y && player.y + player.h <= p.y + p.h + 6) {
            player.dy = -8.5;
        }
    });

    if (player.y < 140) {
        player.y = 140;
        platforms.forEach(p => {
            p.y += 4;
            if (p.y > jumpCanvas.height) {
                p.y = 0;
                p.x = Math.random() * (jumpCanvas.width - p.w);
            }
        });
    }

    if (player.y > jumpCanvas.height) {
        player.x = 135; player.y = 280; player.dy = -8.5;
    }

    gameLoop = requestAnimationFrame(updateJumpGame);
}