import SearchIcon from '@mui/icons-material/Search';
import { InputBase } from '@mui/material';
import cn from 'classnames';

import { ISearchProps } from './Search.type';
import styles from './styles.module.scss';

const Search = (props: ISearchProps) => {
  const {
    icon,
    placeholder,
    disabled = false,
    onChange,
    classes: { wrapper, textRoot } = {},
  } = props;

  return (
    <div className={cn(styles.wrapper, wrapper)}>
      {icon ? icon : <SearchIcon />}
      <InputBase
        placeholder={placeholder || 'Search…'}
        inputProps={{ 'aria-label': 'search' }}
        disabled={disabled}
        onChange={(e) => onChange && onChange(e.target.value)}
        classes={{
          root: cn(styles.inputBaseRoot, textRoot),
        }}
      />
    </div>
  );
};

export default Search;
