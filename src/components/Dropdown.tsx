import React, { useRef, useState, PropsWithChildren } from 'react';
import classNames from 'classnames';
import { IconButton } from 'react-file-utils';

import { PropsWithElementAttributes } from '../utils';
import { useOnClickOutside } from '../hooks/useOnClickOutside';

export const Dropdown = ({ children, className, style }: PropsWithChildren<PropsWithElementAttributes>) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownBoxReference = useRef<HTMLDivElement | null>(null);

  useOnClickOutside(dropdownBoxReference, () => setIsOpen(false), isOpen);

  return (
    <div className={classNames('raf-dropdown', className)} style={style}>
      <IconButton onClick={() => setIsOpen((pv) => !pv)}>
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
