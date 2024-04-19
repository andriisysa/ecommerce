'use client';

import { IFAQData, IHomePageData } from '@/types/staticPages.types';

import ContentHours from './ContentHours';
import Courses from './Courses';
import Faq from './Faq';
import Hero from './Hero';
import LearningFun from './LearingFun';
import Reviews from './Reviews';
import SearchSection from './SearchSection';
// styles
import styles from './styles.module.scss';
import Testimonials from './Testimonials';

interface IProps {
  data: IHomePageData;
  faqData?: IFAQData;
}

const Home = ({ data, faqData }: IProps) => {
  return (
    <div className={styles.container}>
      <Hero data={data.hero} />
      <SearchSection />
      <Courses data={data.courses} />
      <ContentHours data={data.contentHours} />
      <Testimonials data={data.testimonials} />
      <LearningFun data={data.funs} />
      <Reviews data={data.reviews} />
      <Faq data={faqData?.faqs} />
      {/*
      <SubscriptionPlans />
      */}
    </div>
  );
};

export default Home;
