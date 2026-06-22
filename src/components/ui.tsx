"use client";

// 画面全体で使う小さなUI部品をまとめたファイル。

import { ApplicationStatus, STATUS_STYLE } from "@/lib/types";

/** ステータスバッジ */
export function StatusBadge({ status }: { status: ApplicationStatus }) {
  return (
    <span
      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_STYLE[status]}`}
    >
      {status}
    </span>
  );
}

/** 緑のメインボタン */
export function PrimaryButton({
  children,
  onClick,
  type = "button",
  disabled,
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`w-full rounded-xl bg-rolex-green px-4 py-3 text-center text-base font-semibold text-white shadow-sm transition active:bg-rolex-greenDark disabled:opacity-50 ${className}`}
    >
      {children}
    </button>
  );
}

/** 枠線だけのサブボタン */
export function OutlineButton({
  children,
  onClick,
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-center text-base font-medium text-stone-800 shadow-sm transition active:bg-stone-100 ${className}`}
    >
      {children}
    </button>
  );
}

/** カードコンテナ */
export function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-stone-200 bg-white p-4 shadow-sm ${className}`}
    >
      {children}
    </div>
  );
}

/** ラベル付きテキスト入力 */
export function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  inputMode,
  autoComplete = "off",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  inputMode?: "text" | "tel" | "email" | "numeric";
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-stone-600">
        {label}
      </span>
      <input
        type={type}
        inputMode={inputMode}
        autoComplete={autoComplete}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-stone-300 bg-white px-3 py-2.5 text-base text-stone-900 outline-none focus:border-rolex-green focus:ring-2 focus:ring-rolex-green/20"
      />
    </label>
  );
}
