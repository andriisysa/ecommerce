import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import cn from 'classnames';

import styles from './styles.module.scss';
import { IVideoProps } from './Video.types';
import VideoModal from './VideoModal';

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

const Video = (props: IVideoProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { url, classes: { wrapper } = {}, ...rest } = props;
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [height, setHeight] = useState(100);

  const handleResize = () => {
    if (ref && ref.current) {
      setHeight((ref.current.clientWidth * 9) / 16);
    }
  };

  useEffect(() => {
    const el = ref.current;
    if (el) {
      handleResize();
      window.addEventListener('resize', handleResize);
    }

    return () => {
      if (el) {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, [ref]);

  return (
    <div
      ref={ref}
      className={cn(styles.container, wrapper)}
      style={{ height: `${height}px` }}
    >
      <ReactPlayer
        // ref={ref}
        url={url}
        width="100%"
        height="100%"
        controls
        {...rest}
        // light
        // playIcon={
        //     <Button
        //         classes={{ root: styles.playBtn }}
        //         icon={<PlayArrowIcon />}
        //     />
        // }
        // onClickPreview={() => {}}
        // config={{
        //     vimeo: {
        //         playerOptions: {
        //             controls: 1,
        //             height: height,
        //             width: "100%"
        //         }
        //     },
        // }}
      />
      {/* <div
                className={styles.mask}
                onClick={() => setVideoModalOpen(true)}
            /> */}

      <VideoModal
        url={url}
        open={videoModalOpen}
        onClose={() => setVideoModalOpen(false)}
      />
    </div>
  );
};

export default Video;
