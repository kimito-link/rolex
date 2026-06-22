// 文言・手順・キーワードなど、表参道フロー固有の定数をまとめる。

import { DEFAULT_MODEL_SLOT, DEFAULT_STORE } from "./types";

export { DEFAULT_MODEL_SLOT, DEFAULT_STORE };

/** 表参道 応募手順（トップ「手順を見る」で表示） */
export const OMOTESANDO_STEPS: string[] = [
  "Gmailで予約メールを開き、予約URLをタップして開く",
  "予約タイプは「事前来店予約」を選ぶ（RCPO中古・買取査定ではない）",
  "「リクエストを開始する」を押す",
  "希望来店日を選ぶ",
  "希望来店時間を選ぶ",
  "時間枠の中で「コスモグラフ デイトナ・GMTマスターII」と書かれた枠を選ぶ（モデル名なしの通常枠は避ける）",
  "注意事項を確認して「同意する」を押す",
  "お客様情報を入力（姓・名・セイ・メイ・生年月日・電話・メール・メール再入力）",
  "個人情報取り扱い／営業のお知らせに同意する",
  "reCAPTCHA「私はロボットではありません」を自分で操作する",
  "入力内容確認画面で内容を確認する",
  "SMS認証コードを自分で入力し「認証する」を押して完了",
  "完了したらこのアプリで「応募済み」にする",
];

/** Gmail検索キーワード（コピー補助に使う） */
export const GMAIL_SEARCH_KEYWORDS: string[] = [
  "ロレックス ブティック 表参道",
  "ROLEX BOUTIQUE OMOTESANDO",
  "ご来店予約",
  "リクエスト",
  "お客様のご希望に添うことが出来ませんでした",
];

/** Gmail連携時に除外したい（ロレックス予約と無関係な）キーワード */
export const GMAIL_EXCLUDE_KEYWORDS: string[] = [
  "App Store Connect",
  "Apple",
  "submission is complete",
  "Google",
  "広告",
  "セールスメール",
];

/** 重複応募の注意文 */
export const DUPLICATE_WARNING =
  "表参道は期間内1回のみの可能性があります。すでに応募済みの場合、重複リクエストは無効になる可能性があります。";

/** 安全に関する注意（本人手動操作前提の明示） */
export const SAFETY_NOTICE =
  "このアプリは入力補助と履歴管理のみを行います。reCAPTCHA・SMS認証・最終送信はすべてご本人が手動で行ってください。";
