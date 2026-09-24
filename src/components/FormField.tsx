'use client';

import { useEffect, useId, useRef, useState, type ComponentType, type ReactNode } from 'react';
import SA from 'country-flag-icons/react/3x2/SA';
import AE from 'country-flag-icons/react/3x2/AE';
import KW from 'country-flag-icons/react/3x2/KW';
import QA from 'country-flag-icons/react/3x2/QA';
import BH from 'country-flag-icons/react/3x2/BH';
import OM from 'country-flag-icons/react/3x2/OM';
import JO from 'country-flag-icons/react/3x2/JO';
import EG from 'country-flag-icons/react/3x2/EG';
import YE from 'country-flag-icons/react/3x2/YE';
import IQ from 'country-flag-icons/react/3x2/IQ';
import LB from 'country-flag-icons/react/3x2/LB';
import SY from 'country-flag-icons/react/3x2/SY';
import PS from 'country-flag-icons/react/3x2/PS';
import SD from 'country-flag-icons/react/3x2/SD';
import LY from 'country-flag-icons/react/3x2/LY';
import TN from 'country-flag-icons/react/3x2/TN';
import DZ from 'country-flag-icons/react/3x2/DZ';
import MA from 'country-flag-icons/react/3x2/MA';

export const inputClass =
  'w-full h-[3.25rem] bg-white border-2 border-purple-200 rounded-xl px-5 text-sm text-right text-dark placeholder-mid/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/40 focus:border-purple-500 transition-colors';

// Textareas share the look but grow with their rows.
export const textareaClass = inputClass.replace('h-[3.25rem]', 'py-3.5') + ' resize-none';

export default function FormField({ id, label, optional, children }: { id: string; label: string; optional?: boolean; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-bold text-mid mb-2">
        {label}
        {optional && <span className="font-normal"> (اختياري)</span>}
      </label>
      {children}
    </div>
  );
}

// ── Listbox ─────────────────────────────────────────────────────────────
// A drawn dropdown in place of the native <select>: the native list can't
// carry flags and opens in the operating system's own style. The popup sits
// flush on the field's edges, and the control keeps full keyboard support
// (arrows, Home/End, Enter/Space, Escape, first-letter jump).

type Option = { value: string; label: string; hint?: string; Icon?: ComponentType<{ className?: string; title?: string }> };

function Flag({ Icon }: { Icon?: Option['Icon'] }) {
  if (!Icon) return null;
  return <Icon className="w-6 h-4 rounded-[3px] shadow-sm ring-1 ring-black/10 flex-shrink-0" />;
}

