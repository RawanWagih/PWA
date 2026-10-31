
self.addEventListener("install", () => {
    console.log("Service worker installed.");
});

self.addEventListener("activate", () => {
    console.log("Service worker activated.");
});

self.addEventListener("fetch", (event) => {
    // Required by Chrome to pass PWA installability criteria
});
