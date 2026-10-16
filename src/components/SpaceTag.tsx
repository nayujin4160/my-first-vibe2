import type { Space } from '../data/mock'

// 공용 / 용돈 꼬리표 — 둘 다 중립색 (주황은 주요 행동·선택 상태에만)
export function SpaceTag({ space }: { space: Space }) {
  return space === '공용' ? (
    <span className="shrink-0 rounded-sm bg-surface px-2 py-0.5 text-body-small font-medium text-muted">공용</span>
  ) : (
    <span className="shrink-0 rounded-sm border border-hairline px-2 py-0.5 text-body-small font-medium text-fg">용돈</span>
  )
}
