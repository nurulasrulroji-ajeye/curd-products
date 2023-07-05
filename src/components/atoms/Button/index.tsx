import clsx from 'clsx';
import { forwardRef } from 'react';

interface ButtonOptions {
  /**
   * Button display variants
   * @default "solid"
   * @type ButtonVariant
   */
  variant?: ButtonVariant;
}

type Ref = HTMLButtonElement;

export type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> &
  ButtonOptions;

type ButtonVariant = 'primary' | 'secondary';

const getVariant = (variant: ButtonVariant) => {
  switch (variant) {
    case 'primary':
      return '';
    case 'secondary':
      return '';
    default:
      return undefined;
  }
};

export const Button = forwardRef<Ref, ButtonProps>((props, ref) => {
  const {
    variant = 'primary',
    type = 'button',
    className,
    children,
    ...rest
  } = props;

  const merged = clsx(
    'shadow-md font-bold transition-colors justify-center items-center py-3 px-6 rounded-xl text-sm',
    getVariant(variant),
    className
  );

  return (
    <button ref={ref} className={merged} {...rest}>
      {children}
    </button>
  );
});

Button.displayName = 'Button';
