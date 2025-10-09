import React from "react";

type Props = {
  message: string;
};

const Message: React.FC<Props> = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center mt-16 text-sky-400">
      <p className="text-lg font-medium">{message}</p>
    </div>
  );
};

export default Message;
