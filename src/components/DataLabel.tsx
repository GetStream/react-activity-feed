import React from 'react';

export type DataLabelProps = {
  data?: string | number;
  label?: string;
};

export const DataLabel = ({
  data = 'data',
  label = 'label',
}: DataLabelProps) => {
  return (
    <div className="raf-data-label">
      <span className="raf-data-label__label">{label}</span>
      <span className="raf-data-label__data">{data}</span>
    </div>
  );
};
