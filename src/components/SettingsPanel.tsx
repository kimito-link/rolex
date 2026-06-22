"use client";

// 設定タブ。安全に関する注意の明示、端末内データの全消去を提供する。

import { useState } from "react";
import { SAFETY_NOTICE } from "@/lib/constants";
import { Card, OutlineButton } from "./ui";

export function SettingsPanel({
  count,
  onClearAll,
}: {
  count: number;
  onClearAll: () => void;
}) {
  const [confirming, setConfirming] = useState(false);

  return (
    <div className="space-y-4">
      <Card>
        <h2 className="mb-2 text-lg font-bold text-stone-800">
          このアプリについて
        </h2>
        <p className="text-sm leading-relaxed text-stone-600">
          {SAFETY_NOTICE}
        </p>
        <ul className="mt-3 space-y-1.5 text-xs leading-relaxed text-stone-500">
          <li>・個人情報・履歴はこの端末内（localStorage）にのみ保存されます。</li>
          <li>・外部サーバーへの送信は行いません。</li>
          <li>・reCAPTCHAの自動操作、SMS認証コードの自動取得・入力、最終送信の自動化は行いません。</li>
          <li>・応募はご本人が正規の手順で1回のみ行ってください。</li>
        </ul>
      </Card>

      <Card>
        <h2 className="mb-2 text-lg font-bold text-stone-800">
          データの管理
        </h2>
        <p className="mb-3 text-sm text-stone-600">
          保存中の応募記録: <span className="font-semibold">{count}件</span>
          <br />
          端末を変える・人に渡す前などに、すべての個人情報と履歴を消去できます。
        </p>

        {!confirming ? (
          <OutlineButton
            onClick={() => setConfirming(true)}
            className="border-rose-300 text-rose-600"
          >
            すべてのデータを消去
          </OutlineButton>
        ) : (
          <div className="space-y-2 rounded-xl bg-rose-50 p-3">
            <p className="text-sm font-medium text-rose-700">
              本当に全消去しますか？ この操作は元に戻せません。
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setConfirming(false)}
                className="rounded-xl border border-stone-300 bg-white py-2.5 text-sm font-medium"
              >
                やめる
              </button>
              <button
                type="button"
                onClick={() => {
                  onClearAll();
                  setConfirming(false);
                }}
                className="rounded-xl bg-rose-600 py-2.5 text-sm font-semibold text-white"
              >
                消去する
              </button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
