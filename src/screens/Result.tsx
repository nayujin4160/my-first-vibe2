import { WarningCircle } from '@phosphor-icons/react'
import { useEffect, useRef, useState } from 'react'
import { EditEntrySheet } from '../components/EditEntrySheet'
import { PhotoPicker } from '../components/PhotoPicker'
import { SpaceTag } from '../components/SpaceTag'
import { BottomBar, PrimaryButton, Screen } from '../components/ui'
import type { Entry } from '../data/mock'
import { dayLabel, won } from '../lib/format'
import { pending } from '../lib/pending'
import { navigate } from '../lib/router'
import { setState, useStore } from '../lib/store'

// F1 ③ 정리 결과
export function Result() {
  const draft = useStore((s) => s.draft)
  const picker = useRef<HTMLInputElement>(null)
  const [editing, setEditing] = useState<Entry | null>(null)
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

  const reupload = (
    <PhotoPicker
      ref={picker}
      onPick={(files) => {
        pending.set(files)
        navigate('/reading')
      }}
    />
  )

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
        </BottomBar>
        {reupload}
      </Screen>
    )
  }

  const byDate = new Map<string, Entry[]>()
  for (const e of [...draft.entries].sort((a, b) => b.date.localeCompare(a.date))) {
    byDate.set(e.date, [...(byDate.get(e.date) ?? []), e])
  }

  const save = (next: Entry) => {
    setState((s) => ({
      draft: s.draft && { ...s.draft, entries: s.draft.entries.map((e) => (e.id === next.id ? next : e)) },
    }))
    setEditing(null)
    setJustMoved(next.id)
  }

  return (
    <Screen>
      <header className="px-4 pt-8 pb-4">
        <h1 className="text-title text-fg">
          캡처 {draft.photoCount}장에서 {draft.entries.length}건 정리했어요.
        </h1>
        <p className="mt-2 text-body text-muted">
          {draft.dupRemoved > 0
            ? `전부 공용에 넣었고, 같은 결제 ${draft.dupRemoved}건은 뺐어요.`
            : '전부 공용에 넣었어요.'}
          <br />
          용돈으로 옮길 건 눌러서 옮겨주세요.
        </p>
      </header>

      {draft.failedCount > 0 && (
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

      <div className="pb-4">
        {[...byDate].map(([date, items]) => (
          <section key={date} className="mt-2">
            <h2 className="px-4 py-2 text-body-small font-bold text-muted">{dayLabel(date)}</h2>
            <ul>
              {items.map((e) => (
                <li key={e.id}>
                  <button
                    onClick={() => setEditing(e)}
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

      <BottomBar>
        <PrimaryButton onClick={() => navigate('/account')}>저장할게요</PrimaryButton>
      </BottomBar>

      <EditEntrySheet entry={editing} onClose={() => setEditing(null)} onSave={save} />
      {reupload}
    </Screen>
  )
}
