# ロレックス応募補助アプリ (Rolex Reserve Helper)

ロレックス ブティック表参道の「事前来店予約」を、**ご本人がスマホから正規に1回応募する作業を楽にする**ための入力補助・履歴管理アプリです。

> ⚠️ このアプリは自動応募ツールではありません。
> reCAPTCHA・SMS認証・最終送信はすべてご本人が手動で行います。

## できること

- **応募URL管理** … Gmailからコピーした予約URLを保存し、ワンタップで予約ページを開く
- **表参道専用の手順表示** … どの枠（コスモグラフ デイトナ・GMTマスターII）を選ぶか迷わない
- **個人情報コピー補助** … 姓・名・セイ・メイ・生年月日・電話・メールをワンタップでコピーして貼り付け
- **応募履歴管理** … 希望日時・モデル枠・ステータス（未応募/入力中/認証待ち/応募済み/落選/当選）・メモを記録
- **重複応募防止の注意表示** … すでに応募済みの場合に警告
- **Gmail検索補助** … 予約メールを探すためのキーワードをコピー
- **PWA対応** … iPhoneのホーム画面に追加してアプリのように使える

## やらないこと（禁止事項）

以下は**実装していません**し、する予定もありません。

- reCAPTCHAの自動突破
- SMS認証コードの自動取得・自動入力
- 最終応募の自動送信
- 複数アカウント応募・大量応募
- サイト規約やボット検知の回避

応募はあくまでご本人が、本人確認書類と一致する内容で、期間内1回のみ行ってください。

## データの扱い

- 個人情報・応募履歴は **この端末内の localStorage にのみ** 保存されます。
- **外部サーバーへの送信は一切行いません。**
- 「設定」タブからいつでも全データを消去できます。

## 開発

```bash
npm install
npm run dev      # http://localhost:3000
```

アイコンを作り直す場合:

```bash
node scripts/gen-icons.mjs
```

## ビルド / デプロイ

```bash
npm run build
npm run start
```

Vercel にそのままデプロイできます（追加設定不要）。

## 技術構成

- Next.js (App Router) + TypeScript
- Tailwind CSS
- localStorage（将来 Supabase 等へ移行しやすいよう `src/lib/storage.ts` に入出力を集約）
- PWA（manifest + service worker）

## ディレクトリ

```
src/
  app/
    layout.tsx        ルートレイアウト（PWAメタdata・SW登録）
    page.tsx          メイン画面（タブ切り替え）
    manifest.ts       PWAマニフェスト
    globals.css
  components/         画面パーツ
  lib/
    types.ts          型・定数
    constants.ts      手順・キーワード・注意文
    storage.ts        localStorage 入出力（差し替え点）
    useAppState.ts    状態管理フック
    useClipboard.ts   コピー補助
    duplicate.ts      重複応募チェック
public/
  sw.js               サービスワーカー
  icon-*.png          アイコン
```
