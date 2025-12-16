import { Stagger } from "_internals/Animation";

export type CartDropdownAnimationProps = {
  animated?: boolean;
  delay?: number;
  className?: string;
  children: React.ReactNode;
  maxHeight?: boolean;
};

export const CartDropdownAnimation = ({
  animated = false,
  delay = 0,
  className,
  children,
  maxHeight,
}: CartDropdownAnimationProps) => {
  return animated ? (
    <Stagger
      tabIndex={maxHeight ? -1 : 0}
      open
      delay={delay}
      className={className}
    >
      {children}
    </Stagger>
  ) : (
    <div tabIndex={maxHeight ? -1 : 0} className={className}>
      {children}
    </div>
  );
};
