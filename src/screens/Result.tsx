import { Plus, WarningCircle } from '@phosphor-icons/react'
import { useEffect, useRef, useState } from 'react'
import { blankEntry, EditEntrySheet } from '../components/EditEntrySheet'
import { PhotoPicker } from '../components/PhotoPicker'
import { SpaceTag } from '../components/SpaceTag'
import { BottomBar, PrimaryButton, Screen, TextButton } from '../components/ui'
import type { Entry } from '../data/mock'
import { dateRange, dayLabel, filledDays, todayIso, won } from '../lib/format'
import { flash } from '../lib/flash'
import { pending } from '../lib/pending'
import { navigate } from '../lib/router'
import { setState, useStore } from '../lib/store'

// F1 ③ 정리 결과
export function Result() {
  const draft = useStore((s) => s.draft)
  const hasUser = useStore((s) => s.user !== null)
  const picker = useRef<HTMLInputElement>(null)
  const [editing, setEditing] = useState<{ entry: Entry; isNew: boolean } | null>(null)
  const [justMoved, setJustMoved] = useState<string | null>(null)

  useEffect(() => {
    if (!draft) navigate('/', { replace: true })
  }, [draft])

  useEffect(() => {
    if (!justMoved) return
    const t = setTimeout(() => setJustMoved(null), 1200)
    return () => clearTimeout(t)
  }, [justMoved])

  if (!draft) return null

  const save = (next: Entry) => {
    setState((s) => {
      if (!s.draft) return {}
      const exists = s.draft.entries.some((e) => e.id === next.id)
      const entries = exists ? s.draft.entries.map((e) => (e.id === next.id ? next : e)) : [...s.draft.entries, next]
      return { draft: { ...s.draft, entries } }
    })
    setEditing(null)
    setJustMoved(next.id)
  }

  // F2: 이미 시작한 사람은 계정을 묻지 않고 바로 저장 → 홈 달력에서 채워진 칸 강조 (FLOWS F2 ③④)
  const saveAndGoHome = () => {
    const dates = draft.entries.map((e) => e.date)
    setState((s) => ({ entries: [...s.entries, ...(s.draft?.entries ?? [])], draft: null }))
    if (dates.length > 0) flash.set(filledDays(dates), dates)
    navigate('/home', { replace: true })
  }

  const writeNew = () => {
    const latest = draft.entries.reduce((max, e) => (e.date > max ? e.date : max), '')
    setEditing({ entry: blankEntry(latest || todayIso()), isNew: true })
  }

  const sheets = (
    <>
      <PhotoPicker
        ref={picker}
        onPick={(files) => {
          pending.set(files)
          navigate('/reading')
        }}
      />
      <EditEntrySheet
        entry={editing?.entry ?? null}
        isNew={editing?.isNew}
        onClose={() => setEditing(null)}
        onSave={save}
      />
    </>
  )

  // 읽은 결제가 모두 이미 저장된 것 (FLOWS F2 ③)
  if (draft.entries.length === 0 && (draft.alreadyRemoved ?? 0) > 0) {
    return (
      <Screen>
        <div className="flex flex-1 flex-col justify-center px-6">
          <h1 className="text-title text-fg">이미 올린 결제예요.</h1>
          <p className="mt-3 text-body text-muted">새로 넣을 내역은 없어요.</p>
        </div>
        <BottomBar>
          <PrimaryButton
            onClick={() => {
              setState({ draft: null })
              navigate('/home', { replace: true })
            }}
          >
            홈으로
          </PrimaryButton>
          <TextButton className="mt-1" onClick={writeNew}>
            캡처 없이 직접 쓸게요
          </TextButton>
        </BottomBar>
        {sheets}
      </Screen>
    )
  }

  // 빈 상태: 한 건도 못 읽음
  if (draft.entries.length === 0) {
    return (
      <Screen>
        <div className="flex flex-1 flex-col justify-center px-6">
          <WarningCircle size={32} className="text-error" />
          <h1 className="mt-3 text-title text-fg">이 캡처는 금액을 읽지 못했어요.</h1>
          <p className="mt-3 text-body text-muted">
            글자가 흐리거나 잘렸을 수 있어요. 내역이 한 화면에 다 보이게 다시 캡처해서 올려주세요.
          </p>
        </div>
        <BottomBar>
          <PrimaryButton onClick={() => picker.current?.click()}>다시 올리기</PrimaryButton>
          <TextButton className="mt-1" onClick={writeNew}>
            캡처 없이 직접 쓸게요
          </TextButton>
          {/* 이미 시작한 사람은 달력으로 돌아갈 수 있게 (02 점검 막힘 1) */}
          {hasUser && (
            <TextButton
              onClick={() => {
                setState({ draft: null })
                navigate('/home', { replace: true })
              }}
            >
              홈으로
            </TextButton>
          )}
        </BottomBar>
        {sheets}
      </Screen>
    )
  }

  const read = draft.entries.filter((e) => !e.manual)
  const manualCount = draft.entries.length - read.length

  const byDate = new Map<string, Entry[]>()
  for (const e of [...draft.entries].sort((a, b) => b.date.localeCompare(a.date))) {
    byDate.set(e.date, [...(byDate.get(e.date) ?? []), e])
  }

  return (
    <Screen>
      <header className="px-4 pt-8 pb-4">
        {read.length > 0 ? (
          <>
            <h1 className="text-title text-fg">
              캡처 {draft.photoCount}장에서 {read.length}건 정리했어요.
            </h1>
            <p className="mt-2 text-body text-fg">{dateRange(read.map((e) => e.date))}의 결제예요.</p>
            <p className="mt-1 text-body text-muted">
              {draft.dupRemoved > 0
                ? `전부 공용에 넣었고, 같은 결제 ${draft.dupRemoved}건은 뺐어요.`
                : '전부 공용에 넣었어요.'}
              {(draft.alreadyRemoved ?? 0) > 0 && (
                <>
                  <br />
                  이미 올린 결제 {draft.alreadyRemoved}건은 뺐어요.
                </>
              )}
              <br />
              용돈으로 옮길 건 눌러서 옮겨주세요.
            </p>
            {manualCount > 0 && <p className="mt-1 text-body text-muted">직접 쓴 {manualCount}건도 같이 저장해요.</p>}
          </>
        ) : (
          <>
            <h1 className="text-title text-fg">직접 쓴 {manualCount}건이에요.</h1>
            <p className="mt-2 text-body text-muted">고칠 건 눌러서 고쳐주세요. 저장하면 그날 하루 카드에 들어가요.</p>
          </>
        )}
      </header>

      {draft.failedCount > 0 && read.length > 0 && (
        <div className="mx-4 mb-2 flex items-center justify-between gap-3 rounded-md bg-surface px-4 py-3">
          <p className="flex items-center gap-2 text-body-small text-fg">
            <WarningCircle size={18} className="shrink-0 text-error" />
            {draft.failedCount}장은 읽지 못했어요
          </p>
          <button
            onClick={() => picker.current?.click()}
            className="shrink-0 rounded-sm border border-hairline bg-canvas px-3 py-1.5 text-body-small font-bold text-fg"
          >
            다시 올리기
          </button>
        </div>
      )}

      <div className="pb-2">
        {[...byDate].map(([date, items]) => (
          <section key={date} className="mt-2">
            <h2 className="px-4 py-2 text-body-small font-bold text-muted">{dayLabel(date)}</h2>
            <ul>
              {items.map((e) => (
                <li key={e.id}>
                  <button
                    onClick={() => setEditing({ entry: e, isNew: false })}
                    className={`flex w-full items-center gap-3 px-4 py-3 text-left transition-colors duration-250 active:bg-surface ${
                      justMoved === e.id ? 'bg-brand-tint' : ''
                    }`}
                  >
                    <span className="flex-1 truncate text-body text-fg">{e.shop}</span>
                    <span className="text-body font-bold text-fg tabular-nums">{won(e.amount)}</span>
                    <SpaceTag space={e.space} />
                  </button>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <div className="px-4 pb-4">
        <button
          onClick={writeNew}
          className="flex h-12 w-full items-center justify-center gap-1.5 rounded-md border border-dashed border-hairline text-body-small font-medium text-muted active:bg-surface"
        >
          <Plus size={16} />
          직접 추가
        </button>
      </div>

      <BottomBar>
        <PrimaryButton onClick={() => (hasUser ? saveAndGoHome() : navigate('/account'))}>저장할게요</PrimaryButton>
      </BottomBar>

      {sheets}
    </Screen>
  )
}
