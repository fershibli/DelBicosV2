import { ProfessionalAvailability } from '@screens/types';

const getWeekDaysFromBitmask = (bitmask: string): string[] => {
  const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  return bitmask
    .split('')
    .map((val, idx) => (val === '1' ? days[idx] : null))
    .filter((day): day is string => day !== null);
};

export const generateAvailableDates = (
  availability: ProfessionalAvailability[],
): { date: string; times: string[] }[] => {
  const result: { date: string; times: string[] }[] = [];
  const now = new Date();
  const next30Days = new Date();
  next30Days.setDate(now.getDate() + 30);

  availability.forEach((avail) => {
    if (!avail.is_available) return;

    const start = parseInt(avail.start_time.split(':')[0]);
    const end = parseInt(avail.end_time.split(':')[0]);
    const times = Array.from(
      { length: end - start },
      (_, i) => `${start + i}:00`,
    );

    if (avail.recurrence_pattern === 'daily') {
      const startDate = avail.start_day ? new Date(avail.start_day) : now;
      const endDate = avail.end_day ? new Date(avail.end_day) : next30Days;

      for (
        let d = new Date(startDate);
        d <= endDate;
        d.setDate(d.getDate() + 1)
      ) {
        result.push({
          date: d.toISOString().split('T')[0],
          times,
        });
      }
    } else if (avail.recurrence_pattern === 'weekly' && avail.days_of_week) {
      const days = getWeekDaysFromBitmask(avail.days_of_week);
      const dayNumbers = days.map((day) =>
        ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].indexOf(day),
      );

      const startDate = avail.start_day ? new Date(avail.start_day) : now;
      const endDate = avail.end_day ? new Date(avail.end_day) : next30Days;

      for (
        let d = new Date(startDate);
        d <= endDate;
        d.setDate(d.getDate() + 1)
      ) {
        if (dayNumbers.includes(d.getDay())) {
          result.push({
            date: d.toISOString().split('T')[0],
            times,
          });
        }
      }
    } else if (
      avail.recurrence_pattern === 'monthly' &&
      avail.start_day_of_month &&
      avail.end_day_of_month
    ) {
      const currentMonth = now.getMonth();
      const currentYear = now.getFullYear();

      for (
        let day = avail.start_day_of_month;
        day <= avail.end_day_of_month;
        day++
      ) {
        const date = new Date(currentYear, currentMonth, day);
        if (date >= now && date <= next30Days) {
          result.push({
            date: date.toISOString().split('T')[0],
            times,
          });
        }
      }
    } else if (
      avail.start_day &&
      (!avail.end_day || avail.start_day === avail.end_day)
    ) {
      result.push({
        date: avail.start_day.split('T')[0],
        times,
      });
    } else if (avail.start_day && avail.end_day) {
      const startDate = new Date(avail.start_day);
      const endDate = new Date(avail.end_day);

      for (
        let d = new Date(startDate);
        d <= endDate;
        d.setDate(d.getDate() + 1)
      ) {
        result.push({
          date: d.toISOString().split('T')[0],
          times,
        });
      }
    }
  });

  return result;
};
