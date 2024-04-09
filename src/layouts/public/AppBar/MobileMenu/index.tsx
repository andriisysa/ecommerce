import { MouseEvent } from 'react';

import Menu from '@/components/common/Menu';
import {
  PAGE_CONTACT,
  PAGE_COURSES,
  PAGE_FAQS,
  PAGE_HOME,
  PAGE_LOCATIONS,
} from '@/routes';

import { IMobileMenuProps } from './MobileMenu.types';
import styles from './styles.module.scss';

const MobileMenu = (props: IMobileMenuProps) => {
  const { onMenuSelect, ...rest } = props;

  const onMenuClick = (path: string) => (e: MouseEvent<HTMLDivElement>) => {
    if (e.stopPropagation) e.stopPropagation();

    if (onMenuSelect) onMenuSelect(path);
  };

  return (
    <Menu {...rest} classes={{ menuWrapper: styles.menuWrapper }}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.menuItem} onClick={onMenuClick(PAGE_HOME)}>
            Home
          </div>
          <div className={styles.menuItem} onClick={onMenuClick(PAGE_COURSES)}>
            Courses
          </div>
          <div
            className={styles.menuItem}
            onClick={onMenuClick(PAGE_LOCATIONS)}
          >
            Locations
          </div>
          <div className={styles.menuItem} onClick={onMenuClick(PAGE_FAQS)}>
            FAQs
          </div>
          <div className={styles.menuItem} onClick={onMenuClick(PAGE_CONTACT)}>
            Contact
          </div>
        </div>
      </div>
    </Menu>
  );
};

export default MobileMenu;
