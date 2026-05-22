export const formatDate = (date) => {
  if (!date) return 'Not set';
  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date(date));
};

export const toDateInputValue = (date) => {
  if (!date) return '';
  return new Date(date).toISOString().slice(0, 10);
};

export const isFollowUpSoon = (date) => {
  if (!date) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const followUp = new Date(date);
  followUp.setHours(0, 0, 0, 0);
  const difference = followUp.getTime() - today.getTime();
  const days = difference / (1000 * 60 * 60 * 24);
  return days >= 0 && days <= 3;
};
