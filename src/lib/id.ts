// 衝突しにくいIDを生成する小さなヘルパー。
// crypto.randomUUID が使えればそれを、無ければ時刻＋乱数でフォールバックする。

export function newId(): string {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID();
  }
  return `id-${Date.now().toString(36)}-${Math.random()
    .toString(36)
    .slice(2, 10)}`;
}
