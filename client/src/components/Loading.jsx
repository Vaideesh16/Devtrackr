const Loading = ({ label = 'Loading' }) => {
  return (
    <div className="flex items-center gap-3 rounded-md border border-slate-200 bg-white p-4 text-sm text-slate-600 shadow-sm">
      <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-200 border-t-brand" />
      <span>{label}</span>
    </div>
  );
};

export default Loading;
