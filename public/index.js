if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .getRegistrations()
    .then((registrations) => {
      registrations.forEach((registration) => registration.unregister())
    })
    .catch(() => {})
}

if ("caches" in window) {
  caches.delete("rtd-giphy-search").catch(() => {})
}
