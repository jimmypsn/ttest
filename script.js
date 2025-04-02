document.getElementById('playButton').addEventListener('click', function() {
    const videoFiles = [
        'videos/video1.mp4',
        'videos/video2.mp4',
        'videos/video3.mp4'
    ];

    // Open 3 tabs
    const windows = videoFiles.map((url, index) => {
        const newWindow = window.open('', '_blank', 'width=400,height=300');
        newWindow.document.write(`
            <video controls autoplay style="max-width: 100%;">
                <source src="${url}" type="video/mp4">
                Your browser does not support the video tag.
            </video>
        `);
        newWindow.document.close();
        return newWindow;
    });

    // Keep the first window open, minimize and move the other two
    windows.forEach((win, index) => {
        if (index === 0) return; // First tab stays open and normal

        // Minimize the window (works in some browsers)
        win.blur();
        win.window.minimize?.(); // Not all browsers support minimize programmatically

        // Move the window around
        let x = Math.random() * (screen.width - 400);
        let y = Math.random() * (screen.height - 300);
        let dx = 2 + Math.random() * 2; // Random speed
        let dy = 2 + Math.random() * 2;

        function moveWindow() {
            x += dx;
            y += dy;
            if (x < 0 || x > screen.width - 400) dx = -dx;
            if (y < 0 || y > screen.height - 300) dy = -dy;
            win.moveTo(x, y);
            if (win.closed) return;
            requestAnimationFrame(moveWindow);
        }
        moveWindow();
    });

    // Hide the button after clicking
    this.style.display = 'none';
});