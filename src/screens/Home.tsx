import { useEffect, useState } from 'react'
import { Snackbar } from '../components/Snackbar'
import { Screen } from '../components/ui'
import { flash } from '../lib/flash'
import { navigate } from '../lib/router'
import { useStore } from '../lib/store'

const WEEK = ['일', '월', '화', '수', '목', '금', '토']

// 홈(달력) — F2에서 제대로 그림. F1에선 이번 달 달력 자리만 (SETUP)
export function Home() {
  const user = useStore((s) => s.user)
  const entries = useStore((s) => s.entries)
  const photos = useStore((s) => s.photos)
  const [message] = useState(() => flash.take())

  useEffect(() => {
    if (!user) navigate('/', { replace: true })
  }, [user])

  if (!user) return null

  // 기록이 있는 가장 최근 달 (없으면 이번 달)
  const latest = entries.reduce((max, e) => (e.date > max ? e.date : max), '')
  const base = latest ? new Date(latest + 'T00:00:00') : new Date()
  const year = base.getFullYear()
  const month = base.getMonth()
  const firstWeekday = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const datesWithEntries = new Set(entries.map((e) => e.date))
  const iso = (d: number) => `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`

  return (
    <Screen>
      <header className="px-4 pt-6 pb-4">
        <h1 className="text-title text-fg">
          {year}년 {month + 1}월
        </h1>
      </header>

      <div className="grid grid-cols-7 px-2 text-center">
        {WEEK.map((w) => (
          <span key={w} className="py-2 text-body-small text-muted">
            {w}
          </span>
        ))}
        {Array.from({ length: firstWeekday }, (_, i) => (
          <span key={`blank-${i}`} />
        ))}
        {Array.from({ length: daysInMonth }, (_, i) => {
          const day = i + 1
          const date = iso(day)
          const has = datesWithEntries.has(date)
          const photo = photos[date]
          return (
            <button
              key={date}
              disabled={!has}
              onClick={() => navigate(`/day/${date}`)}
              aria-label={has ? `${month + 1}월 ${day}일 하루 카드` : undefined}
              className="m-0.5 flex aspect-square flex-col items-center justify-start overflow-hidden rounded-sm pt-1.5 text-body-small disabled:text-disabled-fg"
              style={photo ? { backgroundImage: `url(${photo})`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined}
            >
              <span className={`${has ? 'font-bold text-fg' : ''} ${photo ? 'rounded-full bg-canvas/85 px-1.5' : ''}`}>{day}</span>
              {has && !photo && <span className="mt-1 h-1.5 w-1.5 rounded-full bg-muted" />}
            </button>
          )
        })}
      </div>

      <Snackbar message={message} />
    </Screen>
  )
}
