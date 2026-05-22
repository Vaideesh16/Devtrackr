import { useEffect, useState } from 'react';
import Button from './Button';
import Input from './Input';
import Select from './Select';
import Textarea from './Textarea';
import { JOB_STATUSES } from '../utils/constants';
import { toDateInputValue } from '../utils/date';

const initialState = {
  companyName: '',
  role: '',
  status: 'Applied',
  dateApplied: toDateInputValue(new Date()),
  followUpDate: '',
  notes: ''
};

const JobForm = ({ job, onSubmit, onCancel, loading }) => {
  const [form, setForm] = useState(initialState);
  const [error, setError] = useState('');

  useEffect(() => {
    if (job) {
      setForm({
        companyName: job.companyName || '',
        role: job.role || '',
        status: job.status || 'Applied',
        dateApplied: toDateInputValue(job.dateApplied),
        followUpDate: toDateInputValue(job.followUpDate),
        notes: job.notes || ''
      });
    } else {
      setForm(initialState);
    }
  }, [job]);

  const handleChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!form.companyName.trim() || !form.role.trim()) {
      setError('Company name and role are required.');
      return;
    }

    if (!form.dateApplied) {
      setError('Date applied is required.');
      return;
    }

    await onSubmit({
      ...form,
      followUpDate: form.followUpDate || null
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error ? <div className="rounded-md bg-red-50 p-3 text-sm font-medium text-red-700">{error}</div> : null}
      <div className="grid gap-4 sm:grid-cols-2">
        <Input label="Company" name="companyName" value={form.companyName} onChange={handleChange} placeholder="Acme Inc" />
        <Input label="Role" name="role" value={form.role} onChange={handleChange} placeholder="Frontend Engineer" />
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <Select label="Status" name="status" value={form.status} onChange={handleChange}>
          {JOB_STATUSES.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </Select>
        <Input label="Date applied" name="dateApplied" type="date" value={form.dateApplied} onChange={handleChange} />
        <Input label="Follow-up date" name="followUpDate" type="date" value={form.followUpDate} onChange={handleChange} />
      </div>
      <Textarea label="Notes" name="notes" value={form.notes} onChange={handleChange} placeholder="Recruiter details, next steps, links..." />
      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Button variant="secondary" onClick={onCancel} disabled={loading}>
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? 'Saving...' : job ? 'Update application' : 'Add application'}
        </Button>
      </div>
    </form>
  );
};

export default JobForm;
