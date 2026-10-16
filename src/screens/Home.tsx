import { CaretLeft, CaretRight } from '@phosphor-icons/react'
import { useEffect, useState, type ReactNode } from 'react'
import { Snackbar } from '../components/Snackbar'
import { Screen } from '../components/ui'
import { flash } from '../lib/flash'
import { todayIso, won } from '../lib/format'
import { navigate } from '../lib/router'
import { useStore } from '../lib/store'

const WEEK = ['일', '월', '화', '수', '목', '금', '토']

const pad = (n: number) => String(n).padStart(2, '0')

// F2 ① 홈(달력)
export function Home() {
  const user = useStore((s) => s.user)
  const entries = useStore((s) => s.entries)
  const photos = useStore((s) => s.photos)
  const [message] = useState(() => flash.take())

  const today = todayIso()
  const [todayY, todayM] = today.split('-').map(Number)
  const [view, setView] = useState({ y: todayY, m: todayM }) // m: 1~12

  useEffect(() => {
    if (!user) navigate('/', { replace: true })
  }, [user])

  if (!user) return null

  const monthKey = `${view.y}-${pad(view.m)}`
  const monthEntries = entries.filter((e) => e.date.startsWith(monthKey))
  const sharedTotal = monthEntries.filter((e) => e.space === '공용').reduce((sum, e) => sum + e.amount, 0)
  const datesWithEntries = new Set(monthEntries.map((e) => e.date))

  const firstWeekday = new Date(view.y, view.m - 1, 1).getDay()
  const daysInMonth = new Date(view.y, view.m, 0).getDate()
  const isThisMonth = view.y === todayY && view.m === todayM

  const move = (delta: number) =>
    setView(({ y, m }) => {
      const d = new Date(y, m - 1 + delta, 1)
      return { y: d.getFullYear(), m: d.getMonth() + 1 }
    })

  return (
    <Screen>
      <header className="flex items-center gap-1 px-2 pt-4">
        <IconButton label="지난달" onClick={() => move(-1)}>
          <CaretLeft size={22} />
        </IconButton>
        <h1 className="min-w-[128px] text-center text-title text-fg">
          {view.y}년 {view.m}월
        </h1>
        {/* 이번 달보다 뒤로는 넘기지 않는다 */}
        <IconButton label="다음 달" disabled={isThisMonth} onClick={() => move(1)}>
          <CaretRight size={22} />
        </IconButton>
      </header>

      <div className="px-4 pt-2 pb-3">
        {monthEntries.length > 0 ? (
          <p className="text-body text-muted">
            이번 달 공용 <span className="font-bold text-fg tabular-nums">{won(sharedTotal)}</span>
          </p>
        ) : (
          <p className="text-body text-muted">이번 달은 아직 비어 있어요. 캡처 한 번에 여러 장 올릴 수 있어요.</p>
        )}
      </div>

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
          const date = `${monthKey}-${pad(day)}`
          const has = datesWithEntries.has(date)
          const photo = photos[date]
          const isToday = date === today
          const future = date > today
          return (
            <button
              key={date}
              disabled={future}
              onClick={() => navigate(`/day/${date}`)}
              aria-label={`${view.m}월 ${day}일 하루 카드`}
              className={`m-0.5 flex aspect-square flex-col items-center justify-start overflow-hidden rounded-sm pt-1.5 text-body-small active:opacity-80 disabled:text-disabled-fg ${
                isToday ? 'ring-1 ring-fg ring-inset' : ''
              }`}
              style={photo ? { backgroundImage: `url(${photo})`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined}
            >
              <span
                className={`${has ? 'font-bold text-fg' : future ? '' : 'text-muted'} ${photo ? 'rounded-full bg-canvas/85 px-1.5' : ''}`}
              >
                {day}
              </span>
              {has && !photo && <span className="mt-1 h-1.5 w-1.5 rounded-full bg-muted" />}
            </button>
          )
        })}
      </div>

      <Snackbar message={message} />
    </Screen>
  )
}

function IconButton({
  label,
  disabled = false,
  onClick,
  children,
}: {
  label: string
  disabled?: boolean
  onClick: () => void
  children: ReactNode
}) {
  return (
    <button
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="flex h-11 w-11 items-center justify-center rounded-full text-fg active:bg-surface disabled:text-disabled-fg"
    >
      {children}
    </button>
  )
}
