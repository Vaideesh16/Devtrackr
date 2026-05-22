const variants = {
  primary: 'bg-brand text-white hover:bg-blue-700',
  secondary: 'bg-white text-ink border border-slate-200 hover:bg-slate-50',
  danger: 'bg-red-600 text-white hover:bg-red-700',
  ghost: 'bg-transparent text-slate-600 hover:bg-slate-100'
};

const Button = ({ children, type = 'button', variant = 'primary', className = '', disabled, ...props }) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`focus-ring inline-flex min-h-10 items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
