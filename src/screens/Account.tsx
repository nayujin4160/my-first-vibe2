import { ChatCircle, CircleNotch } from '@phosphor-icons/react'
import { useEffect, useState } from 'react'
import { Screen } from '../components/ui'
import { mockUserName } from '../data/mock'
import { demo } from '../lib/demo'
import { navigate } from '../lib/router'
import { getState, setState, useStore } from '../lib/store'

// F1 ④ 시작하기(계정) · F2: 로그인이 풀린 채 돌아왔을 때 다시 시작하기
export function Account() {
  const draft = useStore((s) => s.draft)
  const knownName = useStore((s) => s.knownName)
  const user = useStore((s) => s.user)
  const [loading, setLoading] = useState(false)
  const [failed, setFailed] = useState(false)

  // 저장할 정리 결과도 없고, 전에 쓰던 계정도 없으면 여기 있을 이유가 없음
  const returning = !draft && !!knownName && !user

  useEffect(() => {
    if (!draft && !returning && !loading) navigate(getState().user ? '/home' : '/', { replace: true })
  }, [draft, returning, loading])

  if (!draft && !returning) return null

  const start = () => {
    setFailed(false)
    setLoading(true)
    // 흉내: 카카오로 시작 — 카카오에 다녀온 척하고 "김콩알"로 통과. 이 기기에 남은 기록이 그대로 이어짐 (SETUP)
    setTimeout(() => {
      if (demo.kakaoFail()) {
        setLoading(false)
        setFailed(true)
        return
      }
      if (!draft) {
        setState({ user: { name: mockUserName }, knownName: mockUserName })
        navigate('/home', { replace: true })
        return
      }
      const latest = draft.entries.reduce((max, e) => (e.date > max ? e.date : max), draft.entries[0].date)
      setState((s) => ({
        user: { name: mockUserName },
        knownName: mockUserName,
        entries: [...s.entries, ...draft.entries],
        draft: null,
      }))
      navigate(`/day/${latest}`, { replace: true })
    }, 800)
  }

  return (
    <Screen>
      <div className="flex flex-1 flex-col justify-center px-6">
        {draft ? (
          <>
            <h1 className="text-title text-fg">정리한 {draft.entries.length}건을 저장할까요?</h1>
            <p className="mt-3 text-body text-muted">카카오로 시작하면 다른 기기에서도 이어서 볼 수 있어요.</p>
          </>
        ) : (
          <>
            <h1 className="text-title text-fg">다시 시작할까요?</h1>
            <p className="mt-3 text-body text-muted">카카오로 시작하면 쌓아둔 기록이 그대로 이어져요.</p>
          </>
        )}
      </div>

      <div className="px-4 pb-[max(16px,env(safe-area-inset-bottom))]">
        {failed && (
          <p role="alert" className="mb-3 rounded-md bg-surface px-4 py-3 text-body-small text-fg">
            카카오로 시작하지 못했어요. 잠시 뒤에 다시 눌러주세요.
          </p>
        )}
        {/* 카카오 로그인 버튼은 카카오 가이드의 노란색을 따름 */}
        <button
          onClick={start}
          disabled={loading}
          className="flex h-[52px] w-full items-center justify-center gap-2 rounded-md bg-[#fee500] text-body font-bold text-black/85 transition-opacity duration-150 active:opacity-80 disabled:opacity-80"
        >
          {loading ? (
            <>
              <CircleNotch size={20} className="animate-spin" />
              카카오에서 확인하는 중이에요
            </>
          ) : (
            <>
              <ChatCircle size={20} weight="fill" />
              카카오로 시작
            </>
          )}
        </button>
        <p className="mt-3 text-center text-body-small text-muted">
          시작하면 <span className="underline underline-offset-2">이용약관</span>과{' '}
          <span className="underline underline-offset-2">개인정보 처리</span>에 동의하게 돼요.
        </p>
      </div>
    </Screen>
  )
}
