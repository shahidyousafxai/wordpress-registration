import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { appEnv } from '@/network/env'
import { cn } from '@/utils'

const TERMS_OPTIONS = [
  { label: 'Brand Terms & Conditions', href: appEnv.brandTermsUrl },
  { label: 'Creator Terms & Conditions', href: appEnv.creatorTermsUrl },
]

const POPOVER_GAP = 8
const VIEWPORT_PADDING = 8

function TermsConditionsPopover({ open, onClose, anchorRef, placement = 'bottom' }) {
  const popoverRef = useRef(null)
  const [position, setPosition] = useState(null)

  useLayoutEffect(() => {
    if (!open || !anchorRef.current || !popoverRef.current) {
      setPosition(null)
      return
    }

    const updatePosition = () => {
      if (!anchorRef.current || !popoverRef.current) return

      const anchor = anchorRef.current.getBoundingClientRect()
      const popover = popoverRef.current.getBoundingClientRect()
      const maxWidth = Math.min(320, window.innerWidth - VIEWPORT_PADDING * 2)

      let left = anchor.left + anchor.width / 2 - popover.width / 2
      left = Math.max(
        VIEWPORT_PADDING,
        Math.min(left, window.innerWidth - popover.width - VIEWPORT_PADDING)
      )

      let top =
        placement === 'top'
          ? anchor.top - popover.height - POPOVER_GAP
          : anchor.bottom + POPOVER_GAP

      if (placement === 'bottom' && top + popover.height > window.innerHeight - VIEWPORT_PADDING) {
        top = anchor.top - popover.height - POPOVER_GAP
      } else if (placement === 'top' && top < VIEWPORT_PADDING) {
        top = anchor.bottom + POPOVER_GAP
      }

      setPosition({ top, left, maxWidth })
    }

    updatePosition()
    window.addEventListener('resize', updatePosition)
    window.addEventListener('scroll', updatePosition, true)

    return () => {
      window.removeEventListener('resize', updatePosition)
      window.removeEventListener('scroll', updatePosition, true)
    }
  }, [open, placement, anchorRef])

  useEffect(() => {
    if (!open) return

    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }

    const onPointerDown = (event) => {
      const target = event.target
      if (
        popoverRef.current?.contains(target) ||
        anchorRef.current?.contains(target)
      ) {
        return
      }
      onClose()
    }

    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onPointerDown)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onPointerDown)
    }
  }, [open, onClose, anchorRef])

  if (!open) return null

  const handleOptionClick = (href) => {
    window.open(href, '_blank', 'noopener,noreferrer')
    onClose()
  }

  return createPortal(
    <div
      ref={popoverRef}
      role="dialog"
      aria-labelledby="terms-picker-title"
      className={cn(
        'fixed z-50 rounded-md border border-neutral-light1 bg-primary-white p-4 shadow-lg',
        !position && 'invisible pointer-events-none'
      )}
      style={
        position
          ? { top: position.top, left: position.left, maxWidth: position.maxWidth }
          : { top: 0, left: 0, maxWidth: 320 }
      }
    >
      <p
        id="terms-picker-title"
        className="font-raleway text-sm leading-snug text-primary-black smd:text-base"
      >
        Please confirm which Terms &amp; Conditions you would like to view.
      </p>

      <ul className="mt-3 space-y-2">
        {TERMS_OPTIONS.map((option) => (
          <li key={option.label}>
            <button
              type="button"
              onClick={() => handleOptionClick(option.href)}
              className="text-left font-raleway text-sm text-primary-black underline underline-offset-2 hover:text-neutral smd:text-base"
            >
              {option.label}
            </button>
          </li>
        ))}
      </ul>
    </div>,
    document.body
  )
}

export function TermsConditionsLink({
  children = 'T&C',
  className,
  stopPropagation = false,
  placement = 'bottom',
}) {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef(null)

  const handleClick = (event) => {
    if (stopPropagation) event.stopPropagation()
    event.preventDefault()
    setOpen((prev) => !prev)
  }

  return (
    <span className="relative inline">
      <button
        ref={triggerRef}
        type="button"
        onClick={handleClick}
        aria-expanded={open}
        aria-haspopup="dialog"
        className={cn('cursor-pointer bg-transparent p-0 text-inherit', className)}
      >
        {children}
      </button>
      <TermsConditionsPopover
        open={open}
        onClose={() => setOpen(false)}
        anchorRef={triggerRef}
        placement={placement}
      />
    </span>
  )
}

export default TermsConditionsLink
