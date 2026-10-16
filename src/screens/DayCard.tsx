import { CaretLeft, CaretRight, Plus } from '@phosphor-icons/react'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { NotifySheet } from '../components/NotifySheet'
import { PhotoPicker } from '../components/PhotoPicker'
import { BottomBar, Screen, SecondaryButton } from '../components/ui'
import { flash } from '../lib/flash'
import { dayLabel, won } from '../lib/format'
import { shrinkImage } from '../lib/image'
import { navigate } from '../lib/router'
import { setState, useStore } from '../lib/store'

// F1 ⑤ 하루 카드
export function DayCard({ date }: { date: string }) {
  const user = useStore((s) => s.user)
  const allEntries = useStore((s) => s.entries)
  const photo = useStore((s) => s.photos[date])
  const picker = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [failed, setFailed] = useState(false)
  const notifyAsked = useStore((s) => s.notifyAsked)
  const [asking, setAsking] = useState(false)

  // 첫 하루 카드를 본 직후에만 알림을 묻는다 (FLOWS F1 ⑥)
  const goCalendar = () => (notifyAsked ? navigate('/home') : setAsking(true))
  const closeNotify = (on: boolean) => {
    setState({ notifyAsked: true, notifyOn: on })
    // 흉내: 저녁 알림 — 실제로 보내지 않고 화면 안내로 대신 (SETUP)
    if (on) flash.set('저녁에 "오늘 거 올려볼까요?" 하고 알려드릴게요.')
    setAsking(false)
    navigate('/home')
  }

  useEffect(() => {
    if (!user) navigate('/', { replace: true })
  }, [user])

  useEffect(() => setFailed(false), [date])

  if (!user) return null

  const entries = allEntries.filter((e) => e.date === date)
  const sharedTotal = entries.filter((e) => e.space === '공용').reduce((sum, e) => sum + e.amount, 0)

  // 전날·다음날: 내역이 있는 날 중 바로 옆 날
  const dates = [...new Set(allEntries.map((e) => e.date))].sort()
  const prev = dates.filter((d) => d < date).at(-1)
  const next = dates.find((d) => d > date)

  const attach = async (file: File) => {
    setFailed(false)
    setUploading(true)
    try {
      const dataUrl = await shrinkImage(file)
      setState((s) => ({ photos: { ...s.photos, [date]: dataUrl } }))
    } catch {
      setFailed(true)
    } finally {
      setUploading(false)
    }
  }

  return (
    <Screen>
      <header className="flex items-center justify-between px-2 pt-4 pb-2">
        <ArrowButton label="전날" disabled={!prev} onClick={() => prev && navigate(`/day/${prev}`, { replace: true })}>
          <CaretLeft size={22} />
        </ArrowButton>
        <h1 className="text-body font-bold text-fg">{dayLabel(date)}</h1>
        <ArrowButton label="다음날" disabled={!next} onClick={() => next && navigate(`/day/${next}`, { replace: true })}>
          <CaretRight size={22} />
        </ArrowButton>
      </header>

      <div className="px-4">
        {photo ? (
          <button
            onClick={() => picker.current?.click()}
            className="block aspect-[4/3] w-full overflow-hidden rounded-md bg-surface"
            aria-label="이날 사진 바꾸기"
          >
            <img src={photo} alt={`${dayLabel(date)} 사진`} className={`h-full w-full object-cover ${uploading ? 'opacity-40' : ''}`} />
          </button>
        ) : (
          <button
            onClick={() => picker.current?.click()}
            disabled={uploading}
            className={`flex aspect-[4/3] w-full flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed border-hairline text-body font-medium text-muted transition-opacity duration-150 active:bg-surface ${
              uploading ? 'opacity-40' : ''
            }`}
          >
            <Plus size={24} />
            이날 사진 붙이기
          </button>
        )}
        {failed && (
          <p role="alert" className="mt-2 text-body-small text-error">
            사진을 올리지 못했어요. 연결을 확인하고 다시 눌러주세요.
          </p>
        )}
      </div>

      <ul className="mt-4 px-4">
        {entries.map((e) => (
          <li key={e.id} className="flex items-center gap-3 py-2.5">
            <span className="flex-1 truncate text-body text-fg">{e.shop}</span>
            {e.space === '용돈' && (
              <span className="shrink-0 rounded-sm border border-hairline px-2 py-0.5 text-body-small font-medium text-fg">용돈</span>
            )}
            <span className="text-body font-bold text-fg tabular-nums">{won(e.amount)}</span>
          </li>
        ))}
      </ul>

      <div className="mx-4 mt-2 flex items-center justify-between border-t border-hairline pt-3 pb-4">
        <span className="text-body text-muted">이날 공용</span>
        <span className="text-body font-bold text-fg tabular-nums">{won(sharedTotal)}</span>
      </div>

      <BottomBar>
        <SecondaryButton onClick={goCalendar}>달력 보기</SecondaryButton>
      </BottomBar>

      <NotifySheet open={asking} onAccept={() => closeNotify(true)} onDecline={() => closeNotify(false)} />

      <PhotoPicker ref={picker} multiple={false} onPick={([file]) => attach(file)} />
    </Screen>
  )
}

function ArrowButton({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string
  disabled: boolean
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
