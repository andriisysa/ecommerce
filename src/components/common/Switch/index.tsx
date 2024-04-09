import * as React from 'react';
import MuiSwitch from '@mui/material/Switch';
import classNames from 'classnames';

import styles from './styles.module.scss';
import { ISwitchProps } from './Switch.types';

const Switch = (props: ISwitchProps) => {
  const {
    label,
    error,
    checked = false,
    disabled,
    onChange,
    classes: { wrapper, switchRoot, labelProps } = {},
  } = props;

  const onSwwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(e.target.checked);
  };

  return (
    <>
      <div className={classNames(styles.wrapper, wrapper)}>
        <MuiSwitch
          disabled={disabled}
          checked={checked}
          classes={{
            root: classNames(styles.root, switchRoot, {
              [styles.disabled]: disabled,
            }),
            switchBase: styles.switchBase,
            thumb: styles.thumb,
            track: styles.track,
            checked: styles.checked,
          }}
          onChange={onSwwitchChange}
        />
        {label && (
          <span className={classNames(styles.label, labelProps)}>{label}</span>
        )}
      </div>
      {error && <span className={styles.error}>{error}</span>}
    </>
  );
};

export default Switch;
