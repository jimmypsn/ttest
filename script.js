document.getElementById('playButton').addEventListener('click', function() {
    // Replace these with your actual MP4 file URLs or local paths
    const mp4Urls = [
        'https://example.com/videos/video1.mp4',
        'https://example.com/videos/video2.mp4',
        'https://example.com/videos/video3.mp4',
        // Add more MP4 URLs as needed
    ];

    mp4Urls.forEach(url => {
        // Create a new window/tab with a video player
        const newWindow = window.open('', '_blank');
        newWindow.document.write(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>Video Player</title>
                <style>
                    body { margin: 0; display: flex; justify-content: center; align-items: center; height: 100vh; background: #000; }
                    video { max-width: 100%; max-height: 100%; }
                </style>
            </head>
            <body>
                <video controls autoplay>
                    <source src="${url}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            </body>
            </html>
        `);
        newWindow.document.close();
    });
});