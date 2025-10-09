import React from "react";

export type TableIndicator<T> = {
  key: keyof T;
  label: string;
  render?: (value: T[keyof T]) => React.ReactNode;
};
