import dayjs from 'dayjs';
import es from 'dayjs/locale/es';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isToday from 'dayjs/plugin/isToday';
import isYesterday from 'dayjs/plugin/isYesterday';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';

// Extender funcionalidades de dayjs
dayjs.extend(relativeTime);
dayjs.extend(customParseFormat);
dayjs.extend(localizedFormat);
dayjs.extend(isToday);
dayjs.extend(isYesterday);
dayjs.locale(es);

const getNotificationFormatDate = (date: string | Date) => {
  const currentDate = dayjs(date);

  if (currentDate.isToday()) {
    return currentDate.fromNow(); // "hace 1 min", "hace 2 horas", etc.
  }

  if (currentDate.isYesterday()) {
    return `Ayer a las ${currentDate.format('HH:mm')}hs`;
  }

  return `${currentDate.format('D MMM')} a las ${currentDate.format('HH')}hs`;
};

export { getNotificationFormatDate };
