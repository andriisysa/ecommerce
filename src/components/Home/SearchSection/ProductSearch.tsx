import { Dispatch, SetStateAction, useMemo } from 'react';

import Button from '@/components/common/Button';
import Select from '@/components/common/Select';
import { fType } from '@/types';
import {
  useGetAgeRangesQuery,
  useGetCoursesQuery,
  useGetDatesQuery,
  useGetLocationsQuery,
} from '@/redux/apis/productTags';

import styles from './styles.module.scss';

interface IForm {
  course: string;
  date: string;
  location: string;
  ageRange: string;
}

interface IProductSearchProps {
  form: IForm;
  setForm: Dispatch<SetStateAction<IForm>>;
  onSearch: fType;
}

const ProductSearch = ({ form, setForm, onSearch }: IProductSearchProps) => {
  const { data: courseData, isLoading: isCourseLoading } = useGetCoursesQuery();
  const { data: datesData, isLoading: isDatesLoading } = useGetDatesQuery();
  const { data: locationsData, isLoading: isLocationsLoading } =
    useGetLocationsQuery();
  const { data: ageRangesData, isLoading: isAgeRangesLoading } =
    useGetAgeRangesQuery();

  const courses = useMemo(
    () =>
      courseData?.docs.map((doc) => ({
        label: doc.name,
        value: doc.id,
      })) || [],
    [courseData]
  );

  const dates = useMemo(
    () =>
      datesData?.docs.map((doc) => ({
        label: doc.name,
        value: doc.id,
      })) || [],
    [datesData]
  );

  const locations = useMemo(
    () =>
      locationsData?.docs.map((doc) => ({
        label: doc.name,
        value: doc.id,
      })) || [],
    [locationsData]
  );

  const ageRanges = useMemo(
    () =>
      ageRangesData?.docs.map((doc) => ({
        label: doc.name,
        value: doc.id,
      })) || [],
    [ageRangesData]
  );

  return (
    <div className={styles.content}>
      <Select
        value={form.course}
        items={courses}
        placeholder="Course Types"
        isLoading={isCourseLoading}
        onChange={(value) => {
          setForm((prev) => ({ ...prev, course: value }));
        }}
      />
      <Select
        value={form.date}
        items={dates}
        placeholder="Dates"
        isLoading={isDatesLoading}
        onChange={(value) => {
          setForm((prev) => ({ ...prev, date: value }));
        }}
      />
      <Select
        value={form.location}
        items={locations}
        placeholder="Locations"
        isLoading={isLocationsLoading}
        onChange={(value) => {
          setForm((prev) => ({ ...prev, location: value }));
        }}
      />
      <Select
        value={form.ageRange}
        items={ageRanges}
        placeholder="Age Range"
        isLoading={isAgeRangesLoading}
        onChange={(value) => {
          setForm((prev) => ({ ...prev, ageRange: value }));
        }}
      />
      <Button
        text="Find Course"
        classes={{ root: styles.btnRoot }}
        onClick={onSearch}
      />
    </div>
  );
};

export default ProductSearch;
