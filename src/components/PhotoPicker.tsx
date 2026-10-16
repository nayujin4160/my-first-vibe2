import { forwardRef } from 'react'

// 기기 사진첩 열기. 여러 장 고르기.
export const PhotoPicker = forwardRef<
  HTMLInputElement,
  { multiple?: boolean; onPick: (files: File[]) => void }
>(function PhotoPicker({ multiple = true, onPick }, ref) {
  return (
    <input
      ref={ref}
      type="file"
      accept="image/*"
      multiple={multiple}
      className="hidden"
      onChange={(e) => {
        const files = Array.from(e.target.files ?? [])
        e.target.value = ''
        if (files.length > 0) onPick(files)
      }}
    />
  )
})
