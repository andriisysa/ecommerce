import { IHomeCoursesData } from '@/types/staticPages.types';

import CourseItem from './CourseItem';
// styles
import styles from './styles.module.scss';

interface IProps {
  data: IHomeCoursesData;
}

const Courses = ({ data }: IProps) => {
  return (
    <section className={styles.container}>
      <div dangerouslySetInnerHTML={{ __html: data.title }} />

      <div className={styles.subjects}>
        {(data.items || []).map((item) => (
          <CourseItem key={item.id} {...item} />
        ))}
      </div>
    </section>
  );
};

export default Courses;
