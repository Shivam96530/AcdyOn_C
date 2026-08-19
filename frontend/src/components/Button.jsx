import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className, 
  onClick,
  type = 'button',
  disabled = false,
  ...props 
}) {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-acdyon-black text-white hover:bg-zinc-800 focus:ring-acdyon-black',
    secondary: 'bg-white text-acdyon-black border border-zinc-200 hover:bg-zinc-50 focus:ring-zinc-200',
    outline: 'bg-transparent text-white border border-white/30 hover:bg-white/10 focus:ring-white',
    ghost: 'bg-transparent text-zinc-600 hover:bg-zinc-100 focus:ring-zinc-200'
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-10 py-5 text-xl'
  };
  
  return (
    <button
      type={type}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
