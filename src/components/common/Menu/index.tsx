import * as React from 'react';
import Grow from '@mui/material/Grow';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Popper from '@mui/material/Popper';
import cn from 'classnames';

import { IMenuProps } from './Menu.types';
import styles from './styles.module.scss';

const Menu = (props: IMenuProps) => {
  const {
    anchorRef,
    open,
    onClose,
    onMenuSelect,
    placement = 'bottom-end',
    items,
    children,
    classes: { menuWrapper, container, menuProps, iconProps } = {},
  } = props;

  const menuRef = React.useRef<HTMLDivElement>(null);

  const onClick = (e: MouseEvent) => {
    const elm = e.target as Element;
    if (
      anchorRef?.current &&
      (anchorRef.current.contains(elm) ||
        (menuRef && menuRef.current && menuRef.current.contains(elm)))
    )
      return;
    onClose();
  };

  React.useEffect(() => {
    window.addEventListener('click', onClick);

    return () => {
      window.removeEventListener('click', onClick);
    };
  }, []);

  return (
    <Popper
      open={open}
      anchorEl={anchorRef?.current}
      placement={placement}
      ref={menuRef}
      transition
      // disablePortal
      className={cn(styles.popper, menuWrapper)}
    >
      {({ TransitionProps, placement }) => (
        <Grow
          {...TransitionProps}
          style={{
            transformOrigin:
              placement === 'bottom-start' ? 'left top' : 'right top',
          }}
        >
          <MenuList autoFocusItem={open}>
            {children ? (
              children
            ) : (
              <div className={cn(styles.container, container)}>
                {(items || []).map((item) => (
                  <MenuItem
                    key={item.label}
                    onClick={() => {
                      if (onMenuSelect) onMenuSelect(item);
                    }}
                    classes={{
                      root: cn(styles.menuItem, menuProps),
                    }}
                  >
                    {item.icon && (
                      <div className={cn(styles.icon, iconProps)}>
                        {item.icon}
                      </div>
                    )}
                    {item.label}
                  </MenuItem>
                ))}
              </div>
            )}
          </MenuList>
        </Grow>
      )}
    </Popper>
  );
};
export default Menu;
