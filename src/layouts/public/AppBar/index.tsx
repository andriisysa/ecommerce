import { useEffect, useRef, useState } from 'react';
import { Route } from 'next';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';
import cn from 'classnames';
import { useDispatch } from 'react-redux';

import Button from '@/components/common/Button';
import { loadCartProducts } from '@/redux/slices/app';
import {
  PAGE_CONTACT,
  PAGE_COURSES,
  PAGE_FAQS,
  PAGE_HOME,
  PAGE_LOCATIONS,
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
  }, []);

  const onMobileMenuSelect = (path?: Route) => {
    setMobileMenuOpen(false);
    if (path) push(path);
  };

  const goToPage = (path?: Route) => {
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
            <div className={styles.logo} onClick={() => goToPage(PAGE_HOME)}>
              <Image
                src={isHomepage && !scrolled ? logoPublicWhite : logoPublic}
                fill
                sizes="10vw"
                alt=""
              />
            </div>
          </div>

          <div className={styles.menuWrapper}>
            <Button
              classes={{
                root: cn(styles.btnMenu),
              }}
              isChild
              disableRipple
              clean
              text="Courses"
              stopPropagation={false}
              onClick={() => goToPage(PAGE_COURSES)}
            />
            <Button
              classes={{ root: styles.btnMenu }}
              isChild
              clean
              disableRipple
              text="Locations"
              stopPropagation={false}
              onClick={() => goToPage(PAGE_LOCATIONS)}
            />
            <Button
              classes={{ root: styles.btnMenu }}
              isChild
              clean
              disableRipple
              text="FAQs"
              stopPropagation={false}
              onClick={() => goToPage(PAGE_FAQS)}
            />
            <Button
              classes={{ root: styles.btnMenu }}
              isChild
              clean
              disableRipple
              text="Contact"
              stopPropagation={false}
              onClick={() => goToPage(PAGE_CONTACT)}
            />
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
