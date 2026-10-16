import { useEffect, type ReactNode } from 'react'

// 아래에서 올라오는 시트 — 뒤 화면은 흐리게 (DESIGN: Bottom-sheet presentation)
export function Sheet({ open, onClose, children }: { open: boolean; onClose: () => void; children: ReactNode }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div className="absolute inset-0 animate-fade-in bg-overlay" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        className="relative w-full max-w-[480px] animate-sheet-in rounded-t-2xl bg-canvas px-4 pt-6 pb-[max(16px,env(safe-area-inset-bottom))]"
      >
        {children}
      </div>
    </div>
  )
}
