import { useState } from 'react'
import { demo } from '../lib/demo'
import { Sheet } from './Sheet'
import { PrimaryButton, TextButton } from './ui'

// F1 ⑥ 알림 묻기(시트)
export function NotifySheet({
  open,
  onAccept,
  onDecline,
}: {
  open: boolean
  onAccept: () => void
  onDecline: () => void
}) {
  const [blocked, setBlocked] = useState(false)

  return (
    <Sheet open={open} onClose={onDecline}>
      <h2 className="text-title text-fg">저녁에 알려드릴까요?</h2>
      <p className="mt-3 text-body text-muted">
        "오늘 거 올려볼까요?" 하고 하루 한 번만 알려드려요.
        <br />
        몰아서 올려도 괜찮아요.
      </p>
      {demo.ios() && <p className="mt-2 text-body-small text-muted">아이폰은 홈 화면에 추가해야 알림이 가요.</p>}

      {blocked && (
        <p role="alert" className="mt-4 rounded-md bg-surface px-4 py-3 text-body-small text-fg">
          알림이 꺼져 있어요. 설정에서 켜면 저녁에 알려드려요.
        </p>
      )}

      <div className="mt-6">
        {!blocked && (
          <PrimaryButton
            onClick={() => {
              // 흉내: 알림 권한 — 실제로 묻거나 보내지 않음. ?notify=blocked면 꺼진 상태 (SETUP)
              if (demo.notifyBlocked()) setBlocked(true)
              else onAccept()
            }}
          >
            저녁에 알려주세요
          </PrimaryButton>
        )}
        <TextButton className="mt-1" onClick={onDecline}>
          {blocked ? '닫기' : '괜찮아요'}
        </TextButton>
      </div>
    </Sheet>
  )
}
