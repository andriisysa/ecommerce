import CloseIcon from '@mui/icons-material/Close';
import { useMediaQuery } from '@mui/material';
import MuiModal from '@mui/material/Modal';
import ReactPlayer from 'react-player';

import Button from '../../Button';
import styles from './styles.module.scss';
import { IVideoModalProps } from './VideoModal.types';

const VideoModal = ({ url, onClose, open }: IVideoModalProps) => {
  const matches = useMediaQuery('(max-width:767px)');

  const onVideoEnd = () => {
    if (matches && onClose) onClose();
  };

  return (
    <MuiModal
      onClose={onClose}
      open={open}
      classes={{ root: styles.modalRoot }}
    >
      <div className={styles.container}>
        <ReactPlayer
          url={url}
          width="100%"
          height="100%"
          controls
          config={{
            youtube: {
              playerVars: {
                autoplay: 1,
                mute: 1,
                playsInline: 1,
              },
            },
          }}
          onEnded={onVideoEnd}
        />

        <Button
          icon={<CloseIcon />}
          classes={{ root: styles.closeBtn }}
          onClick={onClose}
        />
      </div>
    </MuiModal>
  );
};

export default VideoModal;
