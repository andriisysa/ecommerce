import { useEffect, useState } from 'react';
import {
  MenuItem,
  Select as MuiSelect,
  OutlinedInput,
  SelectChangeEvent,
} from '@mui/material';
import classNames from 'classnames';

import styles from './Select.module.scss';
import { ISelectProps } from './Select.types';

const Select = (props: ISelectProps) => {
  const {
    label,
    items,
    value,
    placeholder,
    error,
    onChange,
    disabled = false,
    classes: { root, select } = {},
    ...rest
  } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value ? value.value : '');

  useEffect(() => {
    const handler = () => {
      setIsOpen(false);
    };
    window.addEventListener('scroll', handler);
    return () => {
      window.removeEventListener('scroll', handler);
    };
  }, []);

  useEffect(() => {
    if (value) {
      if (value.value !== selectedValue) setSelectedValue(value.value);
    } else setSelectedValue('');
  }, [value, setSelectedValue]);

  const handleChange = (event: SelectChangeEvent) => {
    if (onChange) onChange(event.target.value);
  };

  return (
    <>
      <MuiSelect
        displayEmpty
        open={isOpen}
        onOpen={() => {
          setIsOpen(true);
        }}
        onClose={() => {
          setIsOpen(false);
        }}
        value={selectedValue}
        onChange={handleChange}
        input={
          <OutlinedInput
            classes={{
              root: classNames(styles.inputRoot, root),
            }}
          />
        }
        renderValue={(selected: string) => {
          if (!selected) {
            return (
              <span className={styles.placeholder}>
                {placeholder || 'Select'}
              </span>
            );
          }
          const item = items.find((item) => item.value === selected);
          return item ? (
            item.label
          ) : (
            <span className={styles.placeholder}>
              {placeholder || 'Select'}
            </span>
          );
        }}
        inputProps={{ 'aria-label': 'Without label' }}
        classes={{
          select: classNames(styles.selectRoot, select),
        }}
        MenuProps={{ disableScrollLock: true }}
        disabled={disabled}
      >
        {(items || []).map((item, key) => (
          <MenuItem key={key} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </MuiSelect>
      {error && <span className={styles.error}>{error}</span>}
    </>
  );
};

export default Select;
