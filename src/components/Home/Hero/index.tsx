import Image from 'next/image';

import Video from '@/components/common/Video';
import { IHomeHeroData } from '@/types/staticPages.types';

import planetWithBlocks from '~/img/home/planet_with_blocks.png';
import planet from '~/img/home/planet.png';
import spaceman from '~/img/home/spaceman.png';

// styles
import styles from './styles.module.scss';

interface IProps {
  data: IHomeHeroData;
}

const Hero = ({ data }: IProps) => {
  const { title, description, videoUrl } = data;

  return (
    <>
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.content}>
            <h1>{title}</h1>
            <span dangerouslySetInnerHTML={{ __html: description }}></span>
          </div>
          <>
            <div className={styles.planetWithBlocks}>
              <Image
                src={planetWithBlocks}
                alt="planetWithBlocks"
                sizes="(max-width: 992px) 50vw, 100vw"
                priority={false}
              />
            </div>
            <div className={styles.planet}>
              <Image
                src={planet}
                alt="planet"
                sizes="(max-width: 992px) 50vw, 100vw"
              />
            </div>
            <div className={styles.spaceman}>
              <Image
                src={spaceman}
                alt="spaceman"
                sizes="(max-width: 992px) 50vw, 100vw"
              />
            </div>
          </>
        </div>
      </section>
      <div className={styles.player}>
        <Video url={videoUrl} classes={{ wrapper: styles.video }} />
        <div className={styles.switch1} />
        <div className={styles.switch2} />
      </div>
    </>
  );
};

export default Hero;
