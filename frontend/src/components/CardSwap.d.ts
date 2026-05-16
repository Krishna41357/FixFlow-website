import { ReactNode, RefObject } from 'react';

export interface CardProps {
  customClass?: string;
  className?: string;
  children?: ReactNode;
  ref?: RefObject<HTMLDivElement>;
}

export const Card: React.ForwardRefExoticComponent<
  CardProps & React.RefAttributes<HTMLDivElement>
>;

export interface CardSwapProps {
  width?: string | number;
  height?: string | number;
  cardDistance?: number;
  verticalDistance?: number;
  delay?: number;
  pauseOnHover?: boolean;
  onCardClick?: (index: number) => void;
  skewAmount?: number;
  easing?: 'elastic' | string;
  children?: ReactNode;
}

declare const CardSwap: React.FC<CardSwapProps>;

export default CardSwap;
