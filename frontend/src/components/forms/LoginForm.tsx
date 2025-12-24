import React from "react";
import FormSection from "./FormSection";
import CustomInput from "./CustomInput";
import SubmitButton from "./SubmitButton";
import { useForm } from "react-hook-form";
import { userLoginSchema, UserLoginValues } from "../../features/user/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { views } from "../../App";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import CustomToast from "../CustomToast";
import { toast } from "react-hot-toast";

const LoginForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<UserLoginValues>({
    resolver: zodResolver(userLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();

  const { login } = useAuth();

  const onSubmit = async (data: UserLoginValues) => {
    try {
      await login(data);
      toast.custom((t) => (
        <CustomToast
          t={t}
          type={"success"}
          title={"Login was successful"}
          message={"You can now discover your car collection"}
        />
      ));
      navigate(views.Home.path);
    } catch (error) {
      setError("root", {
        message: "Invalid email or password",
      });
      console.log("Invalid credentials", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={"flex flex-col gap-4 max-w-md mx-auto"}
    >
      <FormSection
        className={"justify-center align-center w-full"}
        childrenClassName={"space-y-2"}
      >
        <div className={"text-center max-w-sm"}>
          <h2 className={"text-xl font-semibold"}>Welcome Back!</h2>
          <p className={"text-slate-500 text-sm"}>
            Please, enter your credentials to get access to your cars collection
          </p>
        </div>

        {errors?.root && (
          <span className={"text-red-500 text-sm my-4 inline-block"}>
            {errors.root.message}
          </span>
        )}

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

        <div className={"!mt-4"}>
          <SubmitButton disabled={isSubmitting} className={"!w-full"}>
            Login
          </SubmitButton>
        </div>

        <p className={"text-center text-sm text-slate-500 !mt-4"}>
          Don't have an account?{" "}
          <Link
            className={"underline text-accent font-semibold"}
            to={views.Register.path}
          >
            Create a new one here.
          </Link>
        </p>
      </FormSection>
    </form>
  );
};

export default LoginForm;
