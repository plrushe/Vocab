"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { languages, type SupportedLanguage } from "@/lib/languages";

export function LanguageMenu({ current }: { current: SupportedLanguage }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!open) return;
    function handlePointerDown(event: PointerEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) setOpen(false);
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const options = Object.values(languages);

  return (
    <div className="language-menu" ref={rootRef}>
      <button
        type="button"
        className="language-menu__button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        {languages[current].displayName}
        <svg aria-hidden="true" viewBox="0 0 16 16" className="language-menu__chevron" data-open={open}>
          <path d="m4 6 4 4 4-4" />
        </svg>
      </button>
      {open && (
        <ul className="language-menu__list" role="listbox" aria-label="Select a language">
          {options.map((option) => (
            <li key={option.slug} role="presentation">
              <button
                type="button"
                role="option"
                aria-selected={option.slug === current}
                className="language-menu__item"
                data-active={option.slug === current}
                onClick={() => {
                  setOpen(false);
                  if (option.slug !== current) router.push(`/${option.slug}`);
                }}
              >
                {option.displayName}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
