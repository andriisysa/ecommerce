'use client';

import { IHomePageData } from '@/types/staticPages.types';

import ContentHours from './ContentHours';
import Courses from './Courses';
import Hero from './Hero';
import LearningFun from './LearingFun';
import Reviews from './Reviews';
// styles
import styles from './styles.module.scss';
import Testimonials from './Testimonials';

interface IProps {
  data: IHomePageData;
}

const Home = ({ data }: IProps) => {
  return (
    <div className={styles.container}>
      <Hero data={data.hero} />
      <Courses data={data.courses} />
      <ContentHours data={data.contentHours} />
      <Testimonials data={data.testimonials} />
      <LearningFun data={data.funs} />
      <Reviews data={data.reviews} />
      {/*
      <SubscriptionPlans />
      <Faq /> */}
    </div>
  );
};

export default Home;
