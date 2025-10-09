import React from "react";

type Props = {
  children: React.ReactNode;
};

const PageSection: React.FC<Props> = ({ children }) => {
  return <div className="mx-auto w-full max-w-screen-md pt-16">{children}</div>;
};

export default PageSection;
