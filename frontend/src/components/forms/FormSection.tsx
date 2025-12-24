import React, { ComponentProps } from "react";

type FormSectionProps = ComponentProps<"div"> & { childrenClassName?: string };

const FormSection = ({
  title,
  children,
  childrenClassName = "",
  className = "",
}: FormSectionProps) => {
  return (
    <div className={`bg-slate-100 p-4 rounded-lg space-y-2 ${className}`}>
      {title && <h3 className={"text-xl"}>{title}</h3>}
      <div className={childrenClassName}>{children}</div>
    </div>
  );
};

export default FormSection;
