import { ArrowRight, BriefcaseBusiness } from 'lucide-react';
import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Input from '../components/Input';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!form.email || !form.password) {
      setError('Email and password are required.');
      return;
    }

    try {
      setLoading(true);
      await login(form);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="grid min-h-screen bg-slate-50 lg:grid-cols-[1fr_1.1fr]">
      <section className="flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-md">
          <div className="mb-8 flex items-center gap-3">
            <div className="rounded-md bg-brand p-2 text-white">
              <BriefcaseBusiness size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight text-ink">DevTrackr</h1>
              <p className="text-sm text-slate-500">Track every application with clarity.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-ink">Welcome back</h2>
            <p className="mt-1 text-sm text-slate-500">Log in to review your pipeline.</p>
            {error ? <div className="mt-4 rounded-md bg-red-50 p-3 text-sm font-medium text-red-700">{error}</div> : null}
            <div className="mt-6 space-y-4">
              <Input label="Email" name="email" type="email" value={form.email} onChange={handleChange} autoComplete="email" />
              <Input
                label="Password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                autoComplete="current-password"
              />
            </div>
            <Button type="submit" className="mt-6 w-full" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
              <ArrowRight size={16} />
            </Button>
            <p className="mt-5 text-center text-sm text-slate-500">
              New here?{' '}
              <Link to="/signup" className="font-semibold text-brand hover:underline">
                Create an account
              </Link>
            </p>
          </form>
        </div>
      </section>
      <section className="hidden bg-ink px-10 py-12 text-white lg:block">
        <div className="flex h-full flex-col justify-between rounded-lg border border-white/10 bg-white/5 p-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-200">Pipeline command center</p>
            <p className="mt-6 max-w-xl text-5xl font-black leading-tight">
              Applications, reminders, and signal in one focused workspace.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3 text-sm">
            <div className="rounded-md bg-white/10 p-4">
              <p className="text-3xl font-black">5</p>
              <p className="mt-1 text-slate-300">status stages</p>
            </div>
            <div className="rounded-md bg-white/10 p-4">
              <p className="text-3xl font-black">7d</p>
              <p className="mt-1 text-slate-300">reminder window</p>
            </div>
            <div className="rounded-md bg-white/10 p-4">
              <p className="text-3xl font-black">JWT</p>
              <p className="mt-1 text-slate-300">secure sessions</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Login;
