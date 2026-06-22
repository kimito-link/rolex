"use client";

// 応募1件の編集フォーム（下からせり上がるシート風）。
// 店舗・URL・希望日時・モデル枠・応募日・ステータス・メモを編集する。

import { useState } from "react";
import {
  Application,
  APPLICATION_STATUSES,
  ApplicationStatus,
  DEFAULT_MODEL_SLOT,
} from "@/lib/types";
import { Field, PrimaryButton, OutlineButton } from "./ui";

export function ApplicationEditor({
  app,
  onSave,
  onCancel,
  onDelete,
}: {
  app: Application;
  onSave: (patch: Partial<Application>) => void;
  onCancel: () => void;
  onDelete?: () => void;
}) {
  const [draft, setDraft] = useState<Application>(app);

  function set<K extends keyof Application>(key: K, value: Application[K]) {
    setDraft((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40">
      <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-t-3xl bg-stone-50 p-5 safe-bottom">
        <div className="mx-auto mb-4 h-1.5 w-10 rounded-full bg-stone-300" />
        <h2 className="mb-4 text-lg font-bold text-stone-800">応募の編集</h2>

        <div className="space-y-3">
          <Field
            label="店舗名"
            value={draft.store}
            onChange={(v) => set("store", v)}
          />
          <Field
            label="応募URL"
            value={draft.url}
            onChange={(v) => set("url", v)}
            placeholder="https://..."
            inputMode="text"
          />
          <div className="grid grid-cols-2 gap-3">
            <Field
              label="希望来店日"
              value={draft.visitDate}
              onChange={(v) => set("visitDate", v)}
              placeholder="2026-07-01"
            />
            <Field
              label="希望来店時間"
              value={draft.visitTime}
              onChange={(v) => set("visitTime", v)}
              placeholder="14:00"
            />
          </div>
          <div>
            <Field
              label="選択モデル枠"
              value={draft.modelSlot}
              onChange={(v) => set("modelSlot", v)}
              placeholder={DEFAULT_MODEL_SLOT}
            />
            <button
              type="button"
              onClick={() => set("modelSlot", DEFAULT_MODEL_SLOT)}
              className="mt-1 text-xs font-medium text-rolex-green underline"
            >
              「{DEFAULT_MODEL_SLOT}」を入れる
            </button>
          </div>
          <Field
            label="応募日"
            value={draft.appliedDate}
            onChange={(v) => set("appliedDate", v)}
            placeholder="2026-06-22"
          />

          <label className="block">
            <span className="mb-1 block text-sm font-medium text-stone-600">
              ステータス
            </span>
            <select
              value={draft.status}
              onChange={(e) =>
                set("status", e.target.value as ApplicationStatus)
              }
              className="w-full rounded-xl border border-stone-300 bg-white px-3 py-2.5 text-base text-stone-900 outline-none focus:border-rolex-green"
            >
              {APPLICATION_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-1 block text-sm font-medium text-stone-600">
              メモ
            </span>
            <textarea
              value={draft.memo}
              onChange={(e) => set("memo", e.target.value)}
              rows={3}
              placeholder="気づいたこと・次回の注意など"
              className="w-full rounded-xl border border-stone-300 bg-white px-3 py-2.5 text-base text-stone-900 outline-none focus:border-rolex-green"
            />
          </label>
        </div>

        <div className="mt-5 space-y-2">
          <PrimaryButton onClick={() => onSave(draft)}>保存する</PrimaryButton>
          <OutlineButton onClick={onCancel}>キャンセル</OutlineButton>
          {onDelete && (
            <button
              type="button"
              onClick={onDelete}
              className="w-full py-2 text-center text-sm font-medium text-rose-600"
            >
              この応募を削除
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
