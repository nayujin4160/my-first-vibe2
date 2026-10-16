import { mockReadEntries, mockSecondReadEntries, type Entry } from '../data/mock'
import { demo } from './demo'
import type { Draft } from './store'

const keyOf = (e: Pick<Entry, 'date' | 'shop' | 'amount'>) => `${e.date}|${e.shop}|${e.amount}`

// 흉내: 캡처 글자 읽기 — 몇 장을 고르든 미리 써둔 내역을 돌려줌 (SETUP)
// 저장한 기록이 있으면 두 번째 읽기 결과를 쓰고, 이미 저장한 결제는 걸러낸다 (FLOWS F2 ③)
export function fakeRead(photoCount: number, saved: Entry[]): Draft {
  const mode = demo.ocr()
  if (mode === 'none') {
    return { photoCount, failedCount: photoCount, dupRemoved: 0, alreadyRemoved: 0, entries: [] }
  }

  const source = mode === 'dup' ? mockReadEntries : saved.length > 0 ? mockSecondReadEntries : mockReadEntries
  const savedKeys = new Set(saved.map(keyOf))

  // 같은 결제(날짜·가게·금액이 같음)는 1건만 남김
  const seen = new Set<string>()
  const entries: Entry[] = []
  let dupRemoved = 0
  let alreadyRemoved = 0
  for (const e of source) {
    const key = keyOf(e)
    if (savedKeys.has(key)) {
      if (!seen.has(key)) alreadyRemoved++
      seen.add(key)
      continue
    }
    if (seen.has(key)) {
      dupRemoved++
      continue
    }
    seen.add(key)
    entries.push({ ...e, id: crypto.randomUUID(), space: '공용' })
  }

  const failedCount = mode === 'partial' ? 1 : 0
  return { photoCount, failedCount, dupRemoved, alreadyRemoved, entries }
}
