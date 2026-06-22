// ゆっくりキャラ（kimito-link マスコット）の定義。
// 画像は public/characters/<id>/<expression>.png に配置している。

export type CharacterId = "link" | "konta" | "tanunee";
export type Expression = "normal" | "smile" | "think" | "warn" | "blink";

interface CharacterDef {
  id: CharacterId;
  name: string; // 表示名
  role: string; // 役割の説明（aria-label等に使う）
  // 表情ごとの画像パス。存在しない表情は normal にフォールバックする。
  images: Partial<Record<Expression, string>>;
}

export const CHARACTERS: Record<CharacterId, CharacterDef> = {
  link: {
    id: "link",
    name: "リンク",
    role: "案内役",
    images: {
      normal: "/characters/link/normal.png",
      smile: "/characters/link/smile.png",
      think: "/characters/link/think.png",
      blink: "/characters/link/blink.png",
    },
  },
  konta: {
    id: "konta",
    name: "コンタ",
    role: "注意・確認役",
    images: {
      normal: "/characters/konta/normal.png",
      smile: "/characters/konta/smile.png",
      warn: "/characters/konta/warn.png",
    },
  },
  tanunee: {
    id: "tanunee",
    name: "タヌ姉",
    role: "お祝い・履歴役",
    images: {
      normal: "/characters/tanunee/normal.png",
      smile: "/characters/tanunee/smile.png",
    },
  },
};

/** 指定キャラ・表情の画像パスを返す（無ければ normal にフォールバック） */
export function characterImage(id: CharacterId, expr: Expression): string {
  const def = CHARACTERS[id];
  return def.images[expr] ?? def.images.normal ?? "";
}
