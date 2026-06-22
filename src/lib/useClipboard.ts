"use client";

// ワンタップコピー用のフック。
// navigator.clipboard が使えない環境（古いiOS Safari等）向けに
// execCommand フォールバックも用意する。

import { useCallback, useRef, useState } from "react";

export function useClipboard(resetMs = 1500) {
  // 直近でコピーしたキー（どのボタンを押したか）を保持し、UIで「コピー済み」表示に使う
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const copy = useCallback(
    async (text: string, key?: string): Promise<boolean> => {
      const ok = await writeClipboard(text);
      if (ok) {
        setCopiedKey(key ?? text);
        if (timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(() => setCopiedKey(null), resetMs);
      }
      return ok;
    },
    [resetMs]
  );

  return { copy, copiedKey };
}

async function writeClipboard(text: string): Promise<boolean> {
  try {
    if (
      typeof navigator !== "undefined" &&
      navigator.clipboard &&
      window.isSecureContext
    ) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // 下のフォールバックへ
  }

  // フォールバック: 一時 textarea + execCommand
  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "absolute";
    ta.style.left = "-9999px";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}
