if(!self.define){let e,s={};const a=(a,t)=>(a=new URL(a+".js",t).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(t,n)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let c={};const r=e=>a(e,i),f={module:{uri:i},exports:c,require:r};s[i]=Promise.all(t.map((e=>f[e]||r(e)))).then((e=>(n(...e),c)))}}define(["./workbox-f1770938"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/C3htfG1vz_PrqMLOY9xvE/_buildManifest.js",revision:"2ec694eb52ae4f523f265a46bae4d768"},{url:"/_next/static/C3htfG1vz_PrqMLOY9xvE/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/190-8beea64ebbeb625b.js",revision:"C3htfG1vz_PrqMLOY9xvE"},{url:"/_next/static/chunks/231-b265cc4abea80d88.js",revision:"C3htfG1vz_PrqMLOY9xvE"},{url:"/_next/static/chunks/35.03ae917f238a8966.js",revision:"03ae917f238a8966"},{url:"/_next/static/chunks/351-89ad105f50b3f63f.js",revision:"C3htfG1vz_PrqMLOY9xvE"},{url:"/_next/static/chunks/386-98dbf2c477138d01.js",revision:"C3htfG1vz_PrqMLOY9xvE"},{url:"/_next/static/chunks/421-36b8fd64292fb825.js",revision:"C3htfG1vz_PrqMLOY9xvE"},{url:"/_next/static/chunks/436-6aef5fbaedd213c6.js",revision:"C3htfG1vz_PrqMLOY9xvE"},{url:"/_next/static/chunks/618-f2a6af9b4085955a.js",revision:"C3htfG1vz_PrqMLOY9xvE"},{url:"/_next/static/chunks/636-5a12ad9473e7ba1f.js",revision:"C3htfG1vz_PrqMLOY9xvE"},{url:"/_next/static/chunks/68-9109b8f29e3835fa.js",revision:"C3htfG1vz_PrqMLOY9xvE"},{url:"/_next/static/chunks/7064611b-05ab4cff8b593dcd.js",revision:"C3htfG1vz_PrqMLOY9xvE"},{url:"/_next/static/chunks/753-95b11a6f6fda299d.js",revision:"C3htfG1vz_PrqMLOY9xvE"},{url:"/_next/static/chunks/999-e8b04aa52de3fb8f.js",revision:"C3htfG1vz_PrqMLOY9xvE"},{url:"/_next/static/chunks/app/(auth)/sign-in/%5B%5B...sign-in%5D%5D/page-bed4855b25edd4ca.js",revision:"C3htfG1vz_PrqMLOY9xvE"},{url:"/_next/static/chunks/app/(auth)/sign-up/%5B%5B...sign-up%5D%5D/page-c7e45ab5a1a83026.js",revision:"C3htfG1vz_PrqMLOY9xvE"},{url:"/_next/static/chunks/app/@modal/default-3c16d8b30299ec39.js",revision:"C3htfG1vz_PrqMLOY9xvE"},{url:"/_next/static/chunks/app/_not-found/page-b9d692ba3f65c87a.js",revision:"C3htfG1vz_PrqMLOY9xvE"},{url:"/_next/static/chunks/app/dashboard/%5Bid%5D/authcontrol/page-c77f36d18f0ea4d7.js",revision:"C3htfG1vz_PrqMLOY9xvE"},{url:"/_next/static/chunks/app/dashboard/%5Bid%5D/loading-97661e08aa120069.js",revision:"C3htfG1vz_PrqMLOY9xvE"},{url:"/_next/static/chunks/app/dashboard/%5Bid%5D/page-bd3eb1bb01d2c1ec.js",revision:"C3htfG1vz_PrqMLOY9xvE"},{url:"/_next/static/chunks/app/dashboard/create-brief/layout-1fd88226292b1136.js",revision:"C3htfG1vz_PrqMLOY9xvE"},{url:"/_next/static/chunks/app/dashboard/create-brief/page-cd014fa234c19c92.js",revision:"C3htfG1vz_PrqMLOY9xvE"},{url:"/_next/static/chunks/app/dashboard/layout-adbee24a1d815685.js",revision:"C3htfG1vz_PrqMLOY9xvE"},{url:"/_next/static/chunks/app/dashboard/loading-882264b2113e988b.js",revision:"C3htfG1vz_PrqMLOY9xvE"},{url:"/_next/static/chunks/app/dashboard/page-e513cddf408fc9ce.js",revision:"C3htfG1vz_PrqMLOY9xvE"},{url:"/_next/static/chunks/app/default-6c62b1b8b02b37a5.js",revision:"C3htfG1vz_PrqMLOY9xvE"},{url:"/_next/static/chunks/app/layout-6caa1712fade9f54.js",revision:"C3htfG1vz_PrqMLOY9xvE"},{url:"/_next/static/chunks/app/page-6fa5b095022fe264.js",revision:"C3htfG1vz_PrqMLOY9xvE"},{url:"/_next/static/chunks/b2d98e07-e13b037c584362a9.js",revision:"C3htfG1vz_PrqMLOY9xvE"},{url:"/_next/static/chunks/f4898fe8-432569772a4d550f.js",revision:"C3htfG1vz_PrqMLOY9xvE"},{url:"/_next/static/chunks/fd9d1056-7901598259050915.js",revision:"C3htfG1vz_PrqMLOY9xvE"},{url:"/_next/static/chunks/ff804112-59035343aebb2576.js",revision:"C3htfG1vz_PrqMLOY9xvE"},{url:"/_next/static/chunks/framework-f66176bb897dc684.js",revision:"C3htfG1vz_PrqMLOY9xvE"},{url:"/_next/static/chunks/main-app-fcead52bda894728.js",revision:"C3htfG1vz_PrqMLOY9xvE"},{url:"/_next/static/chunks/main-ea71111dbddb9c5b.js",revision:"C3htfG1vz_PrqMLOY9xvE"},{url:"/_next/static/chunks/pages/_app-6a626577ffa902a4.js",revision:"C3htfG1vz_PrqMLOY9xvE"},{url:"/_next/static/chunks/pages/_error-1be831200e60c5c0.js",revision:"C3htfG1vz_PrqMLOY9xvE"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-71dfbe0e9adcd4f3.js",revision:"C3htfG1vz_PrqMLOY9xvE"},{url:"/_next/static/css/52c58fc74a8d6ab0.css",revision:"52c58fc74a8d6ab0"},{url:"/_next/static/media/0596140cb8d9223a-s.woff2",revision:"ddd5de66d4a7c56eeac6e0b10c5d8521"},{url:"/_next/static/media/1a4dd1d7cd3232ea-s.woff2",revision:"91c6fe4b62b5ebda5ccee3c4aa1eb33d"},{url:"/_next/static/media/341baa6ce7a16e81-s.p.woff2",revision:"0c7b4bd9156673a090be9999002eaab1"},{url:"/_next/static/media/356abdd51b933898-s.woff2",revision:"4ed5a85b9b460c31a44ba541e277bcc0"},{url:"/_next/static/media/c22ccc5eb58b83e1-s.woff2",revision:"8a051a2b61e4a766fff21bb106142860"},{url:"/_next/static/media/d70c23d6fe66d464-s.woff2",revision:"7abbd25026a8e3994d885bd8704b9588"},{url:"/fonts/Rubik-Bold.ttf",revision:"627d0e537f4a06a535ae956e4a87837f"},{url:"/fonts/Rubik-Medium.ttf",revision:"e785acbf5775e9bec2129f4967a75472"},{url:"/fonts/Rubik-Regular.ttf",revision:"46df28800514364ef2766f74386b1bd3"},{url:"/fonts/Rubik-SemiBold.ttf",revision:"742cf1e6b879de2de937aa287fddece4"},{url:"/icons/icon-192x192.png",revision:"710828fef0106860897ed8b42dbe161d"},{url:"/icons/icon-384x384.png",revision:"aeb1a5bd3d8cf6ffb27b8e471d32fdd5"},{url:"/icons/icon-512x512.png",revision:"b1497c9903180453962c9b95b0072485"},{url:"/illustrations/no_data.svg",revision:"ffbfddfd78ef7c12cacfce75171b7b72"},{url:"/images/screenshot.jpg",revision:"a72283d1870fe4c18d047783b8f2e776"},{url:"/manifest.json",revision:"cbd9cad89e12f18b022736c3f19c0e3c"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/vercel.svg",revision:"61c6b19abff40ea7acd577be818f3976"}],{ignoreURLParametersMatching:[/^utm_/,/^fbclid$/]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({response:e})=>e&&"opaqueredirect"===e.type?new Response(e.body,{status:200,statusText:"OK",headers:e.headers}):e}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:2592e3})]}),"GET"),e.registerRoute(/\/_next\/static.+\.js$/i,new e.CacheFirst({cacheName:"next-static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4|webm)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:48,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e,url:{pathname:s}})=>!(!e||s.startsWith("/api/auth/callback")||!s.startsWith("/api/"))),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:s},sameOrigin:a})=>"1"===e.headers.get("RSC")&&"1"===e.headers.get("Next-Router-Prefetch")&&a&&!s.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc-prefetch",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:s},sameOrigin:a})=>"1"===e.headers.get("RSC")&&a&&!s.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:{pathname:e},sameOrigin:s})=>s&&!e.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e})=>!e),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET"),self.__WB_DISABLE_DEV_LOGS=!0}));
