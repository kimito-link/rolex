"use client";

// ゆっくりキャラを吹き出し付きで表示するコンポーネント。
// 画面のあちこちで「この子が案内してくれる」感を出して分かりやすくする。

import Image from "next/image";
import {
  CharacterId,
  CHARACTERS,
  Expression,
  characterImage,
} from "@/lib/characters";

/** キャラの顔だけを丸く表示する（アイコン用） */
export function CharacterFace({
  id,
  expr = "normal",
  size = 56,
  className = "",
  priority = false,
}: {
  id: CharacterId;
  expr?: Expression;
  size?: number;
  className?: string;
  priority?: boolean;
}) {
  const def = CHARACTERS[id];
  return (
    <Image
      src={characterImage(id, expr)}
      alt={`${def.name}（${def.role}）`}
      width={size}
      height={size}
      className={`select-none ${className}`}
      priority={priority}
    />
  );
}

/**
 * キャラ＋吹き出しのセリフ表示。
 * side="left" でキャラが左、吹き出しが右に出る。
 */
export function Mascot({
  id,
  expr = "normal",
  children,
  size = 64,
  tone = "default",
  priority = true,
}: {
  id: CharacterId;
  expr?: Expression;
  children: React.ReactNode;
  size?: number;
  tone?: "default" | "warn" | "happy";
  priority?: boolean;
}) {
  const bubbleTone =
    tone === "warn"
      ? "bg-amber-50 ring-1 ring-amber-200 text-amber-900"
      : tone === "happy"
        ? "bg-emerald-50 ring-1 ring-emerald-200 text-emerald-900"
        : "bg-white ring-1 ring-stone-200 text-stone-700";

  return (
    <div className="flex items-start gap-2">
      <CharacterFace
        id={id}
        expr={expr}
        size={size}
        priority={priority}
        className="flex-none"
      />
      <div
        className={`relative mt-1 flex-1 rounded-2xl px-3 py-2 text-sm leading-relaxed shadow-sm ${bubbleTone}`}
      >
        {/* 吹き出しのしっぽ（左向き） */}
        <span
          className={`absolute -left-1.5 top-3 h-3 w-3 rotate-45 ${
            tone === "warn"
              ? "bg-amber-50"
              : tone === "happy"
                ? "bg-emerald-50"
                : "bg-white"
          }`}
          aria-hidden
        />
        {children}
      </div>
    </div>
  );
}
