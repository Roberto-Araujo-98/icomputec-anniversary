// ACTIVAR BIENVENIDA Y TEMPORIZADOR DE 3 MINUTOS
window.addEventListener('load', () => {
    setTimeout(() => {
        launchCelebrationAnimation(true); // Confeti de inicio en múltiples puntos
    }, 300);

    // Ráfaga sutil cada 3 minutos (180,000 ms) en la posición central
    setInterval(() => {
        launchSubtleBurst();
    }, 180000);
});

// RÁFAGA SUTIL Y SILENCIOSA CADA 3 MINUTOS
function launchSubtleBurst() {
    let canvas = document.getElementById('victoryCanvas');
    if (!canvas) {
        canvas = document.createElement('canvas');
        canvas.id = 'victoryCanvas';
        document.body.appendChild(canvas);
    }
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ['#2563eb', '#3b82f6', '#60a5fa', '#38bdf8', '#ffffff'];
    const particles = [];

    // Dispara una cantidad pequeña (25 partículas) en el centro superior
    for (let i = 0; i < 25; i++) {
        particles.push({
            x: canvas.width / 2,
            y: canvas.height * 0.3,
            vx: (Math.random() - 0.5) * 12,
            vy: (Math.random() - 0.5) * 10 - 2,
            size: Math.random() * 5 + 3,
            color: colors[Math.floor(Math.random() * colors.length)],
            alpha: 1,
            gravity: 0.15,
            rotation: Math.random() * 360,
            rotSpeed: (Math.random() - 0.5) * 6
        });
    }

    function renderSubtle() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.vy += p.gravity;
            p.alpha -= 0.008;
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

        if (particles.length > 0) {
            requestAnimationFrame(renderSubtle);
        }
    }
    renderSubtle();
}

