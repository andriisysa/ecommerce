import * as React from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import { NoSsr } from '@mui/material';
import classNames from 'classnames';

import { IButtonProps } from './Button.types';
// styles
import styles from './styles.module.scss';

// eslint-disable-next-line react/display-name
const Button = React.forwardRef(
  (props: IButtonProps, ref?: React.ForwardedRef<HTMLButtonElement>) => {
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const {
      text,
      disableRipple = false,
      loading = false,
      variant = 'contained',
      icon,
      iconPosition = 'end',
      onClick,
      disabled = false,
      file = false,
      acceptFileTypes = [],
      isMulti = false,
      clean = false,
      isChild = false,
      stopPropagation = true,
      onChange,
      classes: { root } = {},
      ...rest
    } = props;

    const onButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (stopPropagation) {
        if (e.preventDefault && !file) e.preventDefault();
        if (e.stopPropagation) e.stopPropagation();
      }

      if (file && fileInputRef.current) {
        fileInputRef.current.click();
        return;
      }

      if (onClick) onClick();
    };

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0 && onChange) {
        onChange(Array.from(e.target.files));
      }
      e.target.value = '';
    };

    return (
      <NoSsr>
        <LoadingButton
          ref={ref}
          loading={loading}
          disableRipple={disableRipple}
          disabled={loading || disabled}
          startIcon={iconPosition === 'start' && icon}
          endIcon={iconPosition === 'end' && icon}
          onClick={onButtonClick}
          style={{ textTransform: 'none' }}
          classes={{
            root: classNames(styles.root, root, {
              [styles.outlined]: variant === 'outlined',
              [styles.outlined_green]: variant === 'text',
              [styles.purple]: variant === 'purple',
              [styles.warning]: variant === 'warning',
              [styles.isChild]: isChild,
              [styles.clean]: clean,
              [styles.disabled]: disabled || loading,
            }),
          }}
          {...rest}
        >
          {text}

          {file && (
            <input
              ref={fileInputRef}
              type="file"
              accept={acceptFileTypes && acceptFileTypes.join(',')}
              multiple={isMulti}
              onChange={onFileChange}
              style={{
                visibility: 'hidden',
                width: 0,
                height: 0,
                position: 'absolute',
              }}
            />
          )}
        </LoadingButton>
      </NoSsr>
    );
  }
);

export default Button;
