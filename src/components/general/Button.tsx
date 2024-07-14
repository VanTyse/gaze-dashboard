import type { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  variant: keyof typeof VARIANT;
}

// TODO: Refactor button component to handle loading state

const VARIANT = {
  primary: `bg-cas-grey-800 text-black rounded-lg py-2.5 px-[18px] flex justify-center items-center font-semibold active:scale-95 
    transition-all duration-50 border border-cas-primary
    disabled:hover:cursor-not-allowed disabled:bg-cas-grey-border disabled:border-cas-grey-border disabled:text-cas-grey-900 transition-all duration-50`,

  secondary: `bg-cas-primary border border-cas-grey-400 font-semibold text-white rounded-xl py-2.5 px-[18px] flex justify-center items-center 
    active:scale-95 transition-transform duration-50 hover:bg-cas-blue-50 shadow-input 
    disabled:hover:cursor-not-allowed disabled:bg-cas-grey-border disabled:border-cas-grey-border disabled:text-cas-grey-900`,
  neutral: `text-base font-medium text-cas-blue-dark hover:underline 
    disabled:hover:cursor-not-allowed disabled:bg-cas-grey-border disabled:border-cas-grey-border disabled:text-cas-grey-900`,
};

export default function Button({
  children,
  variant,
  className,
  ...props
}: ButtonProps) {
  return (
    <button className={twMerge(VARIANT[variant], className)} {...props}>
      {children}
    </button>
  );
}
