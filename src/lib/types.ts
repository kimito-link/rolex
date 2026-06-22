// アプリ全体で使う型定義

/** 応募ステータス */
export type ApplicationStatus =
  | "未応募"
  | "入力中"
  | "認証待ち"
  | "応募済み"
  | "落選"
  | "当選";

export const APPLICATION_STATUSES: ApplicationStatus[] = [
  "未応募",
  "入力中",
  "認証待ち",
  "応募済み",
  "落選",
  "当選",
];

/** ステータスごとの表示色（Tailwindクラス） */
export const STATUS_STYLE: Record<ApplicationStatus, string> = {
  未応募: "bg-stone-200 text-stone-700",
  入力中: "bg-amber-100 text-amber-800",
  認証待ち: "bg-orange-100 text-orange-800",
  応募済み: "bg-emerald-100 text-emerald-800",
  落選: "bg-rose-100 text-rose-700",
  当選: "bg-yellow-100 text-yellow-800 ring-1 ring-yellow-400",
};

/**
 * 本人の個人情報（プロフィール）。
 * 外部送信は一切行わず、端末のlocalStorageにのみ保存する。
 */
export interface Profile {
  lastName: string; // 姓
  firstName: string; // 名
  lastNameKana: string; // セイ
  firstNameKana: string; // メイ
  birthday: string; // 生年月日（YYYY-MM-DD 等、本人が入力した文字列）
  phone: string; // 携帯電話番号
  email: string; // メールアドレス
  // メール再入力は email と同じ値をコピーするため別フィールドは持たない
}

export const EMPTY_PROFILE: Profile = {
  lastName: "",
  firstName: "",
  lastNameKana: "",
  firstNameKana: "",
  birthday: "",
  phone: "",
  email: "",
};

/** 応募1件の記録 */
export interface Application {
  id: string;
  store: string; // 店舗名（既定: ロレックス ブティック 表参道）
  url: string; // Gmailからコピーした予約URL
  visitDate: string; // 希望来店日
  visitTime: string; // 希望来店時間
  modelSlot: string; // 選択モデル枠（例: コスモグラフ デイトナ・GMTマスターII）
  appliedDate: string; // 応募日
  status: ApplicationStatus;
  memo: string;
  createdAt: number; // 作成時刻（ソート用 epoch ms）
  updatedAt: number; // 更新時刻
}

export const DEFAULT_STORE = "ロレックス ブティック 表参道";
export const DEFAULT_MODEL_SLOT = "コスモグラフ デイトナ・GMTマスターII";
