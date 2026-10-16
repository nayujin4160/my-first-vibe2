const WEEK = ['일', '월', '화', '수', '목', '금', '토']

export function won(n: number) {
  return `${n.toLocaleString('ko-KR')}원`
}

// 오늘 날짜 'YYYY-MM-DD'
export function todayIso() {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

// 읽은 결제 날짜 범위: '10월 11일부터 14일까지' · 하루뿐이면 '10월 14일'
export function dateRange(dates: string[]) {
  const sorted = [...dates].sort()
  const [y1, m1, d1] = sorted[0].split('-').map(Number)
  const [y2, m2, d2] = sorted[sorted.length - 1].split('-').map(Number)
  if (sorted[0] === sorted[sorted.length - 1]) return `${m1}월 ${d1}일`
  const end = y1 === y2 && m1 === m2 ? `${d2}일` : `${m2}월 ${d2}일`
  return `${m1}월 ${d1}일부터 ${end}까지`
}

// 채워진 날 안내: "10월 16일이 채워졌어요." · "10월 15일·16일이 채워졌어요." · 넷 이상은 "10월 11일부터 14일까지 채워졌어요."
export function filledDays(dates: string[]) {
  const sorted = [...new Set(dates)].sort()
  if (sorted.length > 3) return `${dateRange(sorted)} 채워졌어요.`
  let lastMonth = 0
  return sorted
    .map((d) => {
      const [, m, day] = d.split('-').map(Number)
      const label = m === lastMonth ? `${day}일` : `${m}월 ${day}일`
      lastMonth = m
      return label
    })
    .join('·') + '이 채워졌어요.'
}

// '2026-10-14' → '10월 14일 (수)'
export function dayLabel(date: string) {
  const [y, m, d] = date.split('-').map(Number)
  const w = new Date(y, m - 1, d).getDay()
  return `${m}월 ${d}일 (${WEEK[w]})`
}
