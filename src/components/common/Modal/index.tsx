import * as React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import MuiModal from '@mui/material/Modal';
import classNames from 'classnames';

import Button from '../Button';
import { IModalProps } from './Modal.types';
import styles from './styles.module.scss';

const Modal = (props: IModalProps) => {
  const {
    title,
    text,
    open,
    onClose,
    requesting = false,
    isAcceptable = true,
    acceptButtonText,
    onAccept,
    isCancelable = false,
    cancelbuttonText,
    onCancel,
    children,
    size = 'small',
    isLock = true,
    hideCloseIcon = false,
    clean = false,
    errorMsg,
    classes: {
      root,
      container,
      header,
      textProps,
      footer,
      cancelBtnWrapper,
      cancelBtn,
      acceptBtnWrapper,
      acceptBtn,
      errorProps,
    } = {},
  } = props;

  const handleClose = () => {
    if (!isLock) onClose();
  };

  return (
    <MuiModal
      open={open}
      onClose={handleClose}
      classes={{ root: classNames(styles.root, root) }}
    >
      <div
        className={classNames(styles.container, container, {
          [styles.small]: size === 'small',
          [styles.medium]: size === 'medium',
          [styles.large]: size === 'large',
          [styles.fullScreen]: size === 'fullScreen',
          [styles.clean]: clean,
        })}
      >
        {!clean && (
          <>
            {(!hideCloseIcon || title) && (
              <div className={classNames(styles.header, header)}>
                {title && <h3>{title}</h3>}
                {!hideCloseIcon && (
                  <div className={styles.closeBtnWrapper}>
                    <Button
                      classes={{ root: styles.btnClose }}
                      clean
                      icon={<CloseIcon />}
                      onClick={onClose}
                    />
                  </div>
                )}
              </div>
            )}

            {text && (
              <div className={classNames(styles.text, textProps)}>{text}</div>
            )}
          </>
        )}

        {children}

        {clean ? (
          <Button
            icon={<CloseIcon />}
            classes={{ root: styles.cleanBtn }}
            onClick={onClose}
          />
        ) : (
          (isCancelable || isAcceptable) && (
            <div className={classNames(styles.footer, footer)}>
              {isCancelable && (
                <div
                  className={classNames(
                    styles.cancelBtnWrapper,
                    cancelBtnWrapper
                  )}
                >
                  <Button
                    text={cancelbuttonText || 'Cancel'}
                    onClick={onCancel}
                    disabled={requesting}
                    variant="outlined"
                    classes={{
                      root: classNames(styles.cancelBtn, cancelBtn),
                    }}
                  />
                </div>
              )}
              {isAcceptable && (
                <div
                  className={classNames(
                    styles.acceptBtnWrapper,
                    acceptBtnWrapper
                  )}
                >
                  <Button
                    text={acceptButtonText || 'Ok'}
                    onClick={onAccept}
                    loading={requesting}
                    variant="text"
                    classes={{
                      root: classNames(styles.acceptBtn, acceptBtn),
                    }}
                  />
                </div>
              )}
            </div>
          )
        )}
        {errorMsg && (
          <span className={classNames(styles.error, errorProps)}>
            {errorMsg}
          </span>
        )}
      </div>
    </MuiModal>
  );
};

export default Modal;
