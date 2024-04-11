import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { NoSsr } from '@mui/material';
import classNames from 'classnames';

import { ICardProps } from './Card.types';
// styles
import styles from './styles.module.scss';

const Card = (props: ICardProps) => {
  const {
    title,
    titleElm,
    children,
    green = false,
    showCheckIcon = true,
    classes: { wrapper, titleWrapperProps, titleProps } = {},
  } = props;

  return (
    <div
      className={classNames(styles.wrapper, wrapper, {
        [styles.green]: green,
      })}
    >
      {title && (
        <div className={classNames(styles.titleWrapper, titleWrapperProps)}>
          <span className={classNames(styles.title, titleProps)}> {title}</span>
        </div>
      )}

      {titleElm}

      {green && showCheckIcon && (
        <div className={styles.greenCheck}>
          <NoSsr>
            <CheckCircleIcon />
          </NoSsr>
        </div>
      )}

      {children}
    </div>
  );
};

export default Card;
