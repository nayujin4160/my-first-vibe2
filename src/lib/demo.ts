// 흉내 낸 기능의 실패 상태를 주소 끝(?ocr=none 등)으로 눌러볼 수 있게 한다 — SETUP.md "흉내만 낼 것"

function param(name: string) {
  return new URLSearchParams(window.location.search).get(name)
}

export const demo = {
  ocr: () => param('ocr') as 'none' | 'partial' | 'dup' | null,
  kakaoFail: () => param('kakao') === 'fail',
  notifyBlocked: () => param('notify') === 'blocked',
  ios: () => param('ios') === '1',
}
