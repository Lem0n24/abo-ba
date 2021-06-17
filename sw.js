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
precacheAndRoute([{"revision":"f719a8e943df09148ae35c557d10670b","url":"index.html"},{"revision":"bb5cbebc3f343f82e8aa5fcbf6d10449","url":"logo192.png"},{"revision":"33dbdd0177549353eeeb785d02c294af","url":"logo192old.png"},{"revision":"7b1486f6986e1bbdcf4147683d5e98d9","url":"logo512.png"},{"revision":"917515db74ea8d1aee6a246cfbcc0b45","url":"logo512old.png"},{"revision":"4ec0eaff3c1a47d4b2056b8f3c8114a2","url":"service-worker.js"},{"revision":"1d8c9241c8cdd3f22cb29494fa27e67f","url":"static/css/2.7c775695.chunk.css"},{"revision":"d0719acd146fc4446ed290bf53cae163","url":"static/css/main.92da196c.chunk.css"},{"revision":"ce96d6cc7a48bf1ec42d64a8136a4cbc","url":"static/js/2.491469fc.chunk.js"},{"revision":"a69381193a94c1c831a47206b85c5f2f","url":"static/js/main.25918f5d.chunk.js"},{"revision":"c8dff563a6ed6d50da39beae0e0816ee","url":"static/js/runtime-main.18c320a8.js"}]);

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
