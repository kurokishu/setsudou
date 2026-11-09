// 前の住所で入った「電波がなくても開けるしかけ」を外して、新しい住所へ案内するためのもの
self.addEventListener('install', function(){ self.skipWaiting(); });
self.addEventListener('activate', function(e){
  e.waitUntil((async function(){
    var keys = await caches.keys();
    await Promise.all(keys.map(function(k){ return caches.delete(k); }));
    await self.registration.unregister();
    var cs = await self.clients.matchAll({type:'window'});
    cs.forEach(function(c){ c.navigate(c.url); });
  })());
});
