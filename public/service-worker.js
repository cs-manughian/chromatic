
// https://developers.google.com/web/fundamentals/primers/service-workers/
// https://blog.filippo.io/mkcert-valid-https-certificates-for-localhost/

var CACHE_NAME = 'chromatic-cache-v1';
var urlsToCache = [
  '/',
  '/styles/main.css',
//   '/scripts/main.js'
];

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});
    
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                // Cache hit - return response
                if (response) {
                    return response;
                }
                return fetch(event.request);
            }
        )
    );
});
