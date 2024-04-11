import { useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { NoSsr } from '@mui/material';

import Qa from '@/components/common/Qa';
import { IFAQ, IFAQSubject } from '@/types/staticPages.types';
import { PAGE_FAQS } from '@/routes';

import darkSpacemanImg from '~/img/home/dark_spaceman.png';

// styles
import styles from './styles.module.scss';

interface IProps {
  data?: IFAQSubject[];
}

const Faq = ({ data }: IProps) => {
  const qas: IFAQ[] = useMemo(
    () =>
      data ? data.reduce((sum: IFAQ[], s) => [...sum, ...s.questions], []) : [],
    [data]
  );

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h1>FAQ</h1>
        <Link href={PAGE_FAQS}>
          <NoSsr>
            <span className={styles.link}>
              Help Center <ArrowForwardIcon />
            </span>
          </NoSsr>
        </Link>
        <div className={styles.card}>
          <Qa qas={qas.slice(0, 3) || []} loading={!data} />
          <div className={styles.darkSpacemanImg}>
            <Image
              src={darkSpacemanImg}
              alt="darkSpacemanImg"
              style={{
                width: '100%',
                height: 'auto',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;
