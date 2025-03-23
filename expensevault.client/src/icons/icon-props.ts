export type IconProps = {
  height?: string;
  width?: string;
  color?: string;
  className?: string;
  fill?: string;
} & React.SVGProps<SVGSVGElement>;

export type SvgIconProps = {
  icon: React.FunctionComponent<IconProps>;
} & IconProps;
