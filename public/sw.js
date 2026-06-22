// 最小限のサービスワーカー。
// オフラインでも起動できるよう最後に成功したレスポンスを保持しつつ、
// オンライン時は必ず最新を取りに行く「ネットワーク優先」方式にする。
// （以前はキャッシュ優先で、更新が反映されない不具合があったため変更）
// 個人情報はキャッシュしない（localStorageのみで扱う）。

const CACHE = "rrh-v2";
const APP_SHELL = ["/"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(APP_SHELL))
  );
  // 新しいSWを待たせず即座に有効化する
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  // GET 以外（POST等）はそのまま素通り
  if (request.method !== "GET") return;
  // 同一オリジン以外（CDN等）は触らない
  if (new URL(request.url).origin !== self.location.origin) return;

  // ネットワーク優先：取れたら最新を返しつつキャッシュ更新。
  // オフライン等で失敗したらキャッシュにフォールバック。
  event.respondWith(
    fetch(request)
      .then((res) => {
        if (res.ok) {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(request, copy));
        }
        return res;
      })
      .catch(async () => {
        const cached = await caches.match(request);
        if (cached) return cached;
        // ナビゲーションならトップのキャッシュで代替
        if (request.mode === "navigate") {
          const shell = await caches.match("/");
          if (shell) return shell;
        }
        return Response.error();
      })
  );
});
