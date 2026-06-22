"use client";

// 個人情報コピー補助パネル（順番ガイド方式）。
//
// パスワードマネージャーのように「ポンポン押すだけ」で進められるよう、
// 上から順に1タップでコピーし、押すと自動で次の項目へ進む。
// いま何をコピーすべきかをハイライトで示す。
//
// ※ 外部サイトのフォームへ自動入力はしない（禁止事項）。
//    あくまで本人がコピー→貼り付けする操作を最短化する補助。
// 値は端末内 localStorage から読み込んだもののみで、外部送信はしない。

import { useState } from "react";
import { useClipboard } from "@/lib/useClipboard";
import { Profile } from "@/lib/types";
import { Card } from "./ui";

interface CopyItem {
  key: string;
  label: string; // 表示名（例: 姓）
  hint: string; // フォームのどの欄かのヒント
  value: string; // 実際にコピーされる値
}

export function CopyPanel({ profile }: { profile: Profile }) {
  const { copy, copiedKey } = useClipboard();
  // 次にコピーすべき項目のインデックス（順番ガイド用）
  const [cursor, setCursor] = useState(0);
  // コピー済みにした項目キーの集合
  const [done, setDone] = useState<Set<string>>(new Set());

  const items: CopyItem[] = [
    { key: "lastName", label: "姓", hint: "姓（漢字）", value: profile.lastName },
    { key: "firstName", label: "名", hint: "名（漢字）", value: profile.firstName },
    { key: "lastNameKana", label: "セイ", hint: "セイ（カナ）", value: profile.lastNameKana },
    { key: "firstNameKana", label: "メイ", hint: "メイ（カナ）", value: profile.firstNameKana },
    { key: "birthday", label: "生年月日", hint: "生年月日", value: profile.birthday },
    { key: "phone", label: "電話番号", hint: "携帯電話番号", value: profile.phone },
    { key: "email", label: "メール", hint: "メールアドレス", value: profile.email },
    { key: "emailRe", label: "メール再入力", hint: "メールアドレス（確認）", value: profile.email },
  ];

  const filledCount = items.filter((i) => i.value.trim()).length;
  const anyEmpty = filledCount < items.length;
  const doneCount = done.size;

  async function handleCopy(item: CopyItem, index: number) {
    const ok = await copy(item.value, item.key);
    if (ok) {
      setDone((prev) => new Set(prev).add(item.key));
      // 次の未コピー項目へカーソルを進める
      let next = index + 1;
      while (next < items.length && done.has(items[next].key)) next++;
      setCursor(next);
    }
  }

  function reset() {
    setDone(new Set());
    setCursor(0);
  }

  return (
    <Card>
      <div className="mb-1 flex items-center justify-between">
        <h2 className="text-lg font-bold text-stone-800">コピー項目</h2>
        {doneCount > 0 && (
          <button
            type="button"
            onClick={reset}
            className="text-xs font-medium text-rolex-green underline"
          >
            最初から
          </button>
        )}
      </div>
      <p className="mb-3 text-sm text-stone-500">
        上から順にタップ → 応募フォームの欄に貼り付け、を繰り返すだけ。押すと次の項目へ自動で進みます。
      </p>

      {anyEmpty && (
        <p className="mb-3 rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-800">
          未入力の項目があります。下の「プロフィール」で入力すると、ここからコピーできます。
        </p>
      )}

      {/* 進捗バー */}
      {filledCount > 0 && (
        <div className="mb-3">
          <div className="mb-1 flex justify-between text-xs text-stone-500">
            <span>進捗</span>
            <span>
              {doneCount} / {filledCount}
            </span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-stone-200">
            <div
              className="h-full rounded-full bg-rolex-green transition-all"
              style={{
                width: `${filledCount ? (doneCount / filledCount) * 100 : 0}%`,
              }}
            />
          </div>
        </div>
      )}

      <ol className="space-y-2">
        {items.map((item, index) => {
          const empty = !item.value.trim();
          const isCopied = copiedKey === item.key;
          const isDone = done.has(item.key);
          const isNext = index === cursor && !empty && !isDone;
          return (
            <li key={item.key}>
              <button
                type="button"
                disabled={empty}
                onClick={() => handleCopy(item, index)}
                className={`flex w-full items-center gap-3 rounded-xl border px-3 py-3 text-left transition active:scale-[0.99] disabled:opacity-40 ${
                  isNext
                    ? "border-rolex-green bg-rolex-green/10 ring-2 ring-rolex-green/30"
                    : isDone
                      ? "border-emerald-200 bg-emerald-50"
                      : "border-stone-300 bg-white"
                }`}
              >
                {/* 状態アイコン */}
                <span
                  className={`flex h-7 w-7 flex-none items-center justify-center rounded-full text-sm font-bold ${
                    isDone
                      ? "bg-emerald-500 text-white"
                      : isNext
                        ? "bg-rolex-green text-white"
                        : "bg-stone-200 text-stone-500"
                  }`}
                >
                  {isDone ? "✓" : index + 1}
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block text-xs font-medium text-stone-500">
                    {item.hint}
                    {isNext && (
                      <span className="ml-1 font-bold text-rolex-green">
                        ← 次はこれ
                      </span>
                    )}
                  </span>
                  <span className="block truncate text-sm font-semibold text-stone-800">
                    {empty ? "未入力" : item.value}
                  </span>
                </span>

                <span
                  className={`flex-none text-xs font-bold ${
                    isCopied ? "text-emerald-600" : "text-rolex-green"
                  }`}
                >
                  {isCopied ? "✓ コピー" : "コピー"}
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      {doneCount === filledCount && filledCount > 0 && (
        <p className="mt-3 rounded-lg bg-emerald-50 px-3 py-2 text-center text-sm font-medium text-emerald-800">
          全項目コピーできました！内容確認に進んでね。
        </p>
      )}
    </Card>
  );
}
