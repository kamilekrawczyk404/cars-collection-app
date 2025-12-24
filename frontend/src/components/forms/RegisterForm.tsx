import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import CustomToast from "../CustomToast";
import { views } from "../../App";
import FormSection from "./FormSection";
import CustomInput from "./CustomInput";
import {
  userRegisterSchema,
  UserRegisterValues,
} from "../../features/user/schema";
import SubmitButton from "./SubmitButton";

const RegisterForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<UserRegisterValues>({
    resolver: zodResolver(userRegisterSchema),
    defaultValues: {
      userName: "",
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
      bio: "",
    },
  });

  const navigate = useNavigate();

  const { register: registerAccount } = useAuth();

  const onSubmit = async (data: UserRegisterValues) => {
    try {
      if (data.password !== data.confirmPassword) {
        setError("confirmPassword", {
          message: "Passwords do not match",
        });
        return;
      }
      await registerAccount(data);
      toast.custom((t) => (
        <CustomToast
          t={t}
          type={"success"}
          title={"Your account has been created successfully"}
          message={"You can now add your cars to the collection"}
        />
      ));
      navigate(views.Home.path);
    } catch (error) {
      setError("root", {
        message: "Creating an account failed. Please try again.",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={"flex flex-col gap-4 max-w-md mx-auto"}
    >
      <FormSection
        className={"justify-center align-center w-full mx-auto"}
        childrenClassName={"space-y-2"}
      >
        <div className={"text-center max-w-sm"}>
          <h2 className={"text-xl font-semibold"}>Welcome!</h2>
          <p className={"text-slate-500 text-sm"}>
            Fill the form to create a new account
          </p>
        </div>

        {errors?.root && (
          <span className={"text-red-500 text-sm my-4 inline-block"}>
            {errors.root.message}
          </span>
        )}

        <CustomInput
          label={"Username"}
          hasError={!!(errors.userName?.message || errors.root?.message)}
          placeholder={"Enter your username"}
          errorMessage={errors.userName?.message}
          {...register("userName")}
        />

        <CustomInput
          label={"Display name"}
          hasError={!!(errors.displayName?.message || errors.root?.message)}
          placeholder={"Enter your display name"}
          errorMessage={errors.displayName?.message}
          {...register("displayName")}
        />

        <CustomInput
          label={"Bio"}
          hasError={!!(errors.bio?.message || errors.root?.message)}
          placeholder={"Tell us about yourself"}
          errorMessage={errors.bio?.message}
          {...register("bio")}
        />

        <CustomInput
          label={"Email"}
          type={"email"}
          hasError={!!(errors.email?.message || errors.root?.message)}
          placeholder={"Enter your email"}
          errorMessage={errors.email?.message}
          {...register("email")}
        />

        <CustomInput
          label={"Password"}
          type={"password"}
          hasError={!!(errors.email?.message || errors.root?.message)}
          placeholder={"Enter your password"}
          errorMessage={errors.password?.message}
          {...register("password")}
        />

        <CustomInput
          label={"Confirm Password"}
          type={"password"}
          hasError={!!(errors.confirmPassword?.message || errors.root?.message)}
          placeholder={"Confirm your password"}
          errorMessage={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />

        <div className={"!mt-4"}>
          <SubmitButton disabled={isSubmitting} className={"!w-full"}>
            Register
          </SubmitButton>
        </div>

        <p className={"text-center text-sm text-slate-500 !mt-4"}>
          Already have an account?{" "}
          <Link
            className={"underline text-accent font-semibold"}
            to={views.Register.path}
          >
            Login here.
          </Link>
        </p>
      </FormSection>
    </form>
  );
};

export default RegisterForm;
