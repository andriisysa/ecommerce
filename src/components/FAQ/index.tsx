'use client';

import { useMemo, useState } from 'react';

import { IFAQSubject } from '@/types/staticPages.types';

import Card from '../common/Card';
import Qa from '../common/Qa';
import TagList from '../common/TagList';
import { ITag } from '../common/TagList/Tag.types';
import styles from './styles.module.scss';

interface IProps {
  faqs: IFAQSubject[];
  tags: ITag[];
}

const FAQPage = ({ faqs, tags }: IProps) => {
  const [activeTag, setActiveTag] = useState<ITag | undefined>(tags[0]);

  const displayQa = useMemo(
    () => (faqs || []).find((faq) => faq.id === activeTag?.value),
    [faqs, activeTag]
  );

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1>Help Center</h1>
        <div className={styles.help}>
          <Card
            classes={{
              wrapper: styles.cardWrapper,
              titleWrapperProps: styles.cardTitleWrapper,
              titleProps: styles.cardTitle,
            }}
            title="How can we help you?"
          >
            <div className={styles.helpContainer}>
              <div className={styles.tagListWrapper}>
                <TagList
                  tags={tags}
                  selected={activeTag}
                  onClick={(tag) => setActiveTag(tag)}
                />
              </div>
              <Qa qas={displayQa?.questions || []} />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
