import { Edit, Trash2 } from 'lucide-react';
import Button from './Button';
import StatusBadge from './StatusBadge';
import { formatDate, isFollowUpSoon } from '../utils/date';

const JobTable = ({ jobs, onEdit, onDelete, deletingId }) => {
  if (!jobs.length) {
    return (
      <div className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center">
        <p className="text-lg font-semibold text-ink">No applications found</p>
        <p className="mt-1 text-sm text-slate-500">Add your first job application or adjust your filters.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-bold uppercase text-slate-500">Company</th>
              <th className="px-4 py-3 text-left text-xs font-bold uppercase text-slate-500">Role</th>
              <th className="px-4 py-3 text-left text-xs font-bold uppercase text-slate-500">Status</th>
              <th className="px-4 py-3 text-left text-xs font-bold uppercase text-slate-500">Applied</th>
              <th className="px-4 py-3 text-left text-xs font-bold uppercase text-slate-500">Follow-up</th>
              <th className="px-4 py-3 text-right text-xs font-bold uppercase text-slate-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {jobs.map((job) => {
              const followUpSoon = isFollowUpSoon(job.followUpDate);
              return (
                <tr key={job._id} className={followUpSoon ? 'bg-amber-50/70' : 'bg-white'}>
                  <td className="px-4 py-4">
                    <p className="font-semibold text-ink">{job.companyName}</p>
                    {job.notes ? <p className="mt-1 max-w-xs truncate text-xs text-slate-500">{job.notes}</p> : null}
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-700">{job.role}</td>
                  <td className="px-4 py-4">
                    <StatusBadge status={job.status} />
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-600">{formatDate(job.dateApplied)}</td>
                  <td className="px-4 py-4 text-sm">
                    <span className={followUpSoon ? 'font-bold text-amber-700' : 'text-slate-600'}>
                      {formatDate(job.followUpDate)}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex justify-end gap-2">
                      <Button variant="secondary" className="h-9 w-9 p-0" onClick={() => onEdit(job)} aria-label="Edit application">
                        <Edit size={16} />
                      </Button>
                      <Button
                        variant="danger"
                        className="h-9 w-9 p-0"
                        onClick={() => onDelete(job._id)}
                        disabled={deletingId === job._id}
                        aria-label="Delete application"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JobTable;
