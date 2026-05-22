import { STATUS_STYLES } from '../utils/constants';

const StatusBadge = ({ status }) => {
  return (
    <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${STATUS_STYLES[status]}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
