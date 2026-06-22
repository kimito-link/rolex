"use client";

// iPhone/ブラウザの「自動入力」を使った一括入力の案内パネル。
//
// パスワードマネージャー（Bitwarden等）やiOSの連絡先自動入力は、
// フォーム側の autocomplete 属性を読んで姓名・電話・メールを一括で埋める。
// これが最も速く・安全な「ボタン1つで一括入力」の正攻法。
// このアプリから外部フォームへ自動入力はできない（禁止事項）ので、
// 端末の自動入力をすぐ使えるよう案内する。

import { useState } from "react";
import { Card } from "./ui";

export function AutofillTip() {
  const [open, setOpen] = useState(false);

  return (
    <Card className="border-rolex-gold/40 bg-amber-50/40">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between text-left"
      >
        <span className="flex items-center gap-2">
          <span className="text-lg">⚡</span>
          <span className="text-base font-bold text-stone-800">
            ボタン1つで一括入力するには
          </span>
        </span>
        <span className="text-sm text-stone-400">{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <div className="mt-3 space-y-3 text-sm leading-relaxed text-stone-700">
          <p>
            iPhoneの<strong className="font-bold">自動入力</strong>に情報を登録しておくと、
            応募フォームで入力欄をタップしたときキーボード上に出る候補を押すだけで、
            姓名や連絡先がまとめて入ります。
          </p>

          <div className="rounded-xl bg-white p-3 ring-1 ring-stone-200">
            <p className="mb-1 font-semibold text-stone-800">
              📇 名前・住所（連絡先の自動入力）
            </p>
            <p className="text-xs text-stone-500">
              「設定」→「Safari」→「自動入力」→「連絡先情報を使用」をオン。
              自分の連絡先カードに姓名・電話・メールを入れておくと、フォームで一括候補が出ます。
            </p>
          </div>

          <div className="rounded-xl bg-white p-3 ring-1 ring-stone-200">
            <p className="mb-1 font-semibold text-stone-800">
              🔐 パスワードマネージャー（Bitwarden等）
            </p>
            <p className="text-xs text-stone-500">
              「設定」→「パスワード」→「パスワードオプション」で使いたいアプリ（Bitwarden等）をオンに。
              氏名・メール・電話を保存しておけば、フォームでまとめて入力できます。
            </p>
          </div>

          <p className="rounded-lg bg-amber-100/70 px-3 py-2 text-xs text-amber-900">
            ※ どうしても一括が効かない欄（セイ・メイのカナや生年月日など）は、
            下の「コピー項目」で上から順にコピー → 貼り付けが速いです。
            reCAPTCHA・SMS認証・送信は必ずご自身の手で。
          </p>
        </div>
      )}
    </Card>
  );
}
