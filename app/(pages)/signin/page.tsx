'use client'

import styles from './page.module.scss';
import { SignIn } from '@/app/components/SignIn/SignIn';

export const SignPage = () => {

    return (
        <div className={styles.startedComponentWrapper}>
            <h2>Sign In</h2>
            <SignIn />
        </div>
    );
}

export default SignPage;
