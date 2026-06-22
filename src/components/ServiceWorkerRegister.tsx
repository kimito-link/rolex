"use client";

// 旧バージョンで登録された Service Worker を確実に取り除くためのコンポーネント。
//
// 以前は SW でアプリシェルをキャッシュしていたが、「更新が反映されない／
// シークレットモードでしか最新が見えない」不具合の原因になっていた。
// このアプリはオンライン前提なので SW は廃止し、ここでは
// 既存の登録を解除し、残ったキャッシュを削除する。

import { useEffect } from "react";

export function ServiceWorkerRegister() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // 既存の Service Worker をすべて登録解除する
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .getRegistrations()
        .then((regs) => regs.forEach((r) => r.unregister()))
        .catch(() => {});
    }

    // 残っているキャッシュをすべて削除する
    if ("caches" in window) {
      caches
        .keys()
        .then((keys) => Promise.all(keys.map((k) => caches.delete(k))))
        .catch(() => {});
    }
  }, []);

  return null;
}
