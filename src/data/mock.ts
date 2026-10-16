// 가짜 데이터 — SETUP.md "데이터" 기준. 캡처를 읽은 척할 때 이 내역을 돌려준다.

export type Space = '공용' | '용돈'

export type Entry = {
  id: string
  date: string // YYYY-MM-DD
  shop: string
  amount: number // 환불은 마이너스
  space: Space
}

export const mockUserName = '김콩알'

// 같은 결제(쿠팡 32,480원)가 두 장에 겹쳐 13건 → 정리하면 12건
export const mockReadEntries: Omit<Entry, 'id' | 'space'>[] = [
  { date: '2026-10-14', shop: '성수동 파스타', amount: 38000 },
  { date: '2026-10-14', shop: 'GS25', amount: 4200 },
  { date: '2026-10-13', shop: '올리브영', amount: 23900 },
  { date: '2026-10-13', shop: '스타벅스 성수점', amount: 11300 },
  { date: '2026-10-13', shop: '쿠팡', amount: 32480 },
  { date: '2026-10-13', shop: '쿠팡', amount: 32480 },
  { date: '2026-10-13', shop: '이마트 성수점', amount: 67840 },
  { date: '2026-10-12', shop: '배달의민족', amount: 26500 },
  { date: '2026-10-12', shop: '다이소', amount: 7000 },
  { date: '2026-10-12', shop: 'CGV 왕십리', amount: 30000 },
  { date: '2026-10-11', shop: '카카오T 택시', amount: 9800 },
  { date: '2026-10-11', shop: '무신사 환불', amount: -39000 },
  { date: '2026-10-11', shop: '망원시장 정육점', amount: 18000 },
]
