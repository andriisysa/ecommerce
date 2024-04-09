import React from 'react';
import cn from 'classnames';

import Button from '../Button';
import styles from './styles.module.scss';
import { ITagListItemProps } from './Tag.types';

const TagItem = (props: ITagListItemProps) => {
  const { item, active, onClick } = props;
  const { label } = item;

  return (
    <div className={styles.itemWrapper}>
      <Button
        text={label}
        classes={{
          root: cn(styles.btnHalfCircle, { [styles.active]: active }),
        }}
        onClick={onClick}
      />
    </div>
  );
};

export default TagItem;
