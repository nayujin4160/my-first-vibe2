import { CaretLeft } from '@phosphor-icons/react'
import { useEffect, useState } from 'react'
import { Screen } from '../components/ui'
import { demo } from '../lib/demo'
import { navigate } from '../lib/router'
import { setState, useStore } from '../lib/store'

// F2 설정 — 저녁 알림 켬·끔, 로그아웃
export function Settings() {
  const user = useStore((s) => s.user)
  const notifyOn = useStore((s) => s.notifyOn)
  const [blocked, setBlocked] = useState(false)

  useEffect(() => {
    if (!user) navigate('/', { replace: true })
  }, [user])

  if (!user) return null

  const toggle = () => {
    if (notifyOn) {
      setState({ notifyOn: false, notifyAsked: true })
      return
    }
    // 흉내: 알림 권한 — 실제로 묻지 않고 켬·끔만 저장. ?notify=blocked면 꺼진 상태 (SETUP)
    if (demo.notifyBlocked()) {
      setBlocked(true)
      return
    }
    setBlocked(false)
    setState({ notifyOn: true, notifyAsked: true })
  }

  return (
    <Screen>
      <header className="flex items-center gap-1 px-2 pt-4 pb-2">
        <button
          aria-label="홈으로"
          onClick={() => navigate('/home')}
          className="flex h-11 w-11 items-center justify-center rounded-full text-fg active:bg-surface"
        >
          <CaretLeft size={22} />
        </button>
        <h1 className="text-body font-bold text-fg">설정</h1>
      </header>

      <section className="px-4">
        <div className="flex items-center justify-between py-4">
          <div>
            <p className="text-body text-fg">저녁 알림</p>
            <p className="mt-0.5 text-body-small text-muted">"오늘 거 올려볼까요?" 하고 하루 한 번만 알려드려요.</p>
          </div>
          <button
            role="switch"
            aria-checked={notifyOn}
            aria-label="저녁 알림"
            onClick={toggle}
            className={`relative h-7 w-12 shrink-0 rounded-full transition-colors duration-150 ${notifyOn ? 'bg-primary' : 'bg-disabled-bg'}`}
          >
            <span
              className={`absolute top-1 left-1 h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-150 ease-standard ${
                notifyOn ? 'translate-x-5' : ''
              }`}
            />
          </button>
        </div>
        {blocked && (
          <p role="alert" className="mb-3 rounded-md bg-surface px-4 py-3 text-body-small text-fg">
            알림이 꺼져 있어요. 설정에서 켜면 저녁에 알려드려요.
          </p>
        )}
        {demo.ios() && !notifyOn && (
          <p className="mb-3 text-body-small text-muted">아이폰은 홈 화면에 추가해야 알림이 가요.</p>
        )}

        <div className="border-t border-hairline py-4">
          <p className="text-body text-fg">{user.name} · 카카오</p>
        </div>

        <div className="border-t border-hairline">
          <button
            onClick={() => {
              // 흉내: 로그아웃 — 기록은 이 기기에 남기고 로그인만 풂 (SETUP)
              setState({ user: null, knownName: user.name })
              navigate('/', { replace: true })
            }}
            className="h-12 text-body text-muted active:text-fg"
          >
            로그아웃
          </button>
        </div>
      </section>
    </Screen>
  )
}
