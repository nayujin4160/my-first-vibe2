const WEEK = ['일', '월', '화', '수', '목', '금', '토']

export function won(n: number) {
  return `${n.toLocaleString('ko-KR')}원`
}

// '2026-10-14' → '10월 14일 (수)'
export function dayLabel(date: string) {
  const [y, m, d] = date.split('-').map(Number)
  const w = new Date(y, m - 1, d).getDay()
  return `${m}월 ${d}일 (${WEEK[w]})`
}
