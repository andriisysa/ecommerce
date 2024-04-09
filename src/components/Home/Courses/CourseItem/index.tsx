import Image from 'next/image';
import cn from 'classnames';

import { IHomeCourseItem } from '@/types/staticPages.types';

// styles
import styles from './styles.module.scss';

const CourseItem = (props: IHomeCourseItem) => {
  const { name, image } = props;

  return (
    <div className={cn(styles.container)}>
      <div className={cn(styles.image)}>
        <Image src={image.url} alt="image" fill sizes="50vw" />
      </div>

      <span className={cn(styles.subject)}>{name}</span>
    </div>
  );
};

export default CourseItem;
