import { useState } from 'react';
import { useRouter } from 'next/navigation';

import ProductSearch from './ProductSearch';
import styles from './styles.module.scss';

const SearchSection = () => {
  const { push } = useRouter();

  const [form, setForm] = useState({
    course: '',
    date: '',
    location: '',
    ageRange: '',
  });

  return (
    <section className={styles.section}>
      <h1>FIND A COURSE THAT IS JUST RIGHT FOR YOU</h1>
      <ProductSearch
        form={form}
        setForm={setForm}
        onSearch={() => {
          push(
            `/courses?course=${form.course}&date=${form.date}&location=${form.location}&ageRange=${form.ageRange}`
          );
        }}
      />
    </section>
  );
};

export default SearchSection;
