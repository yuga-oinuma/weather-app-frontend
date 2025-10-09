import React from "react";

type Props = {
  title: string;
  children: React.ReactNode;
};

const ContentBlock: React.FC<Props> = ({ title, children }) => {
  return (
    <section className="mt-4 mb-10">
      <p className="text-lg font-bold text-center my-2">{title}</p>
      {children}
    </section>
  );
};

export default ContentBlock;
