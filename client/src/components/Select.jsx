const Select = ({ label, error, children, className = '', ...props }) => {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-slate-700">{label}</span>
      <select
        className={`focus-ring w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-ink shadow-sm ${className}`}
        {...props}
      >
        {children}
      </select>
      {error ? <span className="mt-1 block text-xs font-medium text-red-600">{error}</span> : null}
    </label>
  );
};

export default Select;
