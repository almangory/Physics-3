const CACHE_NAME = 'nakla-physics-v2';
const PRECACHE_ASSETS = [
  '/',
  '/index.html'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Warm up the cache with index.html and base route
      return cache.addAll(PRECACHE_ASSETS).catch((err) => {
        console.warn('Pre-caching failed during installation (this is fine as runtime caching will cover it):', err);
      });
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[Service Worker] Removing old cache:', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  // Only handle GET requests
  if (e.request.method !== 'GET') {
    return;
  }

  const url = new URL(e.request.url);

  // 1. For HTML documents / page navigation, use a Network-First strategy
  // This guarantees fresh content when online, but falls back to cached assets offline.
  if (e.request.mode === 'navigate' || url.pathname.endsWith('.html') || url.pathname === '/') {
    e.respondWith(
      fetch(e.request)
        .then((networkResponse) => {
          if (networkResponse && (networkResponse.status === 200 || networkResponse.status === 0)) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(e.request, responseClone);
            });
          }
          return networkResponse;
        })
        .catch(() => {
          return caches.match(e.request).then((cachedResponse) => {
            if (cachedResponse) {
              return cachedResponse;
            }
            // Fallback to the cached index.html root
            return caches.match('/');
          });
        })
    );
    return;
  }

  // 2. For static assets (JS, CSS, fonts, SVG, PNG, JPG, JPEG, GIF, WebP, CDNs like Google Fonts, Lucide, etc.)
  // We use a Stale-While-Revalidate/Cache-First strategy. This is optimal for offline learning and fast loading.
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      if (cachedResponse) {
        // Return cached asset immediately for high performance & offline support,
        // and fetch fresh copy in the background to keep the cache updated (if online).
        fetch(e.request)
          .then((networkResponse) => {
            if (networkResponse && (networkResponse.status === 200 || networkResponse.status === 0)) {
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(e.request, networkResponse);
              });
            }
          })
          .catch(() => {
            // Ignore background fetch failures when offline
          });
        return cachedResponse;
      }

      // If asset is not in cache, fetch from network and cache it dynamically
      return fetch(e.request)
        .then((networkResponse) => {
          if (!networkResponse || (networkResponse.status !== 200 && networkResponse.status !== 0)) {
            return networkResponse;
          }
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(e.request, responseClone);
          });
          return networkResponse;
        })
        .catch(() => {
          // Failed to fetch and not in cache (e.g. fully offline for a new resource)
          // Return a transparent empty response or let it fail gracefully
        });
    })
  );
});
