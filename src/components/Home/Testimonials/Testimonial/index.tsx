// styles
import Video from '@/components/common/Video';
import { IHomeTestimonialsItem } from '@/types/staticPages.types';

import styles from './styles.module.scss';

interface IProps {
  testimonial?: IHomeTestimonialsItem;
}

const Testimonial = ({ testimonial }: IProps) => {
  return (
    <div className={styles.content}>
      <div className={styles.player}>
        {testimonial?.videoUrl && <Video url={testimonial.videoUrl} />}
      </div>
      <div className={styles.description}>
        <div className={styles.description_content}>
          <p dangerouslySetInnerHTML={{ __html: String(testimonial?.quote) }} />
          <span>{testimonial?.parent}</span>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
