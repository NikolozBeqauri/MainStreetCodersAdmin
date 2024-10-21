"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./SignIn.module.scss";
import axios from "axios";
import { useRouter } from "next/navigation";
import { setCookie } from "@/helpers/cookies";
import { Spin } from "antd";
import Image from 'next/image';

type FormValues = {
    email: string;
    password: string;
    checkbox: boolean;
};

export const SignIn = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
    const router = useRouter();
    const [serverError, setServerError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [passwordHide, setPasswordHide] = useState(true)
    const onSubmit = (data: FormValues) => {
        setServerError(null);
        setLoading(true);
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
                if (error.response && error.response.data) {
                    setServerError(error.response.data.message || "Something went wrong, please try again.");
                } else {
                    setServerError("Network error, please check your connection.");
                }
                console.error(error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.fromWrapper}>
            {loading ? (
                <Spin size="large" />
            ) : (
                <>
                    <input
                        placeholder="Email"
                        type="email"
                        {...register("email", { required: "Email is required" })}
                    />
                    {errors.email && <span className={styles.errorMessage}>{errors.email.message}</span>}

                    <div className={styles.passwordWrapper}>
                        <input
                            placeholder="Password"
                            type={passwordHide ? "password" : "text"}
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
                        {passwordHide ? <Image
                            onClick={() => setPasswordHide(!passwordHide)}
                            src={`/images/passwordHide.png`}
                            alt="password Icon"
                            width={24}
                            height={24}
                        />:<Image
                            onClick={() => setPasswordHide(!passwordHide)}
                            src={`/images/passwordshow.png`}
                            alt="password Icon"
                            width={24}
                            height={24}
                        />}
                    </div>
                    {errors.password && <span className={styles.errorMessage}>{errors.password.message}</span>}

                    <div className={styles.memoryWrapper}>
                        <div className={styles.checkbox}>
                            <input type="checkbox" id="remember" {...register("checkbox")} />
                            <label htmlFor="remember">Remember me</label>
                        </div>
                        <span className={styles.forgotPassword}>Forgot your password?</span>
                    </div>

                    {serverError && <div className={styles.errorMessage}>{serverError}</div>}
                    <input type="submit" value="Sign In" />
                </>
            )}
        </form>
    );
};