// CONFETI MULTI-PUNTO MASIVO DE INICIO
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

    function addBurst(x, y, amount = 45) {
        for (let i = 0; i < amount; i++) {
            particles.push({
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * 22,
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
        // 5 Puntos de disparo distribuidos al iniciar
        const points = [
            { x: canvas.width * 0.15, y: canvas.height * 0.5 }, // Izquierda
            { x: canvas.width * 0.85, y: canvas.height * 0.5 }, // Derecha
            { x: canvas.width * 0.50, y: canvas.height * 0.35 }, // Centro Arriba
            { x: canvas.width * 0.35, y: canvas.height * 0.65 }, // Abajo Izq
            { x: canvas.width * 0.65, y: canvas.height * 0.65 }  // Abajo Der
        ];

        let index = 0;
        const burstInterval = setInterval(() => {
            if (index < points.length) {
                addBurst(points[index].x, points[index].y, 50);
                index++;
            } else {
                clearInterval(burstInterval);
            }
        }, 500); // Ráfaga cada 0.5 segundos al inicio

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
let memoTimerTimeout = null; // Para limpiar timeouts pendientes si reinicias rápido

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
    
    // Limpia cualquier temporizador pendiente del juego anterior
    if (memoTimerTimeout) clearTimeout(memoTimerTimeout);
    
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
        
        // Muestra inicialmente la imagen en la vista previa
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
    
    // Ocultar las cartas después de 1.5 segundos para empezar a jugar
    memoTimerTimeout = setTimeout(() => {
        document.querySelectorAll('.card-inner').forEach(card => card.classList.remove('is-flipped'));
        timerText.innerText = "🧠 ¡Encuentra todas las parejas!";
        canClick = true; // Liberamos el clic
    }, 1500);
}

// ÚNICA FUNCIÓN CLICKMEMOCARD (Asegúrate de que no haya otra duplicada abajo)
function clickMemoCard(index, iconName, totalPairs) {
    const cardInner = document.getElementById(`card-${index}`);
    
    // Validaciones de seguridad
    if (!canClick || !cardInner) return;
    if (cardInner.classList.contains('is-flipped') || cardInner.classList.contains('is-matched') || flipped.length >= 2) return;

    // Girar la carta
    cardInner.classList.add('is-flipped');
    flipped.push({ index, iconName, element: cardInner });

    // Cuando se seleccionan 2 cartas
    if (flipped.length === 2) {
        if (flipped[0].iconName === flipped[1].iconName) {
            // ¡PAR CORRECTO!
            flipped[0].element.classList.add('is-matched');
            flipped[1].element.classList.add('is-matched');
            matched++;
            flipped = [];
            
            // Si se completaron todos los pares
            if (matched === totalPairs) {
                document.getElementById('memoTimer').innerText = "🎉 ¡Completado!";
                setTimeout(() => {
                    openModal('modalVictoria');
                    launchCelebrationAnimation();
                }, 400);
            }
        } else {
            // PAR INCORRECTO: Bloquear clics temporalmente y voltear de regreso
            canClick = false;
            setTimeout(() => {
                if (flipped[0] && flipped[0].element) flipped[0].element.classList.remove('is-flipped');
                if (flipped[1] && flipped[1].element) flipped[1].element.classList.remove('is-flipped');
                flipped = [];
                canClick = true; // Volvemos a habilitar clics
            }, 800);
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

// ==========================================
// JUEGO: ICOMPUTEC JUMP (INFINITO + ALEATORIEDAD + ALCANZABILIDAD)
// ==========================================
let jumpCanvas, ctx, player, platforms, gameLoop;
let currentScore = 0;
let highScore = 0;
const keys = {};

// Escuchadores de teclado
window.addEventListener('keydown', e => {
    if (['ArrowLeft', 'ArrowRight', 'a', 'A', 'd', 'D'].includes(e.key)) {
        keys[e.key] = true;
    }
});

window.addEventListener('keyup', e => {
    if (['ArrowLeft', 'ArrowRight', 'a', 'A', 'd', 'D'].includes(e.key)) {
        keys[e.key] = false;
    }
});

function setupTouchControls() {
    const btnLeft = document.getElementById('btnJumpLeft');
    const btnRight = document.getElementById('btnJumpRight');

    if (btnLeft && btnRight) {
        btnLeft.ontouchstart = (e) => { e.preventDefault(); keys['ArrowLeft'] = true; };
        btnLeft.ontouchend = (e) => { e.preventDefault(); keys['ArrowLeft'] = false; };
        btnLeft.onmousedown = () => { keys['ArrowLeft'] = true; };
        btnLeft.onmouseup = () => { keys['ArrowLeft'] = false; };

        btnRight.ontouchstart = (e) => { e.preventDefault(); keys['ArrowRight'] = true; };
        btnRight.ontouchend = (e) => { e.preventDefault(); keys['ArrowRight'] = false; };
        btnRight.onmousedown = () => { keys['ArrowRight'] = true; };
        btnRight.onmouseup = () => { keys['ArrowRight'] = false; };
    }
}

function startJumpGame() {
    jumpCanvas = document.getElementById('jumpCanvas');
    if (!jumpCanvas) return;
    ctx = jumpCanvas.getContext('2d');

    setupTouchControls();

    // Reiniciar Puntuación
    currentScore = 0;
    updateScoreUI();

    // Estado inicial del jugador
    player = { 
        x: 135, 
        y: 280, 
        w: 22, 
        h: 22, 
        dy: -8.5, 
        gravity: 0.35, 
        speed: 5.5 
    };

    // GENERACIÓN ALEATORIA INICIAL DE PLATAFORMAS (Distancia controlada <= 75px)
    platforms = [];
    const basePlatformWidth = 65;
    
    // 1. Plataforma base donde cae el jugador al inicio
    platforms.push({ x: 110, y: 330, w: 80, h: 10, visited: true });

    // 2. Generar 4 plataformas distribuidas verticalmente hacia arriba
    let lastY = 330;
    for (let i = 0; i < 4; i++) {
        // Distancia vertical entre 60px y 75px (alcanzable con dy = -8.5)
        const gapY = Math.floor(Math.random() * 15) + 60; 
        const nextY = lastY - gapY;
        const width = Math.floor(Math.random() * 15) + 55; // Ancho entre 55px y 70px
        const nextX = Math.random() * (jumpCanvas.width - width);

        platforms.push({
            x: nextX,
            y: nextY,
            w: width,
            h: 10,
            visited: false
        });
        lastY = nextY;
    }
    
    if (gameLoop) cancelAnimationFrame(gameLoop);
    updateJumpGame();
}

function updateScoreUI() {
    const scoreText = document.getElementById('jumpScoreText');
    if (scoreText) {
        scoreText.innerText = `Puntos: ${currentScore} | Récord: ${highScore}`;
    }
}

function updateJumpGame() {
    ctx.clearRect(0, 0, jumpCanvas.width, jumpCanvas.height);
    
    // 1. Movimiento lateral continuo
    if (keys['ArrowLeft'] || keys['a'] || keys['A']) player.x -= player.speed;
    if (keys['ArrowRight'] || keys['d'] || keys['D']) player.x += player.speed;

    // 2. Screen Wrap (Bordes laterales)
    if (player.x < -player.w) {
        player.x = jumpCanvas.width;
    } else if (player.x > jumpCanvas.width) {
        player.x = -player.w;
    }

    // 3. Física de gravedad y movimiento vertical
    player.dy += player.gravity;
    player.y += player.dy;

    // Dibujar Jugador (Laptop Azul)
    ctx.fillStyle = '#2563eb';
    ctx.fillRect(player.x, player.y, player.w, player.h);
    
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(player.x + 3, player.y + 3, player.w - 6, player.h - 8);

    // Dibujar Plataformas
    platforms.forEach(p => {
        ctx.fillStyle = p.visited ? '#1e3a8a' : '#2563eb';
        ctx.fillRect(p.x, p.y, p.w, p.h);
        
        ctx.fillStyle = p.visited ? '#94a3b8' : '#eab308';
        ctx.fillRect(p.x + 4, p.y + 2, p.w - 8, 2);

        // Colisión de rebote desde arriba
        if (player.dy > 0 && 
            player.x + player.w > p.x && 
            player.x < p.x + p.w &&
            player.y + player.h >= p.y && 
            player.y + player.h <= p.y + p.h + 8) {
            
            player.dy = -8.5; // Salto

            if (!p.visited) {
                p.visited = true;
                currentScore += 10;
                if (currentScore > highScore) highScore = currentScore;
                updateScoreUI();
            }
        }
    });

    // 4. Scroll de Cámara vertical continuo
    if (player.y < 140) {
        player.y = 140;
        platforms.forEach(p => {
            p.y += 4;
            
            // Al salir por la parte inferior, reaparece en la parte superior respetando distancia alcanzable
            if (p.y > jumpCanvas.height) {
                // Busca la plataforma más alta en pantalla para calcular la distancia máxima
                const highestY = Math.min(...platforms.map(item => item.y));
                
                // Asegura un gap vertical máximo de 70px por encima de la más alta
                p.y = highestY - (Math.floor(Math.random() * 15) + 55);
                p.w = Math.floor(Math.random() * 15) + 55; // Ancho acotado (55px - 70px)
                p.x = Math.random() * (jumpCanvas.width - p.w);
                p.visited = false;
            }
        });
    }

    // 5. CAÍDA AL VACÍO -> REINICIO CON NUEVA DISPOSICIÓN ALEATORIA
    if (player.y > jumpCanvas.height) {
        startJumpGame();
        return;
    }

    gameLoop = requestAnimationFrame(updateJumpGame);
}