const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Pacman görüntüsü
const pacmanImage = new Image();
pacmanImage.src = 'pacman.png';

// Pacman nesnesi
const pacman = {
    x: 50,
    y: 50,
    width: 30,
    height: 30,
    speed: 5,
    direction: 'right'
};

// Duvarlar
const walls = [
    { x: 50, y: 50, width: 300, height: 20 },
    { x: 50, y: 50, width: 20, height: 300 },
    { x: 330, y: 50, width: 20, height: 300 },
    { x: 50, y: 330, width: 300, height: 20 },
    // Orijinal Pacman duvarlarını buraya ekleyin
];

// Yiyecekler
const foods = [
    { x: 100, y: 100, radius: 5 },
    { x: 150, y: 100, radius: 5 },
    { x: 200, y: 100, radius: 5 },
    { x: 250, y: 100, radius: 5 },
    // Orijinal Pacman yiyeceklerini buraya ekleyin
];

// Duvarları çizme
function drawWalls() {
    ctx.fillStyle = 'blue';
    walls.forEach(wall => {
        ctx.fillRect(wall.x, wall.y, wall.width, wall.height);
    });
}

// Yiyecekleri çizme
function drawFoods() {
    ctx.fillStyle = 'white';
    foods.forEach(food => {
        ctx.beginPath();
        ctx.arc(food.x, food.y, food.radius, 0, 2 * Math.PI);
        ctx.fill();
    });
}

// Pacman'i çizme
function drawPacman() {
    ctx.drawImage(pacmanImage, pacman.x, pacman.y, pacman.width, pacman.height);
}

// Pacman'i güncelleme
function updatePacman() {
    let nextX = pacman.x;
    let nextY = pacman.y;

    switch (pacman.direction) {
        case 'right':
            nextX += pacman.speed;
            break;
        case 'left':
            nextX -= pacman.speed;
            break;
        case 'up':
            nextY -= pacman.speed;
            break;
        case 'down':
            nextY += pacman.speed;
            break;
    }

    // Duvar çarpışma kontrolü
    const colliding = walls.some(wall =>
        nextX < wall.x + wall.width &&
        nextX + pacman.width > wall.x &&
        nextY < wall.y + wall.height &&
        nextY + pacman.height > wall.y
    );

    if (!colliding) {
        pacman.x = nextX;
        pacman.y = nextY;
    }

    // Yiyecek toplama kontrolü
    foods.forEach((food, index) => {
        const dx = pacman.x + pacman.width / 2 - food.x;
        const dy = pacman.y + pacman.height / 2 - food.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < pacman.width / 2 + food.radius) {
            foods.splice(index, 1); // Yiyeceği kaldır
        }
    });
}

// Tuval temizleme
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Oyun döngüsü
function gameLoop() {
    clearCanvas();
    drawWalls();
    drawFoods();
    drawPacman();
    updatePacman();
    requestAnimationFrame(gameLoop);
}

// Klavye kontrolleri
document.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowRight') pacman.direction = 'right';
    if (event.key === 'ArrowLeft') pacman.direction = 'left';
    if (event.key === 'ArrowUp') pacman.direction = 'up';
    if (event.key === 'ArrowDown') pacman.direction = 'down';
});

// Oyun başlatma
pacmanImage.onload = gameLoop;
