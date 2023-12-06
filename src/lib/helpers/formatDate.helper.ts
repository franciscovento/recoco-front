function getUTCStringDate(date: Date) {
  return date.toLocaleString('es-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export { getUTCStringDate };
