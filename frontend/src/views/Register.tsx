import React from "react";
import Section from "../components/Section";
import RegisterForm from "../components/forms/RegisterForm";

const Register = () => {
  return (
    <Section title={"Create a new account"}>
      <RegisterForm />
    </Section>
  );
};

export default Register;
