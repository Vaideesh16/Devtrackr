import { Download, Plus, Search } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import JobForm from '../components/JobForm';
import JobTable from '../components/JobTable';
import Loading from '../components/Loading';
import Modal from '../components/Modal';
import Select from '../components/Select';
import { createJob, deleteJob, getJobs, updateJob } from '../services/jobService';
import { JOB_STATUSES } from '../utils/constants';
import { formatDate } from '../utils/date';

const Applications = () => {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({ search: '', status: '', sortBy: 'dateApplied', order: 'desc' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState('');
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);

  const loadJobs = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getJobs(filters);
      setJobs(data.jobs);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, [filters.status, filters.sortBy, filters.order]);

  const visibleJobs = useMemo(() => {
    const query = filters.search.trim().toLowerCase();
    if (!query) return jobs;
    return jobs.filter((job) => {
      return job.companyName.toLowerCase().includes(query) || job.role.toLowerCase().includes(query);
    });
  }, [filters.search, jobs]);

  const handleFilterChange = (event) => {
    setFilters((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const openCreateModal = () => {
    setEditingJob(null);
    setModalOpen(true);
  };

  const openEditModal = (job) => {
    setEditingJob(job);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingJob(null);
  };

  const handleSubmit = async (payload) => {
    try {
      setSaving(true);
      if (editingJob) {
        await updateJob(editingJob._id, payload);
      } else {
        await createJob(payload);
      }
      closeModal();
      await loadJobs();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Delete this job application?');
    if (!confirmed) return;

    try {
      setDeletingId(id);
      await deleteJob(id);
      setJobs((current) => current.filter((job) => job._id !== id));
    } catch (err) {
      setError(err.message);
    } finally {
      setDeletingId('');
    }
  };

  const exportCsv = () => {
    const headers = ['Company', 'Role', 'Status', 'Date Applied', 'Follow Up Date', 'Notes'];
    const rows = visibleJobs.map((job) => [
      job.companyName,
      job.role,
      job.status,
      formatDate(job.dateApplied),
      formatDate(job.followUpDate),
      job.notes || ''
    ]);
    const csv = [headers, ...rows]
      .map((row) => row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(','))
      .join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'devtrackr-applications.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-ink">Applications</h1>
          <p className="mt-1 text-sm text-slate-500">Manage, filter, and export your job pipeline.</p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button variant="secondary" onClick={exportCsv} disabled={!visibleJobs.length}>
            <Download size={16} />
            Export CSV
          </Button>
          <Button onClick={openCreateModal}>
            <Plus size={16} />
            Add application
          </Button>
        </div>
      </div>

      <section className="grid gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-[1.4fr_0.7fr_0.7fr_0.7fr]">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-9 text-slate-400" size={16} />
          <Input
            label="Search"
            name="search"
            value={filters.search}
            onChange={handleFilterChange}
            placeholder="Company or role"
            className="pl-9"
          />
        </div>
        <Select label="Status" name="status" value={filters.status} onChange={handleFilterChange}>
          <option value="">All statuses</option>
          {JOB_STATUSES.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </Select>
        <Select label="Sort by" name="sortBy" value={filters.sortBy} onChange={handleFilterChange}>
          <option value="dateApplied">Date applied</option>
          <option value="followUpDate">Follow-up date</option>
          <option value="companyName">Company</option>
          <option value="status">Status</option>
        </Select>
        <Select label="Order" name="order" value={filters.order} onChange={handleFilterChange}>
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </Select>
      </section>

      {error ? <div className="rounded-md bg-red-50 p-4 text-sm font-medium text-red-700">{error}</div> : null}
      {loading ? <Loading label="Loading applications" /> : <JobTable jobs={visibleJobs} onEdit={openEditModal} onDelete={handleDelete} deletingId={deletingId} />}

      {modalOpen ? (
        <Modal title={editingJob ? 'Edit application' : 'Add application'} onClose={closeModal}>
          <JobForm job={editingJob} onSubmit={handleSubmit} onCancel={closeModal} loading={saving} />
        </Modal>
      ) : null}
    </div>
  );
};

export default Applications;
