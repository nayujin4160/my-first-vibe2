import { useSyncExternalStore } from 'react'

// 작은 주소 이동기. 주소 끝의 흉내 설정(?ocr=… 등)은 이동해도 그대로 남긴다.

const listeners = new Set<() => void>()
const notify = () => listeners.forEach((l) => l())
window.addEventListener('popstate', notify)

export function navigate(path: string, opts: { replace?: boolean } = {}) {
  const url = path + window.location.search
  if (opts.replace) window.history.replaceState(null, '', url)
  else window.history.pushState(null, '', url)
  window.scrollTo(0, 0)
  notify()
}

export function usePath() {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l)
      return () => listeners.delete(l)
    },
    () => window.location.pathname,
  )
}
