"use client";

// アプリのメイン画面。
// 下部タブで「ホーム / コピー / 履歴 / 設定」を切り替える単一ページ構成。
// すべての状態は useAppState（localStorageベース）で管理する。

import { useMemo, useState } from "react";
import { useAppState } from "@/lib/useAppState";
import { findActiveDuplicate } from "@/lib/duplicate";
import { Application } from "@/lib/types";

import { StoreCard } from "@/components/StoreCard";
import { StepsPanel } from "@/components/StepsPanel";
import { CopyPanel } from "@/components/CopyPanel";
import { ProfilePanel } from "@/components/ProfilePanel";
import { HistoryPanel } from "@/components/HistoryPanel";
import { GmailHelpPanel } from "@/components/GmailHelpPanel";
import { ApplicationEditor } from "@/components/ApplicationEditor";
import { SettingsPanel } from "@/components/SettingsPanel";

type Tab = "home" | "copy" | "history" | "settings";

export default function Page() {
  const state = useAppState();
  const [tab, setTab] = useState<Tab>("home");
  const [showSteps, setShowSteps] = useState(false);
  const [editing, setEditing] = useState<Application | null>(null);

  // 最新の応募（作成日時が一番新しいもの）
  const latest = state.applications[0] ?? null;

  // 最新応募の店舗に対して、別のアクティブな応募があるか
  const hasActiveDuplicate = useMemo(() => {
    if (!latest) return false;
    return !!findActiveDuplicate(
      state.applications,
      latest.store,
      latest.id
    );
  }, [state.applications, latest]);

  function openReservation() {
    if (latest?.url?.trim()) {
      window.open(latest.url, "_blank", "noopener,noreferrer");
    }
  }

  function handleAddNew() {
    const app = state.addApplication();
    setEditing(app);
    setTab("history");
  }

  function handleMarkApplied() {
    if (!latest) return;
    const today = new Date().toISOString().slice(0, 10);
    state.updateApplication(latest.id, {
      status: "応募済み",
      appliedDate: latest.appliedDate || today,
    });
  }

  // SSRハイドレーション前は何も描画しない（localStorage依存のため）
  if (!state.loaded) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-stone-400">読み込み中…</p>
      </main>
    );
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col">
      {/* ヘッダー */}
      <header className="sticky top-0 z-10 bg-rolex-green px-4 py-3 text-white shadow-sm">
        <h1 className="text-base font-bold">ロレックス応募補助アプリ</h1>
        <p className="text-[11px] opacity-90">
          表参道 事前来店予約 入力・履歴補助
        </p>
      </header>

      {/* 本文 */}
      <main className="flex-1 space-y-4 px-4 py-4 pb-24">
        {tab === "home" && (
          <>
            <StoreCard
              latest={latest}
              hasActiveDuplicate={hasActiveDuplicate}
              onOpenReservation={openReservation}
              onShowSteps={() => setShowSteps(true)}
              onShowCopy={() => setTab("copy")}
              onMarkApplied={handleMarkApplied}
              onEditLatest={() => latest && setEditing(latest)}
              onAddNew={handleAddNew}
            />
            <GmailHelpPanel />
            {showSteps && (
              <div
                className="fixed inset-0 z-50 flex items-end bg-black/40"
                onClick={() => setShowSteps(false)}
              >
                <div
                  className="max-h-[90vh] w-full overflow-y-auto rounded-t-3xl bg-stone-50 p-5 safe-bottom"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="mx-auto mb-4 h-1.5 w-10 rounded-full bg-stone-300" />
                  <StepsPanel />
                  <button
                    type="button"
                    onClick={() => setShowSteps(false)}
                    className="mt-3 w-full rounded-xl border border-stone-300 bg-white py-3 text-base font-medium"
                  >
                    閉じる
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {tab === "copy" && (
          <>
            <CopyPanel profile={state.profile} />
            <ProfilePanel
              profile={state.profile}
              onSave={state.updateProfile}
            />
          </>
        )}

        {tab === "history" && (
          <HistoryPanel
            applications={state.applications}
            onAdd={handleAddNew}
            onEdit={(app) => setEditing(app)}
          />
        )}

        {tab === "settings" && (
          <SettingsPanel
            count={state.applications.length}
            onClearAll={state.clearAll}
          />
        )}
      </main>

      {/* 応募編集シート */}
      {editing && (
        <ApplicationEditor
          app={editing}
          onSave={(patch) => {
            state.updateApplication(editing.id, patch);
            setEditing(null);
          }}
          onCancel={() => setEditing(null)}
          onDelete={() => {
            state.deleteApplication(editing.id);
            setEditing(null);
          }}
        />
      )}

      {/* 下部タブバー */}
      <nav className="fixed inset-x-0 bottom-0 z-20 mx-auto flex max-w-md justify-around border-t border-stone-200 bg-white/95 backdrop-blur safe-bottom">
        <TabButton label="ホーム" icon="🏠" active={tab === "home"} onClick={() => setTab("home")} />
        <TabButton label="コピー" icon="📋" active={tab === "copy"} onClick={() => setTab("copy")} />
        <TabButton label="履歴" icon="🗂️" active={tab === "history"} onClick={() => setTab("history")} />
        <TabButton label="設定" icon="⚙️" active={tab === "settings"} onClick={() => setTab("settings")} />
      </nav>
    </div>
  );
}

function TabButton({
  label,
  icon,
  active,
  onClick,
}: {
  label: string;
  icon: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-1 flex-col items-center gap-0.5 py-2 text-[11px] font-medium transition ${
        active ? "text-rolex-green" : "text-stone-400"
      }`}
    >
      <span className="text-lg leading-none">{icon}</span>
      {label}
    </button>
  );
}
