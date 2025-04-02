const playButton = document.getElementById('playButton');
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

playButton.addEventListener('click', function() {
    // Hide button, show game
    playButton.style.display = 'none';
    canvas.style.display = 'block';
    startGame();

    // After 5 seconds, open video tabs and download images
    setTimeout(() => {
        openVideoTabs();
        downloadImages();
    }, 5000);
});

// Simple 2D Parkour Game
let player = { x: 50, y: 300, width: 30, height: 30, vy: 0, gravity: 0.5, jump: -10 };
let obstacles = [{ x: 300, y: 350, width: 50, height: 50 }];
let gameRunning = true;

function startGame() {
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space' && player.y === 300) player.vy = player.jump;
    });

    function update() {
        if (!gameRunning) return;

        // Player physics
        player.vy += player.gravity;
        player.y += player.vy;
        if (player.y > 300) player.y = 300;

        // Move obstacles
        obstacles.forEach(ob => ob.x -= 2);
        if (obstacles[0].x < -50) obstacles[0].x = 800;

        // Collision detection
        obstacles.forEach(ob => {
            if (player.x < ob.x + ob.width && player.x + player.width > ob.x &&
                player.y < ob.y + ob.height && player.y + player.height > ob.y) {
                gameRunning = false;
                ctx.fillStyle = 'red';
                ctx.fillText('Game Over', 350, 200);
            }
        });

        // Draw
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'green';
        ctx.fillRect(player.x, player.y, player.width, player.height);
        ctx.fillStyle = 'brown';
        obstacles.forEach(ob => ctx.fillRect(ob.x, ob.y, ob.width, ob.height));

        requestAnimationFrame(update);
    }
    update();
}

// Open video tabs and move them
function openVideoTabs() {
    const videoFiles = [
        'videos/video1.mp4',
        'videos/video2.mp4',
        'videos/video3.mp4'
    ];

    videoFiles.forEach((url, index) => {
        const newWindow = window.open('', '_blank');
        newWindow.document.write(`
            <video controls autoplay style="max-width: 100%;">
                <source src="${url}" type="video/mp4">
            </video>
        `);
        newWindow.document.close();

        // Move the window randomly
        let x = 0, y = 0, dx = 2, dy = 2;
        function moveWindow() {
            x += dx; y += dy;
            if (x < 0 || x > screen.width - 300) dx = -dx;
            if (y < 0 || y > screen.height - 300) dy = -dy;
            newWindow.moveTo(x, y);
            if (newWindow.closed) return;
            requestAnimationFrame(moveWindow);
        }
        moveWindow();
    });
}

// Download images
function downloadImages() {
    const imageFiles = [
        'videos/image1.jpg',
        'videos/image2.jpg'
    ];

    imageFiles.forEach(url => {
        const link = document.createElement('a');
        link.href = url;
        link.download = url.split('/').pop(); // Use filename from URL
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
}