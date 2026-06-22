"use client";

// トップの表参道カード。
// 最新の応募URL・状態を表示し、予約ページを開く／応募済みにする等の操作を提供する。
// 重複応募の可能性がある場合は注意文を表示する。

import { Application } from "@/lib/types";
import {
  DEFAULT_MODEL_SLOT,
  DEFAULT_STORE,
  DUPLICATE_WARNING,
} from "@/lib/constants";
import { Card, OutlineButton, PrimaryButton, StatusBadge } from "./ui";

export function StoreCard({
  latest,
  hasActiveDuplicate,
  onOpenReservation,
  onShowSteps,
  onShowCopy,
  onMarkApplied,
  onEditLatest,
  onAddNew,
}: {
  latest: Application | null;
  hasActiveDuplicate: boolean;
  onOpenReservation: () => void;
  onShowSteps: () => void;
  onShowCopy: () => void;
  onMarkApplied: () => void;
  onEditLatest: () => void;
  onAddNew: () => void;
}) {
  const status = latest?.status ?? "未応募";
  const hasUrl = !!latest?.url?.trim();

  return (
    <Card className="border-rolex-green/30">
      <div className="mb-3 flex items-start justify-between gap-2">
        <div>
          <p className="text-xs font-medium text-rolex-green">店舗</p>
          <h2 className="text-lg font-bold leading-tight text-stone-900">
            {DEFAULT_STORE}
          </h2>
        </div>
        <StatusBadge status={status} />
      </div>

      <dl className="mb-3 space-y-1 text-sm">
        <div className="flex gap-2">
          <dt className="w-20 flex-none text-stone-500">予約種別</dt>
          <dd className="font-medium text-stone-800">事前来店予約</dd>
        </div>
        <div className="flex gap-2">
          <dt className="w-20 flex-none text-stone-500">狙う枠</dt>
          <dd className="font-medium text-stone-800">{DEFAULT_MODEL_SLOT}</dd>
        </div>
        <div className="flex gap-2">
          <dt className="w-20 flex-none text-stone-500">最新URL</dt>
          <dd className="min-w-0 flex-1 truncate text-stone-700">
            {hasUrl ? latest!.url : "未登録"}
          </dd>
        </div>
      </dl>

      {hasActiveDuplicate && (
        <p className="mb-3 rounded-lg bg-amber-50 px-3 py-2 text-xs leading-relaxed text-amber-800 ring-1 ring-amber-200">
          ⚠️ {DUPLICATE_WARNING}
        </p>
      )}

      <div className="space-y-2">
        <PrimaryButton onClick={onOpenReservation} disabled={!hasUrl}>
          {hasUrl ? "応募ページを開く" : "URLを登録してください"}
        </PrimaryButton>
        <div className="grid grid-cols-2 gap-2">
          <OutlineButton onClick={onShowSteps}>手順を見る</OutlineButton>
          <OutlineButton onClick={onShowCopy}>コピー項目</OutlineButton>
        </div>
        {latest ? (
          <div className="grid grid-cols-2 gap-2">
            <OutlineButton onClick={onEditLatest}>応募を編集</OutlineButton>
            <PrimaryButton
              onClick={onMarkApplied}
              className="bg-emerald-600 active:bg-emerald-700"
            >
              応募済みにする
            </PrimaryButton>
          </div>
        ) : (
          <OutlineButton onClick={onAddNew}>
            応募URLを登録して始める
          </OutlineButton>
        )}
      </div>
    </Card>
  );
}
