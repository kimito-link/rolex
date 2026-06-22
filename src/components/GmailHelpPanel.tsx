"use client";

// Gmail検索補助パネル。
// 予約メールをGmailで探しやすいよう、検索キーワードをコピーできる。
// 除外キーワードは「将来Gmail連携する場合に弾く対象」の参考として表示する。

import {
  GMAIL_EXCLUDE_KEYWORDS,
  GMAIL_SEARCH_KEYWORDS,
} from "@/lib/constants";
import { useClipboard } from "@/lib/useClipboard";
import { Card } from "./ui";

export function GmailHelpPanel() {
  const { copy, copiedKey } = useClipboard();

  return (
    <Card>
      <h2 className="mb-1 text-lg font-bold text-stone-800">Gmail検索補助</h2>
      <p className="mb-3 text-sm text-stone-500">
        キーワードをタップしてコピーし、Gmailの検索窓に貼り付けて予約メールを探します。
      </p>

      <div className="space-y-2">
        {GMAIL_SEARCH_KEYWORDS.map((kw) => {
          const isCopied = copiedKey === kw;
          return (
            <button
              key={kw}
              type="button"
              onClick={() => copy(kw, kw)}
              className={`flex w-full items-center justify-between rounded-xl border px-3 py-2.5 text-left transition active:scale-[0.99] ${
                isCopied
                  ? "border-rolex-green bg-rolex-green/10"
                  : "border-stone-300 bg-white"
              }`}
            >
              <span className="text-sm font-medium text-stone-800">{kw}</span>
              <span className="ml-2 flex-none text-xs font-semibold text-rolex-green">
                {isCopied ? "✓ コピー" : "コピー"}
              </span>
            </button>
          );
        })}
      </div>

      <details className="mt-4">
        <summary className="cursor-pointer text-sm font-medium text-stone-600">
          除外キーワード（予約と無関係なメール）
        </summary>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {GMAIL_EXCLUDE_KEYWORDS.map((kw) => (
            <span
              key={kw}
              className="rounded-full bg-stone-100 px-2.5 py-1 text-xs text-stone-500"
            >
              {kw}
            </span>
          ))}
        </div>
      </details>
    </Card>
  );
}
