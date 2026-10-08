 // AUDIO CONTROL
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
            document.getElementById(id).classList.replace('hidden', 'flex');
            if(id === 'modalMemorama') startMemorama();
            if(id === 'modalJump') startJumpGame();
        }
        function closeModal(id) {
            document.getElementById(id).classList.replace('flex', 'hidden');
        }

        // CURIOSIDADES Y TRIVIAS EXPANDIDAS CON EMOJIS
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
            "📑 Empresa formalmente constituida en Perú: ICOMPUTEC E.I.R.L. "
        ];

        function showRandomTrivia() {
            const random = trivias[Math.floor(Math.random() * trivias.length)];
            document.getElementById('triviaText').innerText = random;
            openModal('modalTrivia');
        }

// ICONOS 100% COMPATIBLES Y VISIBLES (CON FONDO Y DEGRADADOS)
const memoIcons = [
    { name: 'Laptop', icon: 'fluent-emoji:laptop' },
    { name: 'Impresora', icon: 'fluent-emoji:printer' },
    { name: 'Procesador', icon: 'fluent-emoji:desktop-computer' },
    { name: 'Pantalla', icon: 'fluent-emoji:television' },
    { name: 'Teclado', icon: 'fluent-emoji:keyboard' },
    { name: 'Auriculares', icon: 'fluent-emoji:headphone' }
];

let memoCards = [], flipped = [], matched = 0, canClick = false;

function startMemorama() {
    const grid = document.getElementById('memoGrid');
    const timerText = document.getElementById('memoTimer');
    grid.innerHTML = '';
    flipped = []; matched = 0; canClick = false;
    
    memoCards = [...memoIcons, ...memoIcons].sort(() => Math.random() - 0.5);

    memoCards.forEach((item, i) => {
        const scene = document.createElement('div');
        scene.className = 'card-scene h-16 w-full cursor-pointer select-none';
        
        scene.innerHTML = `
            <div class="card-inner is-flipped" id="card-${i}">
                <div class="card-front">
                    <span class="text-[9px] font-black tracking-widest text-blue-400 select-none">ICOMPUTEC</span>
                </div>
                <div class="card-back">
                    <iconify-icon icon="${item.icon}" width="34" height="34"></iconify-icon>
                </div>
            </div>
        `;
        
        scene.onclick = () => clickMemoCard(i, item.name);
        grid.appendChild(scene);
    });

    timerText.innerText = "¡Memoriza las posiciones!";
    
    // Ocultar cartas a los 1.5s
    setTimeout(() => {
        document.querySelectorAll('.card-inner').forEach(card => card.classList.remove('is-flipped'));
        timerText.innerText = "¡Encuentra los pares!";
        canClick = true;
    }, 1500);
}

function clickMemoCard(index, iconName) {
    const cardInner = document.getElementById(`card-${index}`);
    
    // Bloquea clic si la carta ya está volteada, resuelta (is-matched) o si el juego está procesando
    if (!canClick || cardInner.classList.contains('is-flipped') || cardInner.classList.contains('is-matched') || flipped.length >= 2) return;

    cardInner.classList.add('is-flipped');
    flipped.push({ index, iconName, element: cardInner });

    if (flipped.length === 2) {
        if (flipped[0].iconName === flipped[1].iconName) {
            // ¡PAR ENCONTRADO! Se bloquean permanentemente con .is-matched
            flipped[0].element.classList.add('is-matched');
            flipped[1].element.classList.add('is-matched');
            matched++;
            flipped = [];
            
            if (matched === memoIcons.length) {
                document.getElementById('memoTimer').innerText = "🎉 ¡Felicidades! Completaste el juego.";
            }
        } else {
            canClick = false;
            setTimeout(() => {
                flipped[0].element.classList.remove('is-flipped');
                flipped[1].element.classList.remove('is-flipped');
                flipped = [];
                canClick = true;
            }, 800);
        }
    }
}

        // JUEGO ICOMPUTEC JUMP (MOVIMIENTO FLUIDO CONTINUO)
        let jumpCanvas, ctx, player, platforms, gameLoop;
        const keys = {};

        window.addEventListener('keydown', e => keys[e.key] = true);
        window.addEventListener('keyup', e => keys[e.key] = false);

        function startJumpGame() {
            jumpCanvas = document.getElementById('jumpCanvas');
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
            
            // Movimiento continuo según el estado de las teclas
            if (keys['ArrowLeft'] || keys['a'] || keys['A']) {
                player.x -= player.speed;
            }
            if (keys['ArrowRight'] || keys['d'] || keys['D']) {
                player.x += player.speed;
            }

            // Mapeo alrededor de la pantalla (Screen Wrap)
            if (player.x < -player.w) player.x = jumpCanvas.width;
            if (player.x > jumpCanvas.width) player.x = -player.w;

            // Física de salto
            player.dy += player.gravity;
            player.y += player.dy;

            // Dibujar Jugador (Laptop Azul)
            ctx.fillStyle = '#2563eb';
            ctx.fillRect(player.x, player.y, player.w, player.h);

            // Dibujar Plataformas (Hardware)
            ctx.fillStyle = '#1e3a8a';
            platforms.forEach(p => {
                ctx.fillRect(p.x, p.y, p.w, p.h);
                // Colisión solo cuando el jugador va cayendo
                if (player.dy > 0 && player.x + player.w > p.x && player.x < p.x + p.w &&
                    player.y + player.h >= p.y && player.y + player.h <= p.y + p.h + 6) {
                    player.dy = -8.5; // Salto automático
                }
            });

            // Scroll vertical de la cámara
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

            // Caída al vacío -> Reinicio
            if (player.y > jumpCanvas.height) {
                player.x = 135; player.y = 280; player.dy = -8.5;
            }

            gameLoop = requestAnimationFrame(updateJumpGame);
        }