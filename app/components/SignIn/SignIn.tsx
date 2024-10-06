'use client'
import { useForm } from "react-hook-form";
import styles from "./SignIn.module.scss"
import axios from "axios";
import { useRouter } from "next/navigation";
import { setCookie } from "@/helpers/cookies";
type FormValues = {
    email: string;
    password: string;
    chackbox: boolean;
};

export const SignIn = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();

    const router = useRouter();

    const onSubmit = (data: any) => {
        axios.post(`https://project-spotify-1.onrender.com/auth/admin/login`, data)
            .then(response => {                
                const dataString = response.config.data;
                const parsedData = JSON.parse(dataString);
                const email = parsedData.email;
                setCookie("token", response.data.access_token, 60);
                localStorage.setItem("email", email);
                router.push("/");
            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.fromWrapper}>
            <input
                placeholder="Email"
                type="email"
                {...register("email", { required: "Email is required" })}
            />
            {errors.email && <span className={styles.errorMessage}>{errors.email.message}</span>}

            <input
                placeholder="Password"
                type="password"
                {...register("password", {
                    required: "Password is required",
                    minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters"
                      },
                      validate: {
                        hasUpperCase: value => /[A-Z]/.test(value) || "Password must contain at least one uppercase letter",
                        hasNumber: value => /\d/.test(value) || "Password must contain at least one number"
                    }
                })}
            />
            {errors.password && <span className={styles.errorMessage}>{errors.password.message}</span>}

            <div className={styles.memoryWrapper}>
                <div className={styles.checkbox}>
                    <input type="checkbox" id="remember" {...register("chackbox")} />
                    <label htmlFor="remember">Remember me</label>
                </div>
                <span className={styles.forgotPassword}>Forgot your password?</span>
            </div>

            <input type="submit" value="Sign In" />
        </form>
    ); 
};
