if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let r=Promise.resolve();return s[e]||(r=new Promise(async r=>{if("document"in self){const s=document.createElement("script");s.src=e,document.head.appendChild(s),s.onload=r}else importScripts(e),r()})),r.then(()=>{if(!s[e])throw new Error(`Module ${e} didn’t register its module`);return s[e]})},r=(r,s)=>{Promise.all(r.map(e)).then(e=>s(1===e.length?e[0]:e))},s={require:Promise.resolve(r)};self.define=(r,i,n)=>{s[r]||(s[r]=Promise.resolve().then(()=>{let s={};const o={uri:location.origin+r.slice(1)};return Promise.all(i.map(r=>{switch(r){case"exports":return s;case"module":return o;default:return e(r)}})).then(e=>{const r=n(...e);return s.default||(s.default=r),s})}))}}define("./service-worker.js",["./workbox-ec594346"],(function(e){"use strict";e.setCacheNameDetails({prefix:"harmonograph.art"}),self.addEventListener("message",e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()}),e.precacheAndRoute([{url:"404.html",revision:"ee2475dc991e849c37e48b5f4c22479d"},{url:"assets/icon-150.png",revision:"31368871e3340027edbfd3f0db97799a"},{url:"assets/icon-16.png",revision:"5fdb14977e323594e381c606a63b8b2c"},{url:"assets/icon-192.png",revision:"0dafad750bd23eef3996a61b068695ee"},{url:"assets/icon-32.png",revision:"dd8e1fc1aeb931fa10103752a6f2c3ce"},{url:"assets/icon-512.png",revision:"ba9187486157133ba7779dd0a0903373"},{url:"assets/logo.png",revision:"c4135b1fe55fd07ba7d8fcafb8d6a5cf"},{url:"index.html",revision:"e72926c3315c7421f594317e3eecb11f"}],{})}));
//# sourceMappingURL=service-worker.js.map
