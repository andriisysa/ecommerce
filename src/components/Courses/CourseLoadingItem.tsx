import { CardContent, Skeleton } from '@mui/material';

import Card from '../common/Card';
import styles from './styles.module.scss';

const CourseLoadingItem = () => {
  return (
    <Card
      classes={{
        wrapper: styles.skeletonConatiner,
      }}
    >
      <Skeleton
        variant="rectangular"
        animation="wave"
        className={styles.image}
      />
      <CardContent classes={{ root: styles.cardContent }}>
        <Skeleton
          variant="rectangular"
          animation="wave"
          className={styles.title}
        />
        <div className={styles.skillWrapper}>
          <p className={styles.skill}>Description:</p>
          <Skeleton
            variant="rectangular"
            animation="wave"
            className={styles.skillContent}
          />
          <Skeleton
            variant="rectangular"
            animation="wave"
            className={styles.skillContent}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseLoadingItem;
