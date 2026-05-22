import { AlertCircle, BarChart3, BriefcaseBusiness, CalendarClock, Target } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import Loading from '../components/Loading';
import StatusBadge from '../components/StatusBadge';
import SummaryCard from '../components/SummaryCard';
import { getAnalytics, getReminders } from '../services/analyticsService';
import { CHART_COLORS, JOB_STATUSES } from '../utils/constants';
import { formatDate } from '../utils/date';

const Dashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);
        const [analyticsData, reminderData] = await Promise.all([getAnalytics(), getReminders(7)]);
        setAnalytics(analyticsData);
        setReminders(reminderData.reminders);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  const chartData = useMemo(() => {
    if (!analytics) return [];
    return JOB_STATUSES.map((status) => ({
      status,
      count: analytics.applicationsPerStatus[status] || 0
    }));
  }, [analytics]);

  if (loading) {
    return <Loading label="Loading dashboard" />;
  }

  if (error) {
    return <div className="rounded-md bg-red-50 p-4 text-sm font-medium text-red-700">{error}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-ink">Dashboard</h1>
          <p className="mt-1 text-sm text-slate-500">Your application pipeline at a glance.</p>
        </div>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard label="Total applications" value={analytics.totalApplications} icon={BriefcaseBusiness} />
        <SummaryCard label="Response rate" value={`${analytics.responseRate}%`} helper="OA, interviews, and offers" icon={Target} />
        <SummaryCard label="Interview conversion" value={`${analytics.interviewConversionRate}%`} icon={BarChart3} />
        <SummaryCard label="Upcoming reminders" value={reminders.length} helper="Next 7 days" icon={CalendarClock} />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-bold text-ink">Applications by status</h2>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="status" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                  {chartData.map((entry) => (
                    <Cell key={entry.status} fill={CHART_COLORS[entry.status]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="mb-5 text-lg font-bold text-ink">Pipeline mix</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={chartData} dataKey="count" nameKey="status" innerRadius={70} outerRadius={110} paddingAngle={2}>
                  {chartData.map((entry) => (
                    <Cell key={entry.status} fill={CHART_COLORS[entry.status]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {JOB_STATUSES.map((status) => (
              <StatusBadge key={status} status={status} />
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-bold text-ink">Smart insights</h2>
          <div className="mt-4 space-y-3">
            {analytics.insights.length ? (
              analytics.insights.map((insight) => (
                <div key={insight} className="flex gap-3 rounded-md bg-blue-50 p-3 text-sm text-blue-800">
                  <AlertCircle className="mt-0.5 shrink-0" size={16} />
                  <p>{insight}</p>
                </div>
              ))
            ) : (
              <p className="rounded-md bg-slate-50 p-3 text-sm text-slate-600">Your pipeline looks balanced. Keep tracking each update.</p>
            )}
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-bold text-ink">Upcoming follow-ups</h2>
          <div className="mt-4 space-y-3">
            {reminders.length ? (
              reminders.map((job) => (
                <div key={job._id} className="flex items-center justify-between gap-4 rounded-md border border-amber-200 bg-amber-50 p-3">
                  <div>
                    <p className="font-semibold text-ink">{job.companyName}</p>
                    <p className="text-sm text-slate-600">{job.role}</p>
                  </div>
                  <div className="text-right">
                    <StatusBadge status={job.status} />
                    <p className="mt-1 text-xs font-semibold text-amber-700">{formatDate(job.followUpDate)}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="rounded-md bg-slate-50 p-3 text-sm text-slate-600">No follow-ups due in the next 7 days.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
