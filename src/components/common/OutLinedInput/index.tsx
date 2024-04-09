import { useState } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { IconButton, InputAdornment } from '@mui/material';
import MuiOutlinedInput from '@mui/material/OutlinedInput';
import cn from 'classnames';

import { IOutLinedInputProps } from './OutlinedInput.types';
// styles
import styles from './styles.module.scss';

const OutlinedInput = (props: IOutLinedInputProps) => {
  const {
    name,
    value,
    type,
    multiline,
    rows = 4,
    placeholder,
    error,
    endAdornment,
    isShowPassword,
    onChange,
    classes: { wrapper, container, errorProps } = {},
    ...rest
  } = props;

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    if (onChange) onChange(name, event.target.value);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    if (event.preventDefault) event.preventDefault();
  };

  return (
    <div className={cn(styles.container, container)}>
      <MuiOutlinedInput
        name={name}
        type={isShowPassword || showPassword ? 'text' : type}
        value={value}
        onChange={handleChange}
        endAdornment={
          endAdornment ? (
            endAdornment
          ) : type === 'password' ? (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
                {...rest}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ) : null
        }
        placeholder={placeholder}
        classes={{
          root: cn(styles.wrapper, wrapper, { [styles.multiline]: multiline }),
          error: styles.muiError,
          notchedOutline: styles.notchedOutline,
        }}
        error={!!error}
        rows={rows}
        multiline={multiline}
        {...rest}
      />
      {error && <span className={cn(styles.error, errorProps)}>{error}</span>}
    </div>
  );
};

export default OutlinedInput;
