import { BarChart3, BriefcaseBusiness, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from './Button';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: BarChart3 },
  { to: '/applications', label: 'Applications', icon: BriefcaseBusiness }
];

const AppLayout = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const nav = (
    <nav className="mt-8 space-y-1">
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-md px-3 py-2 text-sm font-semibold transition ${
                isActive ? 'bg-brand text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-ink'
              }`
            }
          >
            <Icon size={18} />
            {item.label}
          </NavLink>
        );
      })}
    </nav>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-slate-200 bg-white px-4 py-6 lg:block">
        <div className="text-2xl font-black tracking-tight text-ink">DevTrackr</div>
        <p className="mt-1 text-sm text-slate-500">Smart job tracker</p>
        {nav}
        <div className="absolute bottom-6 left-4 right-4">
          <div className="mb-3 rounded-md bg-slate-50 p-3">
            <p className="truncate text-sm font-semibold text-ink">{user?.name}</p>
            <p className="truncate text-xs text-slate-500">{user?.email}</p>
          </div>
          <Button variant="secondary" className="w-full justify-start" onClick={logout}>
            <LogOut size={16} />
            Logout
          </Button>
        </div>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur lg:hidden">
          <div className="flex items-center justify-between">
            <div className="text-xl font-black tracking-tight text-ink">DevTrackr</div>
            <Button variant="ghost" className="h-10 w-10 p-0" onClick={() => setIsOpen(true)} aria-label="Open menu">
              <Menu size={20} />
            </Button>
          </div>
        </header>

        {isOpen ? (
          <div className="fixed inset-0 z-30 lg:hidden">
            <button
              className="absolute inset-0 bg-ink/30"
              onClick={() => setIsOpen(false)}
              aria-label="Close menu overlay"
            />
            <aside className="relative h-full w-72 bg-white px-4 py-6 shadow-soft">
              <div className="flex items-center justify-between">
                <div className="text-2xl font-black tracking-tight text-ink">DevTrackr</div>
                <Button variant="ghost" className="h-10 w-10 p-0" onClick={() => setIsOpen(false)} aria-label="Close menu">
                  <X size={20} />
                </Button>
              </div>
              {nav}
              <Button variant="secondary" className="mt-8 w-full justify-start" onClick={logout}>
                <LogOut size={16} />
                Logout
              </Button>
            </aside>
          </div>
        ) : null}

        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
