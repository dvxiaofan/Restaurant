
var CACHE_NAME = 'restaurant-cache';

var urlsToCache = [
	'/',
	'./index.html',
	'./css/styles.css',
	'./js/dbhelper.js',
	'./js/main.js',
	'./js/restaurant_info.js',
	'./data/restaurants.json',
	'./img/1.jpg',
	'./img/2.jpg',
	'./img/3.jpg',
	'./img/4.jpg',
	'./img/5.jpg',
	'./img/6.jpg',
	'./img/7.jpg',
	'./img/8.jpg',
	'./img/9.jpg',
	'./img/10.jpg'
];

self.addEventListener('install', event => {
	event.waitUntil(
		caches.open(CACHE_NAME)
			.then(cache => {
				console.log('open cache')
				return cache.addAll(urlsToCache);
			})
	);
});

self.addEventListener('activate', event => {
	event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
	event.respondWith(
		caches.match(event.request, { ignoreSearch: true })
			.then(response => {
				return response || fetch(event.request);
			})
			.catch(error => {
				console.log(error, event.request);
			})
	);
});
