const CACHE_NAME = 'pwa-cache-v1';
const urlsToCache = [
    '/index.html',
    '/offline.html',
    '/icon-192x192.png',
    '/icon-512x512.png'
];

// Install service worker and cache resources
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => {
            return cache.addAll(urlsToCache);
        })
    );
});

// Intercept fetch requests and serve cached resources if offline
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
        .then(response => {
            return response || fetch(event.request);
        }).catch(() => {
            return caches.match('/offline.html');
        })
    );
});
