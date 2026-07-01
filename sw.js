// BUILD: 20260701152349
// v30
const CACHE_NAME = 'dieta-app-v30';

// Installa immediatamente senza aspettare
self.addEventListener('install', e => {
  self.skipWaiting();
});

// Al activate: cancella TUTTE le cache vecchie e prendi controllo immediato
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Fetch: Network-first sempre — mai servire dalla cache
// Così ogni aggiornamento su GitHub è immediatamente visibile
self.addEventListener('fetch', e => {
  // Ignora richieste non-HTTP (chrome-extension ecc.)
  if(!e.request.url.startsWith('http')) return;
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});

// Messaggio da app per forzare reload
self.addEventListener('message', e => {
  if(e.data === 'SKIP_WAITING') self.skipWaiting();
});
