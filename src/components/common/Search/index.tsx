import SearchIcon from '@mui/icons-material/Search';
import { InputBase, NoSsr } from '@mui/material';
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
    <NoSsr>
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
    </NoSsr>
  );
};

export default Search;
