'use client';

import { useEffect, useMemo, useState } from 'react';

import { IProduct } from '@/types/product.types';
import { useLazyGetProductsQuery } from '@/redux/apis/productsApi';
import { PAGE_COURSES } from '@/routes';

import Card from '../common/Card';
import ProductSearch from '../Home/SearchSection/ProductSearch';
import BookNowModal from './BookNowModal';
import CourseItem from './CourseItem';
import CourseLoadingItem from './CourseLoadingItem';
import styles from './styles.module.scss';

interface IProps {
  searchParams: {
    [key: string]: string;
  };
}
const CoursesPage = ({ searchParams }: IProps) => {
  const [form, setForm] = useState({
    course: searchParams.course,
    date: searchParams.date,
    location: searchParams.location,
    ageRange: searchParams.ageRange,
  });
  const [activeProduct, setActiveProduct] = useState<IProduct | undefined>(
    undefined
  );

  const [getProducts, { data, isLoading, isFetching }] =
    useLazyGetProductsQuery();

  useEffect(() => {
    getProducts({
      course: searchParams.course,
      date: searchParams.date,
      location: searchParams.location,
      ageRange: searchParams.ageRange,
    });
  }, [searchParams, getProducts]);

  const onSearch = () => {
    getProducts({
      course: form.course,
      date: form.date,
      location: form.location,
      ageRange: form.ageRange,
    });
  };

  const products = useMemo(() => data?.docs || [], [data]);
  const loading = isLoading || isFetching;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1>All Classes</h1>
        <ProductSearch
          form={form}
          setForm={setForm}
          onSearch={onSearch}
          isSearching={loading}
        />

        <Card classes={{ wrapper: styles.courseList }}>
          <div className={styles.courseContent}>
            {isLoading
              ? [0, 1, 2].map((key) => <CourseLoadingItem key={key} />)
              : (products || []).map((product, index) => (
                  <CourseItem
                    key={index}
                    product={product}
                    baseUrl={PAGE_COURSES}
                    onClick={() => setActiveProduct(product)}
                  />
                ))}
          </div>
        </Card>
      </div>
      <BookNowModal product={activeProduct} setProduct={setActiveProduct} />
    </div>
  );
};

export default CoursesPage;
