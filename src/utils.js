export function fmt(n) {
  return new Intl.NumberFormat().format(Math.round(n))
}
