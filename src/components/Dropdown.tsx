import React, { useRef, useState, useEffect, SyntheticEvent } from 'react';
import { IconButton } from 'react-file-utils';

export const Dropdown = ({ children }: { children?: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownBoxReference = useRef<HTMLDivElement | null>(null);

  const changeMenuVisibility = ({ target }: Event | SyntheticEvent) => {
    if (dropdownBoxReference.current?.contains(target as Element)) return;
    setIsOpen((pv) => !pv);
  };

  useEffect(() => {
    if (!isOpen) return;

    document.addEventListener('click', changeMenuVisibility);

    return () => document.removeEventListener('click', changeMenuVisibility);
  }, [isOpen]);

  return (
    <div className="raf-dropdown">
      <IconButton onClick={changeMenuVisibility}>
        <svg
          className="raf-dropdown__button"
          width="12"
          height="8"
          viewBox="0 0 12 8"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M1.41 0L6 4.77 10.59 0 12 1.469l-6 6.25-6-6.25z" fill="#A0B2B8" fillRule="evenodd" />
        </svg>
      </IconButton>

      {isOpen && (
        <div className="raf-dropdown__box" ref={dropdownBoxReference}>
          {children}
        </div>
      )}
    </div>
  );
};
