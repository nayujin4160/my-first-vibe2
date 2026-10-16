import type { ButtonHTMLAttributes, ReactNode } from 'react'

// 화면 틀 — 모바일 우선, 넓은 화면에선 가운데 폰 너비로
export function Screen({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-[480px] flex-col bg-canvas">
      <div className={`flex flex-1 flex-col ${className}`}>{children}</div>
    </div>
  )
}

// SEED box-button: 화면당 주요 행동 하나에만 주황
export function PrimaryButton({ className = '', ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`flex h-[52px] w-full items-center justify-center gap-2 rounded-md bg-primary text-body font-bold text-white transition-colors duration-150 ease-standard hover:bg-primary-hover active:bg-primary-hover disabled:bg-disabled-bg disabled:text-disabled-fg ${className}`}
    />
  )
}

// 회색 보조 버튼
export function SecondaryButton({ className = '', ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`flex h-[52px] w-full items-center justify-center gap-2 rounded-md bg-surface text-body font-bold text-fg transition-colors duration-150 ease-standard hover:bg-background active:bg-hairline ${className}`}
    />
  )
}

// 글자 버튼
export function TextButton({ className = '', ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`flex h-11 w-full items-center justify-center text-body-small font-medium text-muted hover:text-fg ${className}`}
    />
  )
}

// 화면 아래 고정 행동 영역
export function BottomBar({ children }: { children: ReactNode }) {
  return (
    <div className="sticky bottom-0 mt-auto bg-canvas px-4 pt-3 pb-[max(16px,env(safe-area-inset-bottom))]">
      {children}
    </div>
  )
}
