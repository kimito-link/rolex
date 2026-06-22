// localStorage への読み書きを担うデータ層。
// 後から Supabase 等に差し替えやすいよう、ここに入出力を集約する。
//
// 設計方針:
// - 個人情報・応募履歴はすべて端末内 localStorage にのみ保存する。
// - 外部サーバーへの送信は一切行わない。
// - 将来クラウド移行する場合は、この関数群のシグネチャを保ったまま
//   実装だけを差し替えられるようにしておく。

import {
  Application,
  EMPTY_PROFILE,
  Profile,
} from "./types";

const PROFILE_KEY = "rrh.profile.v1";
const APPLICATIONS_KEY = "rrh.applications.v1";

/** SSR時にlocalStorageが無い環境を判定する */
function hasStorage(): boolean {
  return typeof window !== "undefined" && !!window.localStorage;
}

// ---- Profile ----

export function loadProfile(): Profile {
  if (!hasStorage()) return { ...EMPTY_PROFILE };
  try {
    const raw = window.localStorage.getItem(PROFILE_KEY);
    if (!raw) return { ...EMPTY_PROFILE };
    const parsed = JSON.parse(raw) as Partial<Profile>;
    // 既存キーが欠けていても EMPTY_PROFILE で補完する
    return { ...EMPTY_PROFILE, ...parsed };
  } catch {
    return { ...EMPTY_PROFILE };
  }
}

export function saveProfile(profile: Profile): void {
  if (!hasStorage()) return;
  window.localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

// ---- Applications ----

export function loadApplications(): Application[] {
  if (!hasStorage()) return [];
  try {
    const raw = window.localStorage.getItem(APPLICATIONS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Application[];
    if (!Array.isArray(parsed)) return [];
    // 新しい順に並べて返す
    return parsed.sort((a, b) => b.createdAt - a.createdAt);
  } catch {
    return [];
  }
}

export function saveApplications(apps: Application[]): void {
  if (!hasStorage()) return;
  window.localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(apps));
}

/** 端末内の全データを削除する（プライバシー配慮の「全消去」用） */
export function clearAll(): void {
  if (!hasStorage()) return;
  window.localStorage.removeItem(PROFILE_KEY);
  window.localStorage.removeItem(APPLICATIONS_KEY);
}