export function Listbox({
  id,
  name,
  options,
  value: controlled,
  defaultValue = '',
  onChange,
  placeholder = 'اختاري',
  required,
  ariaLabel,
  compact,
  anchorToParent,
}: {
  id?: string;
  name: string;
  options: Option[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  ariaLabel?: string;
  /** Trigger shows only the icon and hint (used for the dial code). */
  compact?: boolean;
  /** Let the popup span the nearest positioned parent (the whole phone row). */
  anchorToParent?: boolean;
}) {
  const autoId = useId();
  const baseId = id ?? autoId;
  const listId = `${baseId}-list`;
  const [inner, setInner] = useState(defaultValue);
  const value = controlled ?? inner;
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const selected = options.find((o) => o.value === value);

  const choose = (v: string) => {
    if (controlled === undefined) setInner(v);
    onChange?.(v);
    setOpen(false);
    buttonRef.current?.focus();
  };

  const openList = () => {
    const i = Math.max(0, options.findIndex((o) => o.value === value));
    setActive(i);
    setOpen(true);
  };

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!rootRef.current?.parentElement?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('pointerdown', onDown);
    return () => document.removeEventListener('pointerdown', onDown);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    listRef.current?.querySelector<HTMLElement>(`[data-index="${active}"]`)?.scrollIntoView({ block: 'nearest' });
  }, [open, active]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!open) {
      if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key)) { e.preventDefault(); openList(); }
      return;
    }
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive((a) => Math.min(options.length - 1, a + 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive((a) => Math.max(0, a - 1)); }
    else if (e.key === 'Home') { e.preventDefault(); setActive(0); }
    else if (e.key === 'End') { e.preventDefault(); setActive(options.length - 1); }
    else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); choose(options[active].value); }
    else if (e.key === 'Escape' || e.key === 'Tab') { setOpen(false); }
    else if (e.key.length === 1) {
      const i = options.findIndex((o) => o.label.startsWith(e.key));
      if (i >= 0) setActive(i);
    }
  };

  return (
    <div ref={rootRef} className={anchorToParent ? '' : 'relative'}>
      <button
        ref={buttonRef}
        id={baseId}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-label={ariaLabel}
        aria-activedescendant={open ? `${baseId}-opt-${active}` : undefined}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={onKeyDown}
        className={`${inputClass} flex items-center gap-3 cursor-pointer ${compact ? 'px-3.5 justify-between' : 'pl-11'} ${open ? '!border-purple-500' : ''}`}
      >
        {selected ? (
          <>
            {compact ? (
              <span className="flex items-center gap-2">
                <Flag Icon={selected.Icon} />
                <span dir="ltr" className="font-bold text-dark">{selected.hint}</span>
              </span>
            ) : (
              <>
                <Flag Icon={selected.Icon} />
                <span className="truncate">{selected.label}</span>
              </>
            )}
          </>
        ) : (
          <span className="text-mid/70">{placeholder}</span>
        )}
        <svg
          className={`pointer-events-none w-4 h-4 text-purple-500 transition-transform duration-200 ${compact ? 'flex-shrink-0' : 'absolute left-4 top-1/2 -translate-y-1/2'} ${open ? 'rotate-180' : ''}`}
          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {/* Keeps native "required" validation for the hidden value. */}
      <input
        tabIndex={-1}
        aria-hidden="true"
        name={name}
        value={value}
        required={required}
        onChange={() => {}}
        className="absolute bottom-0 right-1/2 w-px h-px opacity-0 pointer-events-none"
      />

      {open && (
        <ul
          ref={listRef}
          id={listId}
          role="listbox"
          dir="rtl"
          aria-label={ariaLabel}
          className="absolute z-40 inset-x-0 top-full mt-1.5 max-h-72 overflow-auto bg-white border-2 border-purple-200 rounded-xl shadow-xl shadow-purple-200/50 py-1.5"
          style={{ animation: 'fadeIn 0.15s ease' }}
        >
          {options.map((o, i) => {
            const isSel = o.value === value;
            return (
              <li
                key={o.value}
                id={`${baseId}-opt-${i}`}
                data-index={i}
                role="option"
                aria-selected={isSel}
                onPointerEnter={() => setActive(i)}
                onClick={() => choose(o.value)}
                className={`flex items-center gap-3 px-4 min-h-11 text-sm cursor-pointer ${i === active ? 'bg-purple-50' : ''} ${isSel ? 'font-bold text-purple-600' : 'text-dark'}`}
              >
                <Flag Icon={o.Icon} />
                <span className="flex-1">{o.label}</span>
                {o.hint && <span dir="ltr" className="text-mid text-xs font-semibold tabular-nums">{o.hint}</span>}
                {isSel && (
                  <svg className="w-4 h-4 text-purple-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m5 12 4.2 4.2L19.5 6" /></svg>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

// Plain text options for the role and topic pickers.
export const textOptions = (items: readonly string[]): Option[] => items.map((v) => ({ value: v, label: v }));

// Arab countries, Saudi Arabia first and default.
export const dialCodes: Option[] = [
  { value: '+966', hint: '+966', label: 'السعودية', Icon: SA },
  { value: '+971', hint: '+971', label: 'الإمارات', Icon: AE },
  { value: '+965', hint: '+965', label: 'الكويت', Icon: KW },
  { value: '+974', hint: '+974', label: 'قطر', Icon: QA },
  { value: '+973', hint: '+973', label: 'البحرين', Icon: BH },
  { value: '+968', hint: '+968', label: 'عُمان', Icon: OM },
  { value: '+962', hint: '+962', label: 'الأردن', Icon: JO },
  { value: '+20', hint: '+20', label: 'مصر', Icon: EG },
  { value: '+967', hint: '+967', label: 'اليمن', Icon: YE },
  { value: '+964', hint: '+964', label: 'العراق', Icon: IQ },
  { value: '+961', hint: '+961', label: 'لبنان', Icon: LB },
  { value: '+963', hint: '+963', label: 'سوريا', Icon: SY },
  { value: '+970', hint: '+970', label: 'فلسطين', Icon: PS },
  { value: '+249', hint: '+249', label: 'السودان', Icon: SD },
  { value: '+218', hint: '+218', label: 'ليبيا', Icon: LY },
  { value: '+216', hint: '+216', label: 'تونس', Icon: TN },
  { value: '+213', hint: '+213', label: 'الجزائر', Icon: DZ },
  { value: '+212', hint: '+212', label: 'المغرب', Icon: MA },
];

// Phone number with its country code. The number reads left-to-right, so the
// pair is laid out LTR: code first, then the local number. The code list opens
// across the whole row, flush with its edges.
export function PhoneInput({ id, required }: { id: string; required?: boolean }) {
  return (
    <div dir="ltr" className="relative flex gap-2">
      <div className="w-[7.5rem] flex-shrink-0">
        <Listbox name="dialCode" options={dialCodes} defaultValue="+966" ariaLabel="مفتاح الدولة" compact anchorToParent />
      </div>
      <input
        id={id}
        name="phone"
        type="tel"
        inputMode="tel"
        autoComplete="tel-national"
        required={required}
        placeholder="55 123 4567"
        pattern="[0-9 ]{7,14}"
        title="أرقام فقط، من ٧ إلى ١٤ رقمًا"
        className={`${inputClass} !text-left flex-1 min-w-0 tracking-wide`}
      />
    </div>
  );
}

// Shown on submit until the forms are connected to Najia's email or WhatsApp.
export function DemoNotice({ destination }: { destination: string }) {
  return (
    <div role="status" className="bg-gold-50 border border-gold-200 rounded-xl p-4 text-sm text-mid leading-relaxed">
      <span className="font-bold text-dark">هذا نموذج تجريبي في المعاينة — </span>
      لم يُرسَل طلبك بعد. سيُربط النموذج {destination} عند النشر.
    </div>
  );
}
