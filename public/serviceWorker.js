const CACHE_NAME = "version-1";
const urlsToCache = ["index.html", "offline.html"];
const self = this;

//install sw

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});
// listen sw

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then(() => {
      return fetch(e.request).catch(() => caches.match("offline.html"));
    })
  );
});
//activate sw

self.addEventListener('activate',(event)=>{
    const cacheWhiteList = [];
    cacheWhiteList.push(CACHE_NAME)
    caches.keys().then((cacheNames)=>Promise.all(
        cacheNames.map((cacheNames)=> {
            if(!cacheWhiteList.includes(cacheNames)){
                return caches.delete(cacheNames)
            }
        })
    ))
})
