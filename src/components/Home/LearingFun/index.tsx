import Image from 'next/image';
import cn from 'classnames';

import { IHomeFun } from '@/types/staticPages.types';

import imgGroup_1 from '~/img/home/group-1.png';
import imgGroup_2 from '~/img/home/group-2.png';

// styles
import styles from './styles.module.scss';

interface IProps {
  data: IHomeFun;
}

const LearningFun = ({ data }: IProps) => {
  return (
    <>
      <section className={styles.section}>
        <div
          className={styles.header}
          dangerouslySetInnerHTML={{ __html: data.title }}
        ></div>
      </section>
      {data.items.map(({ id, title, description, isLeft, image }, i) => (
        <section
          key={id}
          className={cn(styles.section, {
            [styles.background]: !isLeft,
          })}
        >
          {isLeft && i % 3 == 2 && (
            <Image
              src={imgGroup_2}
              alt="imgGroup_2"
              width={1944}
              height={179}
            />
          )}
          <div
            className={cn(styles.container, {
              [styles.reverse]: !isLeft,
            })}
          >
            <div className={styles.column}>
              <div className={styles.text}>
                <div
                  className={styles.h2}
                  dangerouslySetInnerHTML={{ __html: title }}
                />
                <div
                  className={styles.p}
                  dangerouslySetInnerHTML={{ __html: description }}
                />
              </div>
            </div>
            <div className={styles.column}>
              <div className={styles.image}>
                <Image
                  src={image.url}
                  alt="image"
                  fill
                  style={{
                    objectFit: 'cover',
                  }}
                  sizes="50vw"
                />
              </div>
            </div>
          </div>
          {isLeft && i % 3 === 0 && (
            <Image
              src={imgGroup_1}
              alt="imgGroup_1"
              width={1944}
              height={179}
            />
          )}
        </section>
      ))}
    </>
  );
};

export default LearningFun;
