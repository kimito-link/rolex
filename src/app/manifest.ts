import type { MetadataRoute } from "next";

// PWA マニフェスト。/manifest.webmanifest として配信される。
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ロレックス応募補助アプリ",
    short_name: "応募補助",
    description:
      "ロレックス ブティック表参道 事前来店予約の入力補助・履歴管理（本人手動操作前提）",
    start_url: "/",
    display: "standalone",
    background_color: "#f5f5f4",
    theme_color: "#127749",
    orientation: "portrait",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
