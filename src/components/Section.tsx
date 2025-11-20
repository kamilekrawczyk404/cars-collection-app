import React, { ComponentProps } from "react";

const Section = ({ children }: ComponentProps<"div">) => {
  return (
    <section className={"p-4 w-full"}>
      <div className={"max-w-7xl mx-auto"}>{children}</div>
    </section>
  );
};

export default Section;
