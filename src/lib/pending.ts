// 고른 캡처는 정리 중 화면으로 넘길 때만 잠깐 들고 있다 (첫 버전: 나가면 처음부터 — FLOWS F1 ② 예외)
let files: File[] = []

export const pending = {
  set(next: File[]) {
    files = next
  },
  get() {
    return files
  },
  clear() {
    files = []
  },
}
