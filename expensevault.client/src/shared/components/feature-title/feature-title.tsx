import { FC } from 'react';

import { FeatureTitleProps } from './feature-title.const';

const FeatureTitle: FC<FeatureTitleProps> = ({
  title,
  addActionName,
  addNewAction,
}) => {
  return (
    <div className="flex flex-col items-center justify-between gap-2 py-2 md:flex-row">
      <h1 className="text-xl font-bold">{title}</h1>
      <button className="btn btn-primary" onClick={() => addNewAction}>
        {addActionName}
      </button>
    </div>
  );
};

export default FeatureTitle;
