"use client";

// 応募履歴パネル。応募の一覧表示・編集・追加を行う。

import { Application } from "@/lib/types";
import { Card, OutlineButton, PrimaryButton, StatusBadge } from "./ui";

export function HistoryPanel({
  applications,
  onAdd,
  onEdit,
}: {
  applications: Application[];
  onAdd: () => void;
  onEdit: (app: Application) => void;
}) {
  return (
    <Card>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-bold text-stone-800">応募履歴</h2>
        <span className="text-sm text-stone-500">{applications.length}件</span>
      </div>

      {applications.length === 0 ? (
        <p className="rounded-lg bg-stone-100 px-3 py-6 text-center text-sm text-stone-500">
          まだ応募の記録はありません。
          <br />
          下のボタンから追加できます。
        </p>
      ) : (
        <ul className="space-y-2">
          {applications.map((app) => (
            <li key={app.id}>
              <button
                type="button"
                onClick={() => onEdit(app)}
                className="w-full rounded-xl border border-stone-200 bg-white p-3 text-left transition active:bg-stone-50"
              >
                <div className="mb-1 flex items-center justify-between gap-2">
                  <span className="truncate text-sm font-semibold text-stone-800">
                    {app.store}
                  </span>
                  <StatusBadge status={app.status} />
                </div>
                <dl className="grid grid-cols-2 gap-x-2 gap-y-0.5 text-xs text-stone-500">
                  <div>
                    <dt className="inline">希望日: </dt>
                    <dd className="inline text-stone-700">
                      {app.visitDate || "—"}
                    </dd>
                  </div>
                  <div>
                    <dt className="inline">時間: </dt>
                    <dd className="inline text-stone-700">
                      {app.visitTime || "—"}
                    </dd>
                  </div>
                  <div className="col-span-2">
                    <dt className="inline">枠: </dt>
                    <dd className="inline text-stone-700">
                      {app.modelSlot || "—"}
                    </dd>
                  </div>
                  <div>
                    <dt className="inline">応募日: </dt>
                    <dd className="inline text-stone-700">
                      {app.appliedDate || "—"}
                    </dd>
                  </div>
                </dl>
                {app.memo && (
                  <p className="mt-1.5 line-clamp-2 text-xs text-stone-500">
                    {app.memo}
                  </p>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-4">
        {applications.length === 0 ? (
          <PrimaryButton onClick={onAdd}>応募を追加する</PrimaryButton>
        ) : (
          <OutlineButton onClick={onAdd}>応募を追加する</OutlineButton>
        )}
      </div>
    </Card>
  );
}
