import React, { useState } from 'react';
import Image from 'next/image';

import Accordion from '../Accordion';
import Modal from '../Modal';
import { IQaImageProps, IQaProps } from './Qa.types';
import QaLoadingItem from './QaLoadingItem';
// styles
import styles from './styles.module.scss';

const QaImage = ({ url }: IQaImageProps) => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <div className={styles.image} onClick={() => setOpenModal(true)}>
        <Image
          src={url}
          fill
          style={{
            objectFit: 'cover',
          }}
          alt=""
          sizes="50vw"
        />
      </div>
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        clean
        size="large"
      >
        <div className={styles.modalImage}>
          <Image
            src={url}
            fill
            style={{
              objectFit: 'cover',
            }}
            alt=""
            sizes="50vw"
          />
        </div>
      </Modal>
    </>
  );
};

const Qa = ({ qas, loading = false }: IQaProps) => {
  const [activeId, setActiveId] = useState('');
  const handleAccordion = (id: string, isExpanded: boolean) => {
    if (isExpanded) setActiveId(id);
    else setActiveId('');
  };

  return (
    <div className={styles.content}>
      {!loading
        ? (qas || []).map(({ id, question, answer, image }) => (
            <Accordion
              key={id}
              title={question}
              expanded={activeId === id}
              onChange={(_, expanded: boolean) => handleAccordion(id, expanded)}
            >
              {image ? (
                <div className={styles.answerContent}>
                  <QaImage url={image.url} />
                  <div
                    dangerouslySetInnerHTML={{ __html: answer }}
                    className={styles.answer}
                  />
                </div>
              ) : (
                <div
                  dangerouslySetInnerHTML={{ __html: answer }}
                  className={styles.answer}
                />
              )}
            </Accordion>
          ))
        : [0, 1, 2].map((key) => <QaLoadingItem key={key} />)}
    </div>
  );
};

export default Qa;
