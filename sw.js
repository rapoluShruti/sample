self.addEventListener("install", () => self.skipWaiting());

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.open("nirmaan-cache").then((cache) =>
      cache.match(event.request).then(
        (res) =>
          res ||
          fetch(event.request).then((response) => {
            cache.put(event.request, response.clone());
            return response;
          })
      )
    )
  );
});
