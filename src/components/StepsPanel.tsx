"use client";

// 表参道 応募手順の表示パネル。

import { OMOTESANDO_STEPS, SAFETY_NOTICE } from "@/lib/constants";
import { Card } from "./ui";

export function StepsPanel() {
  return (
    <Card>
      <h2 className="mb-1 text-lg font-bold text-stone-800">
        表参道 応募手順
      </h2>
      <p className="mb-3 text-sm text-stone-500">
        この順番で進めると迷いません。送信・認証はご本人が手動で行います。
      </p>

      <ol className="space-y-2">
        {OMOTESANDO_STEPS.map((step, i) => (
          <li key={i} className="flex gap-3">
            <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-rolex-green text-xs font-bold text-white">
              {i + 1}
            </span>
            <span className="pt-0.5 text-sm leading-relaxed text-stone-700">
              {step}
            </span>
          </li>
        ))}
      </ol>

      <p className="mt-4 rounded-lg bg-stone-100 px-3 py-2 text-xs leading-relaxed text-stone-600">
        {SAFETY_NOTICE}
      </p>
    </Card>
  );
}
