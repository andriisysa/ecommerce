'use client';

import { Player } from '@lottiefiles/react-lottie-player';
import cn from 'classnames';

// json data
import lottiefiledata from './lottiefileData.json';
import styles from './styles.module.scss';

const Preloader = () => {
  return (
    <div className={cn(styles.container)}>
      <Player autoplay loop src={lottiefiledata} className={styles.player} />
    </div>
  );
};

export default Preloader;
