self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('app-cache').then((cache) => {
            return cache.addAll(['/index.html', '/offline.html']);
        })
    );
});
// Offline mode code...
