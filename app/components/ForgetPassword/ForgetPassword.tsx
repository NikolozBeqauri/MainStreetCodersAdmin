import { useState } from 'react';
import { useForm } from 'react-hook-form';
import ReusableButton from '../ReusableButton/ReusableButton';
import styles from './ForgetPassword.module.scss';

type FormData = {
  email: string;
};

export const ForgetPassword = () => {
  const [isVisible, setIsVisible] = useState(true);
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  const handleBackgroundClick = () => {
    setIsVisible(false);
  };

  if (!isVisible) {
    return;
  }

  return (
    <div className={styles.background} onClick={handleBackgroundClick}>
      <div className={styles.wrapper} onClick={e => e.stopPropagation()}>
        <h2>Forgot Password</h2>
        <form className={styles.formWrapper} onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="email">Enter your email address</label>
          <input
            type="text"
            id="email"
            {...register('email', {
              required: 'Email is required',

            })}
          />
          {errors.email && <p className={styles.error}>{errors.email.message}</p>}
          <ReusableButton title={'Continue'} />
        </form>
      </div>
    </div>
  );
};
