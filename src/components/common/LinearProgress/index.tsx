import * as React from 'react';
import { NoSsr } from '@mui/material';
import MuiLinearProgress from '@mui/material/LinearProgress';
import cn from 'classnames';

import { ILinearProgressProps } from './LinearProgress.types';
import styles from './styles.module.scss';

const LinearProgress = (props: ILinearProgressProps) => {
  const {
    progress,
    total,
    completion,
    showText = true,
    showLabel = true,
    textPostion = 'end',
    classes: {
      container,
      progressWrapper,
      label,
      progressProps,
      barProps,
      text,
    } = {},
  } = props;

  const value =
    progress ||
    (completion && total ? Math.ceil((completion * 100) / total) : 0);

  return (
    <div className={cn(styles.container, container)}>
      <div className={cn(styles.progressWrapper, progressWrapper)}>
        <NoSsr>
          <MuiLinearProgress
            variant="determinate"
            value={value}
            classes={{
              root: cn(styles.progressProps, progressProps),
              bar: cn(styles.bar, barProps, {
                [styles.barComplete]: value === 100,
              }),
            }}
          />
        </NoSsr>
        {value && showLabel && (
          <div className={cn(styles.label, label)}>
            {completion || value} / {total || 100}
          </div>
        )}
      </div>

      {showText && textPostion === 'end' && (
        <span
          className={cn(styles.text, text, {
            [styles.textComplete]: value === 100,
          })}
        >
          {value}%
        </span>
      )}
    </div>
  );
};

export default LinearProgress;
