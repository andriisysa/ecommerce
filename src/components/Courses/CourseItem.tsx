import React from 'react';
import { Route } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { CardContent } from '@mui/material';

import { IBaseUIProps } from '@/types';
import { IProduct } from '@/types/product.types';

import Button from '../common/Button';
import Card from '../common/Card';
import styles from './styles.module.scss';

interface IProps extends IBaseUIProps {
  product: IProduct;
  baseUrl: string;
}

const CourseItem = ({ product, baseUrl, onClick }: IProps) => {
  const { image, name, description1, slug } = product;

  return (
    <Link href={`${baseUrl}/${slug}` as Route}>
      <div className={styles.cardContainer}>
        <Card
          classes={{
            wrapper: styles.cardWrapper,
          }}
        >
          {image && image.url && (
            <div className={styles.image}>
              <Image
                src={image.url}
                alt={name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          )}

          <Button
            text="Book Now"
            stopPropagation
            classes={{ root: styles.bookNowBtn }}
            onClick={onClick}
          />

          <CardContent classes={{ root: styles.cardContent }}>
            <div>
              <span className={styles.title}>{name}</span>
              <div className={styles.skillWrapper}>
                <p className={styles.skill}>Description:</p>
                <div
                  className={styles.skillContent}
                  dangerouslySetInnerHTML={{ __html: description1 }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Link>
  );
};

export default CourseItem;
