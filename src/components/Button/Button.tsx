import * as React from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  `inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors p-1
   hover:opacity-80
  focus:outline-none 
  disabled:opacity-50 disabled:pointer-events-none`,
  {
    variants: {
      variant: {
        primary: 'bg-primary text-on-primary',
        secondary: 'bg-secondary text-on-secondary',
        danger: 'bg-danger text-on-accent',
        link: 'bg-transparent text-info',
      },
      size: {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
      },
      block: {
        true: 'w-full',
        false: '',
      },
    },
    defaultVariants: {    
      variant: 'primary',
      size: 'md',
      block: false,
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant,
  size,
  block,
  ...props
}) => {
  return (
    <button className={cn(buttonVariants({ variant, size, block, className }))} {...props}>
      {children}
    </button>
  );
};
