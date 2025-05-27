export type FeaturePageHeaderProps = {
  title: string;
  showAction: boolean;
  addActionName?: string;
  addNewAction?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};
