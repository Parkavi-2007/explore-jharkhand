const CACHE_NAME = "explore-jharkhand-v5";
const FILES_TO_CACHE = [
  "index.html",
  "destinations.html",
  "gallery.html",
  "planner.html",
  "contact.html",
  "detail.html",
  "map.html",
  "favorites.html",
  "404.html",
  "style.css",
  "script.js",
  "manifest.json",
  "images/hundru.jpeg",
  "images/dassamfalls.jpeg",
  "images/betlapark.jpeg",
  "images/dalma.jpeg",
  "images/baidyanath.jpeg",
  "images/jaganath.jpeg",
  "images/tribalmuseum.jpeg",
  "images/patratu.jpeg",
  "images/netarhat.jpeg",
  "images/rajrappa.jpeg",
  "images/parasnath.jpeg",
  "images/maithon.jpeg"
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys.filter(function (key) { return key !== CACHE_NAME; })
            .map(function (key) { return caches.delete(key); })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (cached) {
      return cached || fetch(event.request).catch(function () {
        return caches.match("index.html");
      });
    })
  );
});