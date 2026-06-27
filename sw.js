// v21
const CACHE_NAME = 'dieta-app-v21';
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k))))
  );
  self.clients.claim();
});
// Nessun intercettamento fetch — tutto passa dalla rete
