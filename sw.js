// Service Worker for Block Cipher Learning Module
const CACHE_NAME = 'block-cipher-learning-v1.0.0';
const OFFLINE_URL = 'offline.html';

// Static assets to cache
const STATIC_FILES = [
  '/',
  '/index.html',
  '/manifest.json',
  '/assets/logo.svg',
  '/assets/logo_simple.svg',
  '/assets/Block Cipher Operation Modes.pdf',
  '/assets/Sheet7.pdf',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js'
];

// Media files to cache
const MEDIA_FILES = [
  '/media/image1.png',
  '/media/image2.png',
  '/media/image3.png',
  '/media/image4.png',
  '/media/image5.png',
  '/media/image6.png'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('[SW] Install event');
  event.waitUntil(
    Promise.all([
      caches.open(CACHE_NAME).then((cache) => {
        console.log('[SW] Caching static files');
        return cache.addAll(STATIC_FILES);
      }),
      caches.open(`${CACHE_NAME}-media`).then((cache) => {
        console.log('[SW] Caching media files');
        return cache.addAll(MEDIA_FILES);
      })
    ]).then(() => {
      console.log('[SW] All caches populated');
      return self.skipWaiting();
    }).catch((error) => {
      console.error('[SW] Cache population failed:', error);
    })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activate event');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && cacheName !== `${CACHE_NAME}-media`) {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('[SW] Cache cleanup completed');
      return self.clients.claim();
    })
  );
});

// Fetch event - serve cached content when offline
self.addEventListener('fetch', (event) => {
  // Filter out chrome-extension URLs to prevent cache errors
  if (event.request.url.startsWith('chrome-extension://') ||
      event.request.url.startsWith('moz-extension://') ||
      event.request.url.startsWith('safari-extension://')) {
    return;
  }

  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  // Handle navigation requests
  if (event.request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          const response = await fetch(event.request);
          return response;
        } catch (error) {
          console.warn('[SW] Network fetch failed, serving offline page:', error);
          const offlineResponse = await caches.match(OFFLINE_URL);
          return offlineResponse || new Response('Offline', { status: 503, statusText: 'Service Unavailable' });
        }
      })()
    );
    return;
  }

  // Handle other requests with cache-first strategy for static assets
  event.respondWith(
    (async () => {
      try {
        // Try cache first
        const cachedResponse = await caches.match(event.request);
        if (cachedResponse) {
          return cachedResponse;
        }

        // Fetch from network
        const networkResponse = await fetch(event.request);

        // Cache successful responses (only for same-origin requests)
        if (networkResponse.status === 200 &&
            networkResponse.type === 'basic' &&
            event.request.url.startsWith(self.location.origin)) {

          const responseToCache = networkResponse.clone();
          try {
            const cache = await caches.open(CACHE_NAME);
            await cache.put(event.request, responseToCache);
          } catch (cacheError) {
            console.warn('[SW] Cache put failed:', cacheError);
          }
        }

        return networkResponse;
      } catch (error) {
        console.warn('[SW] Fetch failed:', error);

        // Return cached offline page for navigation requests
        if (event.request.destination === 'document') {
          const offlineResponse = await caches.match(OFFLINE_URL);
          return offlineResponse || new Response('Offline', { status: 503, statusText: 'Service Unavailable' });
        }

        return new Response('', { status: 503, statusText: 'Service Unavailable' });
      }
    })()
  );
});

// Message event - handle messages from main thread
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
