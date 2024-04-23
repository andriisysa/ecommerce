'use client';

import { Dispatch, SetStateAction } from 'react';

import OutlinedInput from '@/components/common/OutLinedInput';

import styles from './styles.module.scss';

export interface IUserData {
  firstName: string;
  lastName: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  email: string;
  phone: string;
  attendeeName: string;
  attendeeAge: string;
  experience: string;
  orderNote: string;
}

export interface IUserDataError {
  firstName?: string;
  lastName?: string;
  address1?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  email?: string;
  phone?: string;
  attendeeName?: string;
  attendeeAge?: string;
}

interface IProps {
  userData: IUserData;
  setUserData: Dispatch<SetStateAction<IUserData>>;
  errors: IUserDataError;
}

const UserForm = ({ userData, setUserData, errors }: IProps) => {
  const onChange = (name: keyof IUserData, value: string) => {
    setUserData((data) => ({ ...data, [name]: value }));
  };

  return (
    <div className={styles.container}>
      <h5>Billing details</h5>

      <div className={styles.row}>
        <div className={styles.inputsection}>
          <div className={styles.label}>
            <label htmlFor="firstName">First Name *</label>
          </div>
          <OutlinedInput
            name="firstName"
            value={userData.firstName}
            type="text"
            placeholder="First Name"
            onChange={onChange}
            error={errors?.firstName}
          />
        </div>
        <div className={styles.inputsection}>
          <div className={styles.label}>
            <label htmlFor="lastName">Last Name *</label>
          </div>
          <OutlinedInput
            name="lastName"
            value={userData.lastName}
            type="text"
            placeholder="Last Name"
            onChange={onChange}
            error={errors?.lastName}
          />
        </div>
      </div>
      <div className={styles.inputsection}>
        <div className={styles.label}>
          <label htmlFor="address1">Address *</label>
        </div>
        <OutlinedInput
          name="address1"
          value={userData.address1}
          type="text"
          placeholder="Street address"
          onChange={onChange}
          error={errors?.address1}
        />
      </div>
      <div className={styles.inputsection}>
        <div className={styles.label}>
          <label htmlFor="address2">Address</label>
        </div>
        <OutlinedInput
          name="address2"
          value={userData.address2}
          type="text"
          placeholder="Apartment, suite, etc"
          onChange={onChange}
        />
      </div>
      <div className={styles.row}>
        <div className={styles.inputsection}>
          <div className={styles.label}>
            <label htmlFor="city">Toun / City *</label>
          </div>
          <OutlinedInput
            name="city"
            value={userData.city}
            type="text"
            placeholder="Toun / City"
            onChange={onChange}
            error={errors?.city}
          />
        </div>
        <div className={styles.inputsection}>
          <div className={styles.label}>
            <label htmlFor="state">State *</label>
          </div>
          <OutlinedInput
            name="state"
            value={userData.state}
            type="text"
            placeholder="State"
            onChange={onChange}
            error={errors?.state}
          />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.inputsection}>
          <div className={styles.label}>
            <label htmlFor="country">Country *</label>
          </div>
          <OutlinedInput
            name="country"
            value={userData.country}
            type="text"
            placeholder="Country"
            onChange={onChange}
            error={errors?.country}
          />
        </div>
        <div className={styles.inputsection}>
          <div className={styles.label}>
            <label htmlFor="postalCode">Postal Code *</label>
          </div>
          <OutlinedInput
            name="postalCode"
            value={userData.postalCode}
            type="text"
            placeholder="Postal Code"
            onChange={onChange}
            error={errors?.postalCode}
          />
        </div>
      </div>
      <div className={styles.inputsection}>
        <div className={styles.label}>
          <label htmlFor="email">Email Address *</label>
        </div>
        <OutlinedInput
          name="email"
          value={userData.email}
          type="text"
          placeholder="email@example.com"
          onChange={onChange}
          error={errors?.email}
        />
      </div>
      <div className={styles.inputsection}>
        <div className={styles.label}>
          <label htmlFor="attendeeName">Attendee Name *</label>
        </div>
        <OutlinedInput
          name="attendeeName"
          value={userData.attendeeName}
          type="text"
          placeholder="Please add all names here if more than one attending"
          onChange={onChange}
          error={errors?.attendeeName}
        />
      </div>
      <div className={styles.inputsection}>
        <div className={styles.label}>
          <label htmlFor="attendeeAge">Attendee Age *</label>
        </div>
        <OutlinedInput
          name="attendeeAge"
          value={userData.attendeeAge}
          type="text"
          placeholder="Attendee Age"
          onChange={onChange}
          error={errors?.attendeeAge}
        />
      </div>
      <div className={styles.inputsection}>
        <div className={styles.label}>
          <label htmlFor="experience">
            Any relevant playing / coding experience?
          </label>
        </div>
        <OutlinedInput
          name="experience"
          value={userData.experience}
          type="text"
          onChange={onChange}
          multiline
        />
      </div>
    </div>
  );
};

export default UserForm;
