import MuiAvatar from '@mui/material/Avatar';
import classNames from 'classnames';

import { capitalize } from '@/utils';

import { IAvartarProps } from './Avatar.type';
// styles
import styles from './styles.module.scss';

const Avatar = (props: IAvartarProps) => {
  const {
    imgUrl,
    firstName,
    lastName,
    name,
    email,
    variant = 'circular',
    icon,
    showName = true,
    classes: { wrapper, avatarRoot, avatarName, iconProps } = {},
  } = props;

  return (
    <div className={classNames(styles.wrapper, wrapper)}>
      {imgUrl ? (
        <MuiAvatar
          alt="Remy Sharp"
          src={imgUrl}
          variant={variant}
          classes={{
            root: classNames(styles.avatarRoot, avatarRoot),
          }}
        />
      ) : name ? (
        <MuiAvatar
          variant={variant}
          classes={{
            root: classNames(styles.avatarRoot, avatarRoot),
          }}
        >
          {name
            .split(' ')
            .slice(0, 2)
            .map((st) => st.charAt(0).toUpperCase())}
        </MuiAvatar>
      ) : firstName ? (
        <MuiAvatar
          variant={variant}
          classes={{
            root: classNames(styles.avatarRoot, avatarRoot),
          }}
        >
          {firstName.charAt(0).toUpperCase()}
          {lastName?.charAt(0).toUpperCase()}
        </MuiAvatar>
      ) : email ? (
        <MuiAvatar
          variant={variant}
          classes={{
            root: classNames(styles.avatarRoot, avatarRoot),
          }}
        >
          {email.charAt(0).toUpperCase()}@
        </MuiAvatar>
      ) : (
        <MuiAvatar
          variant={variant}
          classes={{
            root: classNames(styles.avatarRoot, avatarRoot),
          }}
        >
          GS
        </MuiAvatar>
      )}

      {showName && name && (
        <span className={classNames(styles.avatarName, avatarName)}>
          {capitalize(name)}
        </span>
      )}

      {showName && firstName && (
        <span className={classNames(styles.avatarName, avatarName)}>
          {capitalize(`${firstName} ${lastName}`)}
        </span>
      )}

      <div className={classNames(styles.icon, iconProps)}>{icon}</div>
    </div>
  );
};

export default Avatar;
