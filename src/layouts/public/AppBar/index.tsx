import { useEffect, useRef, useState } from 'react';
import { Route } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import MenuIcon from '@mui/icons-material/Menu';
import { Badge, IconButton } from '@mui/material';
import cn from 'classnames';
import { useDispatch } from 'react-redux';

import useGetCartProducts from '@/hooks/useGetCartProducts';
import { loadCartProducts } from '@/redux/slices/app';
import {
  PAGE_CART,
  PAGE_CONTACT,
  PAGE_COURSES,
  PAGE_FAQS,
  PAGE_HOME,
} from '@/routes';

import logoPublicWhite from '~/img/logo-public-white.png';
import logoPublic from '~/img/logo-public.png';

import MobileMenu from './MobileMenu';
import styles from './styles.module.scss';

const AppBar = () => {
  const { push } = useRouter();
  const pathName = usePathname();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const dispatch = useDispatch();
  const { cartItemCount } = useGetCartProducts();

  const mobileMenuRef = useRef<HTMLButtonElement>(null);

  const isHomepage = pathName === PAGE_HOME;

  const handleScroll = () => {
    setScrolled(window.scrollY >= 80);
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener('scroll', handleScroll);

    dispatch(loadCartProducts());

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [dispatch]);

  const onMobileMenuSelect = (path?: Route) => {
    setMobileMenuOpen(false);
    if (path) push(path);
  };

  return (
    <>
      <div
        className={cn(styles.appbar, {
          [styles.homepage]: isHomepage && !scrolled,
          // [styles.announcement]: announcement,
        })}
      >
        <div className={styles.container}>
          <div className={styles.logoWrapper}>
            <IconButton
              ref={mobileMenuRef}
              classes={{
                root: cn(styles.menuRoot, {
                  [styles.homepage]: isHomepage && !scrolled,
                  [styles.active]: mobileMenuOpen,
                }),
              }}
              onClick={() => setMobileMenuOpen((status) => !status)}
            >
              <MenuIcon />
            </IconButton>
            <Link href={PAGE_HOME}>
              <div className={styles.logo}>
                <Image
                  src={isHomepage && !scrolled ? logoPublicWhite : logoPublic}
                  fill
                  sizes="10vw"
                  alt=""
                />
              </div>
            </Link>
          </div>

          <div className={styles.menuWrapper}>
            <Link href={PAGE_COURSES}>
              <span className={styles.btnMenu}>Courses</span>
            </Link>
            <Link href={PAGE_FAQS}>
              <span className={styles.btnMenu}>FAQs</span>
            </Link>
            <Link href={PAGE_CART}>
              <span className={styles.btnMenu}>
                Cart
                {cartItemCount > 0 && (
                  <Badge badgeContent={cartItemCount} color="secondary">
                    <span style={{ width: 10, height: 5 }} />
                  </Badge>
                )}
              </span>
            </Link>
            <Link href={PAGE_CONTACT}>
              <span className={styles.btnMenu}>Contact</span>
            </Link>
          </div>
        </div>
        <MobileMenu
          anchorRef={mobileMenuRef}
          open={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
          onMenuSelect={onMobileMenuSelect}
          placement="bottom-start"
        />
      </div>
    </>
  );
};

export default AppBar;
