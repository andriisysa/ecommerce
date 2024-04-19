'use client';

import { useState } from 'react';

import ProductSearch from '../Home/SearchSection/ProductSearch';
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

  return (
    <div className={styles.container}>
      <h1>All Classes</h1>
      <ProductSearch form={form} setForm={setForm} onSearch={() => {}} />
    </div>
  );
};

export default CoursesPage;
