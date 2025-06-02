import { FC } from 'react';

import { FeaturePageHeaderProps } from './feature-title.const';

const FeaturePageHeader: FC<FeaturePageHeaderProps> = ({
  title,
  addActionName,
  addNewAction,
  showAction = false,
}) => {
  return (
    <div className="flex flex-col items-center justify-between gap-2 py-2 md:flex-row">
      <h1 className="text-xl font-bold">{title}</h1>
      {showAction && (
        <button className="btn btn-primary" onClick={addNewAction}>
          {addActionName}
        </button>
      )}
    </div>
  );
};

export default FeaturePageHeader;
