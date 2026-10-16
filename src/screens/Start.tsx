import { useRef } from 'react'
import { PhotoPicker } from '../components/PhotoPicker'
import { BottomBar, PrimaryButton, Screen } from '../components/ui'
import { pending } from '../lib/pending'
import { navigate } from '../lib/router'

// F1 ① 시작
export function Start() {
  const picker = useRef<HTMLInputElement>(null)

  return (
    <Screen>
      <div className="flex flex-1 flex-col justify-center px-6 pb-8">
        <p className="text-body-small font-bold text-primary">콩알가계부</p>
        <h1 className="mt-3 text-title text-fg">
          캡처나 영수증을 올리면
          <br />
          날짜·가게·금액을 정리해 둘게요.
        </h1>
        <p className="mt-3 text-body text-muted">지난 내역은 나중에 몰아서 올려도 돼요.</p>
      </div>
      <BottomBar>
        <PrimaryButton onClick={() => picker.current?.click()}>캡처 올려보기</PrimaryButton>
        <p className="mt-3 text-center text-body-small text-muted">올린 캡처는 글자를 읽는 데만 써요.</p>
      </BottomBar>
      <PhotoPicker
        ref={picker}
        onPick={(files) => {
          pending.set(files)
          navigate('/reading')
        }}
      />
    </Screen>
  )
}
