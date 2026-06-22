// 重複応募チェック。
// 「期間内1回のみ」の可能性があるため、同じ店舗にすでに有効な応募があれば注意を出す。
//
// ここでは「応募が確定方向に進んでいる」状態（応募済み・認証待ち）を
// アクティブとみなす。落選/当選/未応募/入力中は対象外。

import { Application } from "./types";

const ACTIVE_STATUSES = new Set(["応募済み", "認証待ち"]);

/**
 * 指定店舗に、自分（excludeId）以外でアクティブな応募があるか。
 * ある場合はその応募を返す（なければ null）。
 */
export function findActiveDuplicate(
  apps: Application[],
  store: string,
  excludeId?: string
): Application | null {
  const normalized = store.trim();
  for (const a of apps) {
    if (a.id === excludeId) continue;
    if (a.store.trim() !== normalized) continue;
    if (ACTIVE_STATUSES.has(a.status)) return a;
  }
  return null;
}
