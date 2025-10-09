import React from "react";

type Props = {
  title: React.ReactNode;
};

const PageSection: React.FC<Props> = ({ title }) => {
  return <h1 className="text-3xl font-bold text-center my-8">{title}</h1>;
};

export default PageSection;
