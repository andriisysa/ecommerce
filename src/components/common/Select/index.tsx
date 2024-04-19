import { useEffect, useState } from 'react';
import {
  CircularProgress,
  MenuItem,
  Select as MuiSelect,
  NoSsr,
  OutlinedInput,
  SelectChangeEvent,
} from '@mui/material';
import classNames from 'classnames';

import { ISelectProps } from './Select.types';
import styles from './styles.module.scss';

const Select = (props: ISelectProps) => {
  const {
    label,
    items,
    value,
    placeholder,
    error,
    isLoading,
    onChange,
    disabled = false,
    classes: { root, select } = {},
    ...rest
  } = props;

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handler = () => {
      setIsOpen(false);
    };
    window.addEventListener('scroll', handler);
    return () => {
      window.removeEventListener('scroll', handler);
    };
  }, []);

  const handleChange = (event: SelectChangeEvent) => {
    if (onChange) onChange(event.target.value);
  };

  return (
    <NoSsr>
      <div className={styles.component}>
        {isLoading && (
          <CircularProgress size={20} classes={{ root: styles.loading }} />
        )}
        <MuiSelect
          displayEmpty
          open={isOpen}
          onOpen={() => {
            setIsOpen(true);
          }}
          onClose={() => {
            setIsOpen(false);
          }}
          value={value || ''}
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
      </div>
    </NoSsr>
  );
};

export default Select;
