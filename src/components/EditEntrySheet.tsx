import { useState, type ReactNode } from 'react'
import type { Entry, Space } from '../data/mock'
import { Sheet } from './Sheet'
import { PrimaryButton } from './ui'

// F1 ③ 줄을 누르면: 날짜·가게·금액·공용/용돈 고치기
export function EditEntrySheet({
  entry,
  onClose,
  onSave,
}: {
  entry: Entry | null
  onClose: () => void
  onSave: (next: Entry) => void
}) {
  return (
    <Sheet open={entry !== null} onClose={onClose}>
      {entry && <Form key={entry.id} entry={entry} onSave={onSave} />}
    </Sheet>
  )
}

function Form({ entry, onSave }: { entry: Entry; onSave: (next: Entry) => void }) {
  const [date, setDate] = useState(entry.date)
  const [shop, setShop] = useState(entry.shop)
  const [amount, setAmount] = useState(String(entry.amount))
  const [space, setSpace] = useState<Space>(entry.space)

  const amountNum = Number(amount.replace(/,/g, ''))
  const valid = date !== '' && shop.trim() !== '' && amount.trim() !== '' && Number.isFinite(amountNum)

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        if (valid) onSave({ ...entry, date, shop: shop.trim(), amount: amountNum, space })
      }}
    >
      <h2 className="text-body font-bold text-fg">내역 고치기</h2>

      <div className="mt-4 grid grid-cols-2 gap-1 rounded-md bg-surface p-1" role="radiogroup" aria-label="공용 또는 용돈">
        {(['공용', '용돈'] as Space[]).map((s) => (
          <button
            key={s}
            type="button"
            role="radio"
            aria-checked={space === s}
            onClick={() => setSpace(s)}
            className={`h-10 rounded-sm text-body-small font-bold transition-colors duration-150 ${
              space === s ? 'bg-canvas text-primary shadow-sm' : 'text-muted'
            }`}
          >
            {s === '공용' ? '공용' : '내 용돈'}
          </button>
        ))}
      </div>

      <Field label="날짜">
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className={inputCls} />
      </Field>
      <Field label="가게">
        <input value={shop} onChange={(e) => setShop(e.target.value)} className={inputCls} />
      </Field>
      <Field label="금액 (환불은 앞에 -)">
        <div className="relative">
          <input
            inputMode="numeric"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className={`${inputCls} pr-8`}
          />
          <span className="absolute top-1/2 right-3 -translate-y-1/2 text-body text-muted">원</span>
        </div>
      </Field>

      <PrimaryButton type="submit" disabled={!valid} className="mt-6">
        고쳤어요
      </PrimaryButton>
    </form>
  )
}

const inputCls =
  'h-12 w-full rounded-md border border-hairline bg-canvas px-3 text-body text-fg outline-none focus:border-fg'

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="mt-4 block">
      <span className="mb-1.5 block text-body-small text-muted">{label}</span>
      {children}
    </label>
  )
}
