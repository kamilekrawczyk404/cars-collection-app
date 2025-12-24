import React from "react";
import Section from "../components/Section";
import LoginForm from "../components/forms/LoginForm";

const Login = () => {
  return (
    <Section title={"Login to your account"}>
      <LoginForm />
    </Section>
  );
};

export default Login;
