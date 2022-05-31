import classNames from 'classnames';
import React, { ReactNode, useRef, useState } from 'react';

import { KeyboardArrowDown, KeyboardArrowUp } from '@/icons/Arrow';

import Dropdown, { DropdownItem } from '../Dropdown';
import * as styles from './index.module.scss';

type Option = {
  value: string;
  title: ReactNode;
};

type Props = {
  value?: string;
  options: Option[];
  onChange?: (value: string) => void;
  isReadOnly?: boolean;
  hasError?: boolean;
};

const Select = ({ value, options, onChange, isReadOnly, hasError }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const anchorRef = useRef<HTMLInputElement>(null);
  const current = options.find((option) => value && option.value === value);

  const handleSelect = (value: string) => {
    onChange?.(value);
    setIsOpen(false);
  };

  return (
    <>
      <div
        ref={anchorRef}
        className={classNames(
          styles.select,
          isOpen && styles.open,
          isReadOnly && styles.readOnly,
          hasError && styles.error
        )}
        role="button"
        onClick={() => {
          if (!isReadOnly) {
            setIsOpen(true);
          }
        }}
      >
        {current?.title}
        <div className={styles.arrow}>{isOpen ? <KeyboardArrowUp /> : <KeyboardArrowDown />}</div>
      </div>
      <Dropdown
        isFullWidth
        anchorRef={anchorRef}
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      >
        {options.map(({ value, title }) => (
          <DropdownItem
            key={value}
            onClick={() => {
              handleSelect(value);
            }}
          >
            {title}
          </DropdownItem>
        ))}
      </Dropdown>
    </>
  );
};

export default Select;
