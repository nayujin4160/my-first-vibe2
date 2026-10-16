// 화면을 옮긴 뒤 한 번만 보여줄 짧은 안내 (+ 홈 달력에서 잠깐 강조할 날짜)
type Flash = { message: string; dates?: string[] }

let current: Flash | null = null

export const flash = {
  set(message: string, dates?: string[]) {
    current = { message, dates }
  },
  take() {
    const f = current
    current = null
    return f
  },
}
