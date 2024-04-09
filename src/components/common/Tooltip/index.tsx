import * as React from 'react';
import MuiTooltip from '@mui/material/Tooltip';
import cn from 'classnames';

import styles from './styles.module.scss';
import { ITooltipProps } from './Tooltip.types';

const Tooltip = (props: ITooltipProps) => {
  const {
    html,
    icon,
    label,
    placement,
    classes: { iconProps } = {},
    ...rest
  } = props;

  return (
    <>
      <MuiTooltip
        title={<>{html}</>}
        placement={placement}
        classes={{
          tooltip: styles.tooltip,
        }}
        {...rest}
      >
        <div className={cn(styles.iconWrapper, iconProps)}>
          {icon}
          {label && <span>{label}</span>}
        </div>
      </MuiTooltip>
    </>
  );
};

export default Tooltip;
