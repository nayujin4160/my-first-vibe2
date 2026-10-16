import { useSyncExternalStore } from 'react'
import type { Entry } from '../data/mock'

// 브라우저에 저장 — 새로고침해도 남게 (SETUP.md "데이터")

export type Draft = {
  photoCount: number
  failedCount: number // 읽지 못한 장 수
  dupRemoved: number
  entries: Entry[]
}

export type State = {
  draft: Draft | null // 저장 전 정리 결과
  user: { name: string } | null
  entries: Entry[] // 저장한 내역
  photos: Record<string, string> // 날짜 → 사진(data URL)
  notifyAsked: boolean
  notifyOn: boolean
}

const KEY = 'kongal:v1'

const initial: State = {
  draft: null,
  user: null,
  entries: [],
  photos: {},
  notifyAsked: false,
  notifyOn: false,
}

function load(): State {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? { ...initial, ...JSON.parse(raw) } : initial
  } catch {
    return initial
  }
}

let state = load()
const listeners = new Set<() => void>()

export function getState() {
  return state
}

export function setState(update: Partial<State> | ((s: State) => Partial<State>)) {
  const patch = typeof update === 'function' ? update(state) : update
  const next = { ...state, ...patch }
  // 저장 공간이 꽉 차면 바꾸지 않고 실패를 알린다
  localStorage.setItem(KEY, JSON.stringify(next))
  state = next
  listeners.forEach((l) => l())
}

export function useStore<T>(select: (s: State) => T): T {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l)
      return () => listeners.delete(l)
    },
    () => select(state),
  )
}
