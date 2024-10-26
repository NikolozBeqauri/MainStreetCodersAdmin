import { useForm } from 'react-hook-form';
import ReusableButton from '../ReusableButton/ReusableButton';
import styles from './NewPassword.module.scss';
import Cookies from 'js-cookie';
import axios from 'axios';

type FormData = {
  newPassword: string;
  confirmPassword: string;
};

type Props = {
  userId: number;
  onClose: () => void;
};

export const NewPassword = (props: Props) => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm<FormData>();
  const token = Cookies.get("token");

  const onSubmit = (data: FormData) => {
    console.log(`Password changed for user with ID: ${props.userId}`);
    console.log(data);

    axios.patch(`https://project-spotify-1.onrender.com/user/change-password/${props.userId}`, data, {
      headers: {
        "Authorization": `Bearer ${token}`,  
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
    props.onClose();
  };

  return (
    <div className={styles.background} onClick={props.onClose}>
      <div className={styles.wrapper} onClick={(e) => e.stopPropagation()}>
        <h2>Change Password for User ID: {props.userId}</h2>
        <form className={styles.formWrapper} onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="newPassword">Create New Password</label>
          <input
            type="text"
            id="newPassword"
            {...register("newPassword", { 
              required: "New Pawword is required",
              minLength: {
                  value: 8,
                  message: "New Pawword must be at least 8 characters"
              },
              validate: {
                  hasUpperCase: value => /[A-Z]/.test(value) || "New Pawword must contain at least one uppercase letter",
                  hasNumber: value => /\d/.test(value) || "New Pawword must contain at least one number",
                  hasSpecialChar: value => /[!@#$%^&*(),.?":{}|<>]/.test(value) || "password must contain at least one special character (!, @, #)"
              }
          })}
          />
          {errors.newPassword && <p className={styles.error}>{errors.newPassword.message}</p>}

          <label htmlFor="confirmPassword">Confirm Your Password</label>
          <input
            type="text"
            id="confirmPassword"
            {...register('confirmPassword', {
              required: 'Please confirm your password',
              validate: (value) => value === watch('newPassword') || 'Passwords do not match',
            })}
          />
          {errors.confirmPassword && <p className={styles.error}>{errors.confirmPassword.message}</p>}

          <ReusableButton title={'Save'} />
        </form>
      </div>
    </div>
  );
};
