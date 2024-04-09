import { useCallback, useEffect, useRef, useState } from 'react';
import cn from 'classnames';

import { IBaseUIProps } from '@/types';

// styles
import styles from './styles.module.scss';

const ScrollContainer = (props: IBaseUIProps) => {
  const {
    children,
    classes: { leftElProps, rightElProps, scrollElemProps } = {},
  } = props;
  const ref = useRef<HTMLDivElement>(null);

  const [overLeft, setOverLeft] = useState(false);
  const [overRight, setOverRight] = useState(false);

  const handleScroll = useCallback(() => {
    const el = ref.current;
    if (el) {
      const scrollWidth = el.scrollWidth;
      const scrollLeft = el.scrollLeft;
      const rect = el.getBoundingClientRect();

      if (scrollLeft > 0) setOverLeft(true);
      else setOverLeft(false);

      if (scrollWidth > Math.round(scrollLeft + rect.width)) setOverRight(true);
      else setOverRight(false);
    }
  }, [ref]);

  useEffect(() => {
    const el = ref.current;
    if (el) {
      handleScroll();
      el.addEventListener('scroll', handleScroll);
      window.addEventListener('resize', handleScroll);
    }

    return () => {
      if (el) {
        el.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleScroll);
      }
    };
  }, [ref, handleScroll]);

  return (
    <div className={styles.container}>
      <div
        className={cn(styles.left, leftElProps, {
          [styles.active]: overLeft,
        })}
      />
      <div
        className={cn(styles.scrollElem, scrollElemProps, {
          [styles.active]: overLeft || overRight,
        })}
        ref={ref}
      >
        {children}
      </div>
      <div
        className={cn(styles.right, rightElProps, {
          [styles.active]: overRight,
        })}
      />
    </div>
  );
};

export default ScrollContainer;
