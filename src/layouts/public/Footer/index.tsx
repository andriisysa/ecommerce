import Image from 'next/image';
import Link from 'next/link';

import {
  PAGE_CONTACT,
  PAGE_COURSES,
  PAGE_FAQS,
  PAGE_HOME,
  PAGE_LOCATIONS,
} from '@/routes';

import logoPublic from '~/img/logo-public.png';

import styles from './styles.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          <div className={styles.titleContainer}>
            <h1>Learn with Minecraft</h1>
            <Link href={PAGE_HOME}>
              <div className={styles.logoWrapper}>
                <Image src={logoPublic} alt="logo" fill sizes="10vw" />
              </div>
            </Link>
          </div>
          <div className={styles.navContainer}>
            <div className={styles.navWrapper}>
              <div className={styles.menuWrapper}>
                <p>Menu</p>
                <Link href={PAGE_COURSES}>
                  <span>Courses</span>
                </Link>
                <Link href={PAGE_LOCATIONS}>
                  <span>Locations</span>
                </Link>
                <Link href={PAGE_FAQS}>
                  <span>FAQs</span>
                </Link>
                <Link href={PAGE_CONTACT}>
                  <span>Contact</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.privacyContent}>
          <span>&copy; GameSchool 2022</span>
          <div className={styles.route_group}>
            <Link href={'/'}>
              <span>T&Cs</span>
            </Link>
            <Link href={'/'}>
              <span>Privacy Policy</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
