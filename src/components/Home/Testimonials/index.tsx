import { useRef, useState } from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import cn from 'classnames';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

import Button from '@/components/common/Button';
import {
  IHomeTestimonials,
  IHomeTestimonialsItem,
} from '@/types/staticPages.types';

// styles
import styles from './styles.module.scss';
import Testimonial from './Testimonial';

interface IProps {
  data: IHomeTestimonials;
}

const Testimonials = ({ data }: IProps) => {
  const ref_step = useRef(null);
  const { title, items: testimonials = [] } = data;

  const [testimonial, setTestimonial] = useState<
    IHomeTestimonialsItem | undefined
  >((testimonials || []).length > 0 ? testimonials[0] : undefined);

  const currentStepNumber = (): number => {
    if (!testimonial) return 0;
    return testimonials.indexOf(testimonial);
  };

  const isFirst = () => {
    return currentStepNumber() === 0;
  };

  const isLast = () => {
    return currentStepNumber() === testimonials.length - 1;
  };

  const next = () => {
    if (isLast()) {
      setStep(0);
      return;
    }
    setStep(currentStepNumber() + 1);
  };

  const prev = () => {
    if (isFirst()) {
      setStep(testimonials.length - 1);
      return;
    }
    setStep(currentStepNumber() - 1);
  };

  const setStep = (id: number) => {
    setTestimonial(testimonials[id]);
  };

  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <h1 dangerouslySetInnerHTML={{ __html: title }} />
        <SwitchTransition mode="out-in">
          <CSSTransition
            classNames="fade"
            key={'' + testimonial?.id}
            nodeRef={ref_step}
            timeout={300}
          >
            <div className={styles.slider} ref={ref_step}>
              <Testimonial testimonial={testimonial} />
            </div>
          </CSSTransition>
        </SwitchTransition>
        <div className={styles.actions}>
          <Button
            icon={<ArrowBackIosNewIcon />}
            classes={{
              root: cn(styles.btnArrowDisable, styles.btnArrowActive, {
                // [styles.btnArrowActive]: !isFirst(),
              }),
            }}
            onClick={prev}
          />
          <Button
            icon={<ArrowForwardIosIcon />}
            classes={{
              root: cn(styles.btnArrowDisable, styles.btnArrowActive, {
                // [styles.btnArrowActive]: !isLast(),
              }),
            }}
            onClick={next}
          />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
