import { Screen } from '../components/ui'
import { dayLabel } from '../lib/format'

// F1 ⑤ 하루 카드 — 조각 4에서 만든다
export function DayCard({ date }: { date: string }) {
  return <Screen className="items-center justify-center px-6 text-body text-muted">{dayLabel(date)} 하루 카드는 다음 조각에서 만들어요.</Screen>
}
