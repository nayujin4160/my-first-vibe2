import { useEffect, useState } from 'react'

// SEED snackbar — 잠깐 보이고 사라지는 안내
export function Snackbar({ message, aboveBar = false }: { message: string | null; aboveBar?: boolean }) {
  const [shown, setShown] = useState(message)

  useEffect(() => {
    setShown(message)
    if (!message) return
    const t = setTimeout(() => setShown(null), 2800)
    return () => clearTimeout(t)
  }, [message])

  if (!shown) return null
  return (
    <div
      className={`pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 ${
        aboveBar ? 'pb-[calc(128px+env(safe-area-inset-bottom))]' : 'pb-[max(24px,env(safe-area-inset-bottom))]'
      }`}
    >
      <p role="status" className="w-full max-w-[448px] animate-sheet-in rounded-md bg-fg px-4 py-3 text-body-small text-white">
        {shown}
      </p>
    </div>
  )
}
