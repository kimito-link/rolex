"use client";

// プロフィール（本人の個人情報）の入力・編集パネル。
// 入力した内容はその場で localStorage に保存され、コピー画面で使われる。

import { useState } from "react";
import { Profile } from "@/lib/types";
import { Card, Field, PrimaryButton } from "./ui";

export function ProfilePanel({
  profile,
  onSave,
}: {
  profile: Profile;
  onSave: (p: Profile) => void;
}) {
  const [draft, setDraft] = useState<Profile>(profile);
  const [savedFlash, setSavedFlash] = useState(false);

  function set<K extends keyof Profile>(key: K, value: Profile[K]) {
    setDraft((prev) => ({ ...prev, [key]: value }));
  }

  function handleSave() {
    onSave(draft);
    setSavedFlash(true);
    setTimeout(() => setSavedFlash(false), 1500);
  }

  return (
    <Card>
      <h2 className="mb-1 text-lg font-bold text-stone-800">プロフィール</h2>
      <p className="mb-4 text-sm text-stone-500">
        応募フォームに入力する本人情報を保存します。端末内にのみ保存され、外部には送信されません。
      </p>

      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <Field
            label="姓"
            value={draft.lastName}
            onChange={(v) => set("lastName", v)}
            placeholder="山田"
            autoComplete="family-name"
          />
          <Field
            label="名"
            value={draft.firstName}
            onChange={(v) => set("firstName", v)}
            placeholder="太郎"
            autoComplete="given-name"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field
            label="セイ"
            value={draft.lastNameKana}
            onChange={(v) => set("lastNameKana", v)}
            placeholder="ヤマダ"
          />
          <Field
            label="メイ"
            value={draft.firstNameKana}
            onChange={(v) => set("firstNameKana", v)}
            placeholder="タロウ"
          />
        </div>
        <Field
          label="生年月日"
          value={draft.birthday}
          onChange={(v) => set("birthday", v)}
          placeholder="1990-01-01"
          inputMode="numeric"
          autoComplete="bday"
        />
        <Field
          label="携帯電話番号"
          value={draft.phone}
          onChange={(v) => set("phone", v)}
          placeholder="09012345678"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
        />
        <Field
          label="メールアドレス"
          value={draft.email}
          onChange={(v) => set("email", v)}
          placeholder="example@example.com"
          type="email"
          inputMode="email"
          autoComplete="email"
        />
      </div>

      <div className="mt-4">
        <PrimaryButton onClick={handleSave}>
          {savedFlash ? "✓ 保存しました" : "保存する"}
        </PrimaryButton>
      </div>
    </Card>
  );
}
