import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';

type Variant = 'solid' | 'outline' | 'outlineLight';

interface BaseProps {
  children: React.ReactNode;
  variant?: Variant;
  withArrow?: boolean;
  className?: string;
}

const base =
'group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 font-sans text-[12px] uppercase tracking-[0.18em] transition-[background-color,color,border-color,transform,box-shadow] duration-[250ms] ease-premium hover:-translate-y-px hover:scale-[1.02] active:translate-y-0 active:scale-[0.985]';

const variants: Record<Variant, string> = {
  solid: 'bg-gold text-white hover:bg-gold-deep hover:shadow-[0_10px_30px_-12px_rgba(181,142,75,0.65)]',
  outline: 'border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-bone',
  outlineLight: 'border border-bone/40 text-bone hover:border-bone hover:bg-bone hover:text-ink-deep'
};

function content(children: React.ReactNode, withArrow?: boolean) {
  return (
    <>
      {children}
      {withArrow &&
      <ArrowRightIcon
        className="h-3.5 w-3.5 transition-transform duration-[250ms] ease-premium group-hover:translate-x-1"
        strokeWidth={1.75} />

      }
    </>);

}

interface ButtonLinkProps extends BaseProps {
  to: string;
}

export function ButtonLink({
  to,
  children,
  variant = 'solid',
  withArrow,
  className = ''
}: ButtonLinkProps) {
  return (
    <Link to={to} className={`${base} ${variants[variant]} ${className}`} data-cursor="hover">
      {content(children, withArrow)}
    </Link>);

}

interface ButtonAnchorProps extends BaseProps {
  href: string;
}

export function ButtonAnchor({
  href,
  children,
  variant = 'solid',
  withArrow,
  className = ''
}: ButtonAnchorProps) {
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noreferrer' : undefined}
      className={`${base} ${variants[variant]} ${className}`} data-cursor="hover">
      
      {content(children, withArrow)}
    </a>);

}

interface ButtonProps extends BaseProps {
  type?: 'button' | 'submit';
  onClick?: () => void;
  disabled?: boolean;
}

export function Button({
  children,
  variant = 'solid',
  withArrow,
  className = '',
  type = 'button',
  onClick,
  disabled
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${className} disabled:pointer-events-none disabled:opacity-50`} data-cursor="hover">
      
      {content(children, withArrow)}
    </button>);

}