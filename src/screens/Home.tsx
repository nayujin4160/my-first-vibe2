import { CaretLeft, CaretRight, GearSix } from '@phosphor-icons/react'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { blankEntry, EditEntrySheet } from '../components/EditEntrySheet'
import { PhotoPicker } from '../components/PhotoPicker'
import { Snackbar } from '../components/Snackbar'
import { BottomBar, PrimaryButton, Screen, TextButton } from '../components/ui'
import type { Entry } from '../data/mock'
import { flash } from '../lib/flash'
import { todayIso, won } from '../lib/format'
import { pending } from '../lib/pending'
import { navigate } from '../lib/router'
import { setState, useStore } from '../lib/store'

const WEEK = ['일', '월', '화', '수', '목', '금', '토']

const pad = (n: number) => String(n).padStart(2, '0')

// F2 ① 홈(달력)
export function Home() {
  const user = useStore((s) => s.user)
  const entries = useStore((s) => s.entries)
  const photos = useStore((s) => s.photos)
  const hasDraft = useStore((s) => s.draft !== null)
  const [notice] = useState(() => flash.take())
  const picker = useRef<HTMLInputElement>(null)
  const [writing, setWriting] = useState<Entry | null>(null)

  // 방금 채워진 칸은 잠깐 강조 (FLOWS F2 ④)
  const [highlight, setHighlight] = useState(() => new Set(notice?.dates ?? []))
  useEffect(() => {
    if (highlight.size === 0) return
    const t = setTimeout(() => setHighlight(new Set()), 2800)
    return () => clearTimeout(t)
  }, [highlight])

  const today = todayIso()
  const [todayY, todayM] = today.split('-').map(Number)
  // 저장하고 돌아왔으면 저장한 결제 중 가장 최근 날의 달, 아니면 이번 달
  const [view, setView] = useState(() => {
    const latest = notice?.dates?.reduce((max, d) => (d > max ? d : max))
    if (!latest) return { y: todayY, m: todayM } // m: 1~12
    const [y, m] = latest.split('-').map(Number)
    return { y, m }
  })

  const knownName = useStore((s) => s.knownName)

  useEffect(() => {
    // 로그인이 풀린 채 돌아왔으면 다시 시작하기로, 처음이면 시작 화면으로 (FLOWS F2 예외)
    if (!user) navigate(knownName ? '/account' : '/', { replace: true })
    // 정리하다 만 결과가 남아 있으면 정리 결과부터 (FLOWS F2 예외)
    else if (hasDraft) navigate('/result', { replace: true })
  }, [user, hasDraft, knownName])

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
        <span className="flex-1" />
        <IconButton label="설정" onClick={() => navigate('/settings')}>
          <GearSix size={22} />
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
              className={`m-0.5 flex aspect-square flex-col items-center justify-start overflow-hidden rounded-sm pt-1.5 text-body-small transition-colors duration-250 active:opacity-80 disabled:text-disabled-fg ${
                isToday ? 'ring-1 ring-fg ring-inset' : ''
              } ${highlight.has(date) ? 'bg-brand-tint' : ''}`}
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

      <BottomBar>
        <PrimaryButton onClick={() => picker.current?.click()}>캡처 올리기</PrimaryButton>
        <TextButton className="mt-1" onClick={() => setWriting(blankEntry(today))}>
          직접 쓰기
        </TextButton>
      </BottomBar>

      <PhotoPicker
        ref={picker}
        onPick={(files) => {
          pending.set(files)
          navigate('/reading')
        }}
      />
      <EditEntrySheet
        entry={writing}
        isNew
        onClose={() => setWriting(null)}
        onSave={(e) => {
          // 직접 쓴 것도 정리 결과(③)를 거쳐 저장 (FLOWS F2 ①)
          setWriting(null)
          setState({ draft: { photoCount: 0, failedCount: 0, dupRemoved: 0, entries: [e] } })
          navigate('/result')
        }}
      />

      <Snackbar message={notice?.message ?? null} aboveBar />
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
