import React, { ComponentProps } from "react";

const SubmitButton = ({
  className,
  children,
  ...props
}: ComponentProps<"button">) => {
  return (
    <button
      {...props}
      type={"submit"}
      className={`bg-accent text-gray-100 px-4 h-10 transition-all rounded-md self-start disabled:bg-accent/50 md:w-fit w-full ${className}`}
    >
      {children}
    </button>
  );
};

export default SubmitButton;
