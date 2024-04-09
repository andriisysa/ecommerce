import Image from 'next/image';
import { Carousel } from 'react-responsive-carousel';

import benchImg from '~/img/home/bench.png';

// styles
import styles from './styles.module.scss';

import 'react-responsive-carousel/lib/styles/carousel.min.css';

import { IHomeContentHours } from '@/types/staticPages.types';

interface IProps {
  data: IHomeContentHours;
}

const ContentHours = ({ data }: IProps) => {
  const { title, description, items } = data;
  const renderSides = (items || []).map((item, index) => (
    <div key={index} className={styles.slider}>
      {item.image.url && (
        <Image src={item.image.url} fill sizes="50vw" alt="" />
      )}
      <div className={styles.text}>
        <h1>{item.title}</h1>
      </div>
    </div>
  ));

  return (
    <section className={styles.container}>
      <div className={styles.textSection}>
        <div className={styles.benchImg}>
          <Image src={benchImg.src} alt="benchImg" fill sizes="50vw" />
        </div>

        <div className={styles.content}>
          <h1>{title}</h1>
          <span>{description}</span>
        </div>
      </div>

      <div className={styles.sliderSection}>
        <Carousel
          className={styles.carousel}
          width="100%"
          showStatus={false}
          showArrows={false}
          showThumbs={false}
          autoPlay
          swipeable
          infiniteLoop
          transitionTime={300}
        >
          {renderSides}
        </Carousel>
      </div>
    </section>
  );
};

export default ContentHours;
