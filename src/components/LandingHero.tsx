"use client";

// ホーム最上部に置く紹介セクション（LP）。
// 「ロレックスってかっこいい → でも店に行っても在庫ないって言われる →
//  実は抽選があるの知ってる？ → このアプリで応募を楽に → 手順はこう」
// という流れを、ゆっくりキャラの掛け合いで楽しく見せる。
//
// あくまで本人が正規に1回応募するのを助けるツールである点をブレさせない。

import Image from "next/image";
import { Mascot, CharacterFace } from "./Mascot";

/** LPの中で使う、初見向けのざっくり手順（5ステップ） */
const QUICK_STEPS: { emoji: string; title: string; body: string }[] = [
  {
    emoji: "📩",
    title: "予約メールを開く",
    body: "Gmailに届いた表参道からのメールのURLを開く",
  },
  {
    emoji: "🗓️",
    title: "事前来店予約を選ぶ",
    body: "予約タイプは「事前来店予約」。希望日と時間を選ぶ",
  },
  {
    emoji: "⌚",
    title: "デイトナ／GMTの枠を選ぶ",
    body: "「コスモグラフ デイトナ・GMTマスターII」と書かれた枠を選ぶ",
  },
  {
    emoji: "✍️",
    title: "自分の情報を入力",
    body: "このアプリのコピー機能で、姓名・連絡先をサッと貼り付け",
  },
  {
    emoji: "✅",
    title: "自分の手で送信",
    body: "reCAPTCHA・SMS認証・送信はあなた自身で。応募は期間内1回だけ",
  },
];

export function LandingHero({
  onStart,
  onRegisterProfile,
}: {
  onStart: () => void;
  onRegisterProfile: () => void;
}) {
  return (
    <section className="space-y-4">
      {/* つかみ：かっこいいよね？ */}
      <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-rolex-green to-rolex-greenDark p-5 text-white shadow-md">
        {/* ブランドロゴ（kimito-link） */}
        <div className="mb-4 flex items-center gap-2">
          <Image
            src="/brand/logo-white.png"
            alt="kimito-link"
            width={88}
            height={88}
            priority
            className="h-11 w-auto select-none"
          />
          <span className="text-sm font-semibold tracking-wide text-white/90">
            kimito-link
          </span>
        </div>

        <div className="flex items-center gap-3">
          <CharacterFace id="link" expr="smile" size={72} priority />
          <div>
            <p className="text-xs font-semibold text-rolex-goldLight">
              ロレックス ブティック表参道
            </p>
            <h2 className="text-xl font-bold leading-snug">
              ロレックスって、
              <br />
              かっこいいよね？
            </h2>
          </div>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-white/90">
          デイトナにGMTマスターII…… 一度は手に取ってみたい憧れの時計。
          でも——
        </p>
      </div>

      {/* ふり：でもお店に行っても在庫ないって言われちゃう */}
      <Mascot id="konta" expr="warn" tone="warn">
        でもさ、お店に行っても「人気モデルは在庫がなくて…」って言われちゃうんだよね。ガッカリ……。
      </Mascot>

      {/* 種明かし：実は抽選/事前予約ってしってる？ */}
      <Mascot id="tanunee" expr="smile" tone="happy">
        実はね、表参道には<strong className="font-bold">「事前来店予約」</strong>っていう仕組みがあるの。
        メールで届いた予約URLから、来店の枠をリクエストできるんだよ。知ってた？
      </Mascot>

      {/* 案内役の締め：このアプリで楽にしよう */}
      <Mascot id="link" expr="normal">
        このアプリは、その<strong className="font-bold">応募をスマホで楽にする</strong>お手伝い役。
        毎回の入力や「どの枠を選ぶんだっけ？」をスッキリさせるよ。送信は自分の手でね！
      </Mascot>

      {/* ざっくり手順 */}
      <div className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm">
        <div className="mb-3 flex items-center gap-2">
          <span className="text-lg">🗺️</span>
          <h3 className="text-base font-bold text-stone-800">
            応募はこの5ステップ
          </h3>
        </div>
        <ol className="space-y-2.5">
          {QUICK_STEPS.map((s, i) => (
            <li key={i} className="flex gap-3">
              <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-rolex-green text-sm font-bold text-white">
                {i + 1}
              </span>
              <div className="flex-1">
                <p className="text-sm font-semibold text-stone-800">
                  {s.emoji} {s.title}
                </p>
                <p className="text-xs leading-relaxed text-stone-500">
                  {s.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* 事前準備への導線：先に自分の情報を登録しておくと一括入力がラク */}
      <button
        type="button"
        onClick={onRegisterProfile}
        className="flex w-full items-center gap-3 rounded-2xl border border-rolex-gold/50 bg-amber-50 px-4 py-3 text-left transition active:bg-amber-100"
      >
        <span className="text-xl">⚡</span>
        <span className="flex-1">
          <span className="block text-sm font-bold text-stone-800">
            まず自分の情報を登録しておこう
          </span>
          <span className="block text-xs text-stone-500">
            一度入れておけば、応募時にボタンで一括入力・コピーできるよ
          </span>
        </span>
        <span className="text-rolex-gold">→</span>
      </button>

      {/* CTA：はじめる */}
      <button
        type="button"
        onClick={onStart}
        className="w-full rounded-2xl bg-rolex-gold px-4 py-4 text-center text-base font-bold text-white shadow-md transition active:bg-rolex-goldLight"
      >
        さっそく準備をはじめる →
      </button>
      <p className="text-center text-[11px] leading-relaxed text-stone-400">
        ※ このアプリは入力補助・履歴管理のみを行います。応募・認証・最終送信は
        必ずご本人が、正規の手順で1回だけ行ってください。
      </p>
    </section>
  );
}
