const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const pacman = {
    x: 50,
    y: 50,
    radius: 15,
    speed: 5,
    direction: 'right'
};

function drawPacman() {
    ctx.fillStyle = 'yellow';
    ctx.beginPath();
    ctx.arc(pacman.x, pacman.y, pacman.radius, 0.2 * Math.PI, 1.8 * Math.PI);
    ctx.lineTo(pacman.x, pacman.y);
    ctx.fill();
}

function updatePacman() {
    switch (pacman.direction) {
        case 'right':
            pacman.x += pacman.speed;
            break;
        case 'left':
            pacman.x -= pacman.speed;
            break;
        case 'up':
            pacman.y -= pacman.speed;
            break;
        case 'down':
            pacman.y += pacman.speed;
            break;
    }

    if (pacman.x + pacman.radius > canvas.width) pacman.x = pacman.radius;
    if (pacman.x - pacman.radius < 0) pacman.x = canvas.width - pacman.radius;
    if (pacman.y + pacman.radius > canvas.height) pacman.y = pacman.radius;
    if (pacman.y - pacman.radius < 0) pacman.y = canvas.height - pacman.radius;
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function gameLoop() {
    clearCanvas();
    drawPacman();
    updatePacman();
    requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowRight') pacman.direction = 'right';
    if (event.key === 'ArrowLeft') pacman.direction = 'left';
    if (event.key === 'ArrowUp') pacman.direction = 'up';
    if (event.key === 'ArrowDown') pacman.direction = 'down';
});

gameLoop();
