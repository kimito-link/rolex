// 最小限のサービスワーカー。
// アプリシェルをキャッシュし、オフラインでも起動できるようにする。
// 個人情報はキャッシュしない（localStorageのみで扱う）。

const CACHE = "rrh-v1";
const APP_SHELL = ["/"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  // GET のみ対象。ナビゲーションはネット優先＋オフライン時キャッシュ。
  if (request.method !== "GET") return;

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request).catch(() => caches.match("/").then((r) => r || Response.error()))
    );
    return;
  }

  // それ以外はキャッシュ優先、無ければネット取得して保存
  event.respondWith(
    caches.match(request).then(
      (cached) =>
        cached ||
        fetch(request).then((res) => {
          // 同一オリジンの成功レスポンスのみキャッシュ
          if (
            res.ok &&
            new URL(request.url).origin === self.location.origin
          ) {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put(request, copy));
          }
          return res;
        })
    )
  );
});
