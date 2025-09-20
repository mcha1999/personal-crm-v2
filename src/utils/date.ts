import { format, formatDistanceToNow } from 'date-fns';

export const formatDate = (iso: string | undefined): string => {
  if (!iso) {
    return '';
  }

  try {
    return format(new Date(iso), 'MMM d, yyyy');
  } catch (error) {
    console.warn('Invalid date string', iso, error);
    return iso;
  }
};

export const formatRelativeToNow = (iso: string | undefined): string => {
  if (!iso) {
    return '';
  }

  try {
    return formatDistanceToNow(new Date(iso), { addSuffix: true });
  } catch (error) {
    console.warn('Invalid date string', iso, error);
    return iso;
  }
};
