const cacheName = 'v1';
const cacheAsset = [
    'index.html',
    'app.js',
    'style.css'
]

//install
self.addEventListener('install', (e) =>{
    console.log('Service Worker: Installed');
    e.waitUntil(
        caches.open(cacheName)
        .then(cache =>{
            console.log('Service Worker: Caching Files');
            cache.addAll(cacheAsset);
        })
        .then(  ()=> self.skipWaiting())
    )
})

//activate
self.addEventListener('activate', (e) =>{
    console.log('Service Worker: Activated')
//remove Unwanted Cache
    e.waitUntil(
        caches.keys().then(cacheNames =>{
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== cacheName) {
                        console.log('Service Worker: Clearing old cache');
                        return caches.delete(cache);
                    }
                })
            )
        })
    );
});

//fetch Catched files
self.addEventListener('fetch', (e) =>{
    console.log('Service Worker: Fetching')
    e.respondWith(
        fetch(e.request).catch( ()=> caches.match(e.request))
    )

})