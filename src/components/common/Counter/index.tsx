import { ChangeEvent } from 'react';
import { Add, Remove } from '@mui/icons-material';
import { NoSsr, TextField } from '@mui/material';

import { IBaseUIProps } from '@/types';

import Button from '../Button';
// styles
import styles from './styles.module.scss';

interface IProps extends IBaseUIProps {
  value: number;
  min?: number;
  max?: number;
  step?: number;
}

const Counter = ({
  value = 0,
  min = 0,
  max = Infinity,
  step = 1,
  onChange,
}: IProps) => {
  const onRemove = () => {
    if (onChange && value > min) {
      onChange(value - step);
    }
  };

  const onAdd = () => {
    if (onChange && value < max) {
      onChange(value + step);
    }
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    if (Number.isNaN(val)) return;
    if (val < min || val > max) return;

    if (onChange) onChange(val);
  };

  return (
    <NoSsr>
      <div className={styles.container}>
        <Button
          clean
          classes={{ root: styles.btn }}
          icon={<Remove />}
          disabled={value <= min}
          onClick={onRemove}
        />
        <TextField
          classes={{ root: styles.inputRoot }}
          value={value}
          inputMode="numeric"
          onChange={onInputChange}
        />
        <Button
          clean
          classes={{ root: styles.btn }}
          icon={<Add />}
          disabled={value >= max}
          onClick={onAdd}
        />
      </div>
    </NoSsr>
  );
};

export default Counter;
