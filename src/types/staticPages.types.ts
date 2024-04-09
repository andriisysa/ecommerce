import { IImage } from '.';

// HomePage
export interface IHomeHeroData {
  title: string;
  videoUrl: string;
  description: string;
}

export interface IHomeCourseItem {
  id: string;
  name: string;
  image: IImage;
}

export interface IHomeCoursesData {
  title: string;
  items: IHomeCourseItem[];
}

export interface IHomeContentHoursItem {
  id: string;
  title: string;
  image: IImage;
}

export interface IHomeContentHours {
  title: string;
  description: string;
  items: IHomeContentHoursItem[];
}

export interface IHomeTestimonialsItem {
  id: string;
  quote: string;
  parent: string;
  videoUrl: string;
}

export interface IHomeTestimonials {
  title: string;
  items: IHomeTestimonialsItem[];
}

export interface IHomeReviewItem {
  id: string;
  name: string;
  content: string;
  avatar?: IImage;
}

export interface IHomeReviews {
  title: string;
  items: IHomeReviewItem[];
}

export interface IHomeFunItem {
  id: string;
  title: string;
  description: string;
  image: IImage;
  isLeft: boolean;
}

export interface IHomeFun {
  title: string;
  items: IHomeFunItem[];
}

export interface IHomePageData {
  id: string;
  hero: IHomeHeroData;
  courses: IHomeCoursesData;
  contentHours: IHomeContentHours;
  testimonials: IHomeTestimonials;
  reviews: IHomeReviews;
  funs: IHomeFun;
}
