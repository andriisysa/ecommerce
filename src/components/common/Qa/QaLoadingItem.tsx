import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Skeleton } from '@mui/material';

// styles
import styles from './styles.module.scss';

const QaLoadingItem = () => {
  return (
    <div className={styles.loadingItemContent}>
      <Skeleton
        variant="rectangular"
        animation="wave"
        className={styles.skeleton}
      />
      <ExpandMoreIcon />
    </div>
  );
};

export default QaLoadingItem;
