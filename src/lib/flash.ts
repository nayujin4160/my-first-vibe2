// 화면을 옮긴 뒤 한 번만 보여줄 짧은 안내
let message: string | null = null

export const flash = {
  set(next: string) {
    message = next
  },
  take() {
    const m = message
    message = null
    return m
  },
}
