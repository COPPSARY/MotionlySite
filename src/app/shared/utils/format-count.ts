/**
 * Formats a raw count (e.g. a GitHub star count) into a compact, human-readable
 * string: values under 1000 render as-is, values at or above 1000 render as a
 * one-decimal "k" suffix (dropping the decimal when it is a whole thousand).
 *
 * Examples: 42 -> "42", 999 -> "999", 1000 -> "1k", 1234 -> "1.2k".
 */
export function formatStarCount(count: number): string {
  if (!Number.isFinite(count) || count < 1000) {
    return `${Math.max(0, Math.trunc(count))}`;
  }

  const thousands = count / 1000;
  const rounded = Math.round(thousands * 10) / 10;
  return `${rounded % 1 === 0 ? rounded.toFixed(0) : rounded.toFixed(1)}k`;
}
