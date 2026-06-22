"use client";

// 個人情報コピー補助パネル。
// 保存済みプロフィールの各項目をワンタップでクリップボードへコピーする。
// 値は端末内 localStorage から読み込んだもののみで、外部送信はしない。

import { useClipboard } from "@/lib/useClipboard";
import { Profile } from "@/lib/types";
import { Card } from "./ui";

interface CopyItem {
  key: string;
  label: string; // ボタンに出す表示名（例: 姓コピー）
  value: string; // 実際にコピーされる値
}

export function CopyPanel({ profile }: { profile: Profile }) {
  const { copy, copiedKey } = useClipboard();

  const items: CopyItem[] = [
    { key: "lastName", label: "姓", value: profile.lastName },
    { key: "firstName", label: "名", value: profile.firstName },
    { key: "lastNameKana", label: "セイ", value: profile.lastNameKana },
    { key: "firstNameKana", label: "メイ", value: profile.firstNameKana },
    { key: "birthday", label: "生年月日", value: profile.birthday },
    { key: "phone", label: "電話番号", value: profile.phone },
    { key: "email", label: "メール", value: profile.email },
    // メール再入力欄向け: 同じメール値をもう一度コピーできるように別ボタンを用意
    { key: "emailRe", label: "メール再入力", value: profile.email },
  ];

  const anyEmpty = items.some((i) => !i.value.trim());

  return (
    <Card>
      <h2 className="mb-1 text-lg font-bold text-stone-800">
        コピー項目
      </h2>
      <p className="mb-3 text-sm text-stone-500">
        ボタンをタップすると、その項目がコピーされます。応募フォームの欄に貼り付けてください。
      </p>

      {anyEmpty && (
        <p className="mb-3 rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-800">
          未入力の項目があります。「プロフィール」タブで入力すると、ここからコピーできるようになります。
        </p>
      )}

      <div className="grid grid-cols-2 gap-2">
        {items.map((item) => {
          const isCopied = copiedKey === item.key;
          const empty = !item.value.trim();
          return (
            <button
              key={item.key}
              type="button"
              disabled={empty}
              onClick={() => copy(item.value, item.key)}
              className={`flex flex-col items-start rounded-xl border px-3 py-2.5 text-left transition active:scale-[0.98] disabled:opacity-40 ${
                isCopied
                  ? "border-rolex-green bg-rolex-green/10"
                  : "border-stone-300 bg-white"
              }`}
            >
              <span className="text-xs font-medium text-stone-500">
                {item.label}コピー
              </span>
              <span className="mt-0.5 w-full truncate text-sm font-semibold text-stone-800">
                {isCopied ? "✓ コピーしました" : item.value || "未入力"}
              </span>
            </button>
          );
        })}
      </div>
    </Card>
  );
}
