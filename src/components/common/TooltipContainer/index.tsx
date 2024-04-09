import * as React from 'react';
import classNames from 'classnames';

import styles from './styles.module.scss';
import { ITooltipContainerProps } from './TooltipContainer.types';

const TooltipContainer = (props: ITooltipContainerProps) => {
  const {
    text,
    arrow = 'left',
    classes: { content, textProps, arrowProps } = {},
  } = props;

  return (
    <div className={styles.wrapper}>
      <div className={classNames(styles.content, content)}>
        <p
          className={classNames(styles.text, textProps)}
          dangerouslySetInnerHTML={{ __html: text }}
        />
      </div>
      <div
        className={classNames(arrowProps, {
          [styles.arrowTop]: arrow === 'top',
          [styles.arrowBottom]: arrow === 'bottom',
          [styles.arrowLeft]: arrow === 'left',
          [styles.arrowRight]: arrow === 'right',
        })}
      />
    </div>
  );
};

export default TooltipContainer;
