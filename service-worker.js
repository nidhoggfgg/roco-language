const CACHE_NAME = "roco-language-v15";
const APP_SHELL = [
  "./",
  "./index.html",
  "./styles.css?v=15",
  "./script.js?v=15",
  "./manifest.webmanifest",
  "./assets/icon.svg",
  "./assets/icon-192.png",
  "./assets/icon-512.png",
  "./assets/RUNEREGULAR.ttf",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)),
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    Promise.all([
      caches
        .keys()
        .then((cacheNames) =>
          Promise.all(
            cacheNames
              .filter((cacheName) => cacheName !== CACHE_NAME)
              .map((cacheName) => caches.delete(cacheName)),
          ),
        ),
      self.clients.claim(),
      self.clients
        .matchAll({ includeUncontrolled: true, type: "window" })
        .then((clients) =>
          Promise.all(
            clients.map((client) => {
              const clientUrl = new URL(client.url);

              if (clientUrl.origin !== self.location.origin) {
                return undefined;
              }

              return client.navigate(client.url);
            }),
          ),
        ),
    ]),
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") {
    return;
  }

  const requestUrl = new URL(event.request.url);

  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          if (requestUrl.origin === self.location.origin && networkResponse.ok) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseClone);
            });
          }

          return networkResponse;
        })
        .catch(() =>
          caches
            .match(event.request)
            .then((cachedResponse) => cachedResponse || caches.match("./index.html")),
        ),
    );
    return;
  }

  if (
    requestUrl.origin === self.location.origin &&
    ["script", "style"].includes(event.request.destination)
  ) {
    event.respondWith(fetchAndCache(event.request).catch(() => caches.match(event.request)));
    return;
  }

  event.respondWith(caches.match(event.request).then((cachedResponse) => cachedResponse || fetchAndCache(event.request)));
});

function fetchAndCache(request) {
  return fetch(request).then((networkResponse) => {
    const requestUrl = new URL(request.url);

    if (requestUrl.origin === self.location.origin && networkResponse.ok) {
      const responseClone = networkResponse.clone();
      caches.open(CACHE_NAME).then((cache) => {
        cache.put(request, responseClone);
      });
    }

    return networkResponse;
  });
}
