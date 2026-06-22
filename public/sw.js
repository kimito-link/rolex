// このアプリはオンライン前提（予約はネット経由）のため、
// Service Worker によるキャッシュは「更新が反映されない」不具合の原因に
// なりやすい。よって SW は廃止し、もし過去に登録されていても
// 自分自身を登録解除し、全キャッシュを削除する。
//
// 個人情報は localStorage のみで扱い、ここでは何も保存しない。

self.addEventListener("install", () => {
  // 待たずに即有効化
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      // 旧バージョンが作った全キャッシュを削除
      const keys = await caches.keys();
      await Promise.all(keys.map((k) => caches.delete(k)));
      // この Service Worker 自身を登録解除
      await self.registration.unregister();
      // 開いているタブを再読み込みして、SW無しの最新状態にする
      const clients = await self.clients.matchAll({ type: "window" });
      clients.forEach((client) => client.navigate(client.url));
    })()
  );
});

// fetch はインターセプトしない（常にネットワークへ素通り＝必ず最新）
