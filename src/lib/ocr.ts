import { mockReadEntries, type Entry } from '../data/mock'
import { demo } from './demo'
import type { Draft } from './store'

// 흉내: 캡처 글자 읽기 — 몇 장을 고르든 미리 써둔 내역을 돌려줌 (SETUP)
export function fakeRead(photoCount: number): Draft {
  const mode = demo.ocr()
  if (mode === 'none') {
    return { photoCount, failedCount: photoCount, dupRemoved: 0, entries: [] }
  }

  // 같은 결제(날짜·가게·금액이 같음)는 1건만 남김
  const seen = new Set<string>()
  const entries: Entry[] = []
  let dupRemoved = 0
  for (const e of mockReadEntries) {
    const key = `${e.date}|${e.shop}|${e.amount}`
    if (seen.has(key)) {
      dupRemoved++
      continue
    }
    seen.add(key)
    entries.push({ ...e, id: crypto.randomUUID(), space: '공용' })
  }

  const failedCount = mode === 'partial' ? 1 : 0
  return { photoCount, failedCount, dupRemoved, entries }
}
