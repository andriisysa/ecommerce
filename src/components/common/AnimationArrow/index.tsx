import { ElementType, useEffect, useState } from 'react';
import { Stack } from '@mui/material';

import { IBaseUIProps } from '@/types';

interface IAnimationArrow extends IBaseUIProps {
  min: number;
  max: number;
  interval: number;
  Icon: ElementType;
}

const AnimationArrow = ({
  min,
  max,
  interval,
  Icon,
  classes,
}: IAnimationArrow) => {
  const [arrows, setArrows] = useState(min);

  useEffect(() => {
    const i = setInterval(() => {
      setArrows((prev) => (prev === max ? min : prev + 1));
    }, interval);
    return () => {
      clearInterval(i);
    };
  }, [setArrows, min, max, interval]);

  return (
    <Stack direction="row" alignItems="center">
      {Array.from({ length: arrows }, (_, i) => (
        <Icon key={i} className={classes?.icon} />
      ))}
    </Stack>
  );
};

export default AnimationArrow;
