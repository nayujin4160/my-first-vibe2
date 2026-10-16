import { Check } from '@phosphor-icons/react'
import { useEffect, useMemo, useState } from 'react'
import { Screen } from '../components/ui'
import { fakeRead } from '../lib/ocr'
import { pending } from '../lib/pending'
import { navigate } from '../lib/router'
import { getState, setState } from '../lib/store'

// F1 ② 정리 중
export function Reading() {
  const files = useMemo(() => pending.get(), [])
  const [urls, setUrls] = useState<string[]>([])
  const [done, setDone] = useState(0)
  const total = files.length

  useEffect(() => {
    // 정리 중에 나갔다 오면 고른 캡처가 없음 → 처음부터 (FLOWS F1 ② 예외)
    if (total === 0) {
      navigate('/', { replace: true })
      return
    }
    const next = files.map((f) => URL.createObjectURL(f))
    setUrls(next)
    return () => next.forEach((u) => URL.revokeObjectURL(u))
  }, [files, total])

  useEffect(() => {
    if (total === 0) return
    if (done >= total) {
      const t = setTimeout(() => {
        setState({ draft: fakeRead(total, getState().entries) })
        pending.clear()
        navigate('/result', { replace: true })
      }, 400)
      return () => clearTimeout(t)
    }
    // 흉내: 한 장씩 읽는 척 (SETUP)
    const t = setTimeout(() => setDone((d) => d + 1), Math.min(900, 6000 / total))
    return () => clearTimeout(t)
  }, [done, total])

  if (total === 0) return null
  const reading = Math.min(done + 1, total)

  return (
    <Screen className="justify-center px-6">
      <p className="text-center text-body font-bold text-fg" aria-live="polite">
        {done >= total ? `캡처 ${total}장을 다 읽었어요` : `캡처 ${total}장 중 ${reading}장 읽는 중이에요`}
      </p>

      <div className="mt-6 flex justify-center gap-2 overflow-x-auto pb-1">
        {urls.map((u, i) => (
          <div key={u} className="relative h-16 w-12 shrink-0 overflow-hidden rounded-sm bg-surface">
            <img src={u} alt="" className={`h-full w-full object-cover ${i < done ? '' : 'opacity-60'}`} />
            {i < done && (
              <span className="absolute inset-0 flex items-center justify-center bg-black/35">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white">
                  <Check size={14} weight="bold" />
                </span>
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="mx-auto mt-6 h-1 w-full max-w-[280px] overflow-hidden rounded-full bg-hairline">
        <div
          className="h-full rounded-full bg-primary transition-[width] duration-250 ease-standard"
          style={{ width: `${(done / total) * 100}%` }}
        />
      </div>
    </Screen>
  )
}
