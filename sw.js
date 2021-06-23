/* eslint-disable no-restricted-globals */

// This service worker can be customized!
// See https://developers.google.com/web/tools/workbox/modules
// for the list of available Workbox modules, or add any other
// code you'd like.
// You can also remove this file if you'd prefer not to use a
// service worker, and the Workbox build step will be skipped.

import { clientsClaim } from 'workbox-core';
import { ExpirationPlugin } from 'workbox-expiration';
import { precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';

clientsClaim();

// Precache all of the assets generated by your build process.
// Their URLs are injected into the manifest variable below.
// This variable must be present somewhere in your service worker file,
// even if you decide not to use precaching. See https://cra.link/PWA
precacheAndRoute([{"revision":"e66abb1def72a34cda8e2e48cf3a7de3","url":"index.html"},{"revision":"bb5cbebc3f343f82e8aa5fcbf6d10449","url":"logo192.png"},{"revision":"33dbdd0177549353eeeb785d02c294af","url":"logo192old.png"},{"revision":"7b1486f6986e1bbdcf4147683d5e98d9","url":"logo512.png"},{"revision":"917515db74ea8d1aee6a246cfbcc0b45","url":"logo512old.png"},{"revision":"10b1ab8618edf67122a46435eab9d4fd","url":"service-worker.js"},{"revision":"b117315d1445162e2e01e098a1ae95cd","url":"static/css/2.8d7e3d12.chunk.css"},{"revision":"0b2f8720530766aa1ae2adcb431f096f","url":"static/css/main.fd0ca9f5.chunk.css"},{"revision":"f2c03e728992058613236c27d63aa1b8","url":"static/js/2.885a05bf.chunk.js"},{"revision":"7855bbadc836b605c294466c76692ebf","url":"static/js/main.df65e774.chunk.js"},{"revision":"c8dff563a6ed6d50da39beae0e0816ee","url":"static/js/runtime-main.18c320a8.js"},{"revision":"4b0059ff3cfe94d527e4ee06d7dda9a3","url":"static/media/back.8de1c0b6.png"},{"revision":"dda749185102fa9eaf4495ba8801aadb","url":"static/media/logowthname.f7ce1672.png"}]);

// Set up App Shell-style routing, so that all navigation requests
// are fulfilled with your index.html shell. Learn more at
// https://developers.google.com/web/fundamentals/architecture/app-shell
const fileExtensionRegexp = new RegExp('/[^/?]+\\.[^/]+$');
registerRoute(
  // Return false to exempt requests from being fulfilled by index.html.
  ({ request, url }) => {
    // If this isn't a navigation, skip.
    if (request.mode !== 'navigate') {
      return false;
    } // If this is a URL that starts with /_, skip.

    if (url.pathname.startsWith('/_')) {
      return false;
    } // If this looks like a URL for a resource, because it contains // a file extension, skip.

    if (url.pathname.match(fileExtensionRegexp)) {
      return false;
    } // Return true to signal that we want to use the handler.

    return true;
  },
  createHandlerBoundToURL(process.env.PUBLIC_URL + '/index.html')
);

// An example runtime caching route for requests that aren't handled by the
// precache, in this case same-origin .png requests like those from in public/
registerRoute(
  // Add in any other file extensions or routing criteria as needed.
  ({ url }) => url.origin === self.location.origin && url.pathname.endsWith('.png'), // Customize this strategy as needed, e.g., by changing to CacheFirst.
  new StaleWhileRevalidate({
    cacheName: 'images',
    plugins: [
      // Ensure that once this runtime cache reaches a maximum size the
      // least-recently used images are removed.
      new ExpirationPlugin({ maxEntries: 50 }),
    ],
  })
);

// This allows the web app to trigger skipWaiting via
// registration.waiting.postMessage({type: 'SKIP_WAITING'})
self.addEventListener('message', async (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    try {
      await self.skipWaiting()
      const clients = await self.clients.matchAll()
      clients.forEach(client => client.postMessage('reload-window'))
    } catch (e) {
      console.info(e)
    }
  }
});

// Any other custom service worker logic can go here.