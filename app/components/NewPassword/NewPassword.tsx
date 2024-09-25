import { useState } from 'react';
import { useForm } from 'react-hook-form';
import ReusableButton from '../ReusableButton/ReusableButton';
import styles from './NewPassword.module.scss';

type FormData = {
  newPassword: string;
  confirmPassword: string;
};

export const NewPassword = () => {
  const [isVisible, setIsVisible] = useState(true);
  const { register, handleSubmit, formState: { errors }, watch} = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  const handleBackgroundClick = () => {
    setIsVisible(false); 
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className={styles.background} onClick={handleBackgroundClick}>
      <div className={styles.wrapper} onClick={e => e.stopPropagation()}> 
        <h2>New Password</h2>
        <form className={styles.formWrapper} onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="newPassword">Create new Password</label>
          <input
            type="text"
            id="newPassword"
            {...register('newPassword', {
              required: 'New password is required',
            })}
          />
          {errors.newPassword && <p className={styles.error}>{errors.newPassword.message}</p>}

          <label htmlFor="confirmPassword">Confirm your Password</label>
          <input
            type="text"
            id="confirmPassword"
            {...register('confirmPassword', {
              required: 'Please confirm your password',
              validate: value => value === watch('newPassword') || 'Passwords do not match',
            })}
          />
          {errors.confirmPassword && <p className={styles.error}>{errors.confirmPassword.message}</p>}

          <ReusableButton title={'Save'} />
        </form>
      </div>
    </div>
  );
};
