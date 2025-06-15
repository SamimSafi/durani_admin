export const formatDateToLocal = (dateString, options = {}) => {
  if (!dateString) return 'N/A'; // Handle missing date

  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Invalid Date'; // Handle invalid date

    return date.toLocaleString('en-US', {
      timeZone: 'Asia/Kabul', // UTC+4:30
      dateStyle: 'medium', // e.g., May 24, 2025
      timeStyle: 'short', // e.g., 10:49 AM
      ...options, // Allow overriding default options
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Invalid Date';
  }
};

export const DescriptionComponent = ({ description = '', maxLength = 100 }) => {
  if (typeof description !== 'string' || description.trim() === '') {
    return <>N/A</>; // or return null;
  }

  const shouldTruncate = description.length > maxLength;
  const displayedText = shouldTruncate
    ? description.substring(0, maxLength) + '...'
    : description;

  return <span>{displayedText}</span>;
};

