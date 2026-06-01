import React, { useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {
  addDays,
  endOfMonth,
  format,
  isBefore,
  startOfDay,
  startOfMonth,
  subDays,
} from 'date-fns';
import { ptBR } from 'date-fns/locale';
import colors from '@theme/colors';
import { CalendarDay } from '@screens/types';

interface CalendarGridProps {
  currentMonth: Date;
  selectedDate: string | null;
  onSelectDate: (date: string) => void;
  onChangeMonth: (direction: 'prev' | 'next') => void;
  calendarDays: CalendarDay[];
}

const DAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

const CalendarGrid: React.FC<CalendarGridProps> = ({
  currentMonth,
  selectedDate,
  onSelectDate,
  onChangeMonth,
  calendarDays,
}) => {
  const statusMap = useMemo(
    () => new Map(calendarDays.map((d) => [d.date, d])),
    [calendarDays]
  );

  const days = useMemo(() => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    const startWeekDay = start.getDay();
    const calendarStart = subDays(start, startWeekDay);
    const result: Date[] = [];
    for (let i = 0; i < 42; i++) {
      result.push(addDays(calendarStart, i));
    }
    return result;
  }, [currentMonth]);

  const today = startOfDay(new Date());

  const dynamicStyles = {
    container: {
      backgroundColor: colors.cardBackground,
    },
    arrow: {
      color: colors.textTertiary,
    },
    monthTitle: {
      color: colors.primaryWhite,
    },
    weekDay: {
      color: colors.textSecondary,
    },
    dayText: {
      color: colors.primaryWhite,
    },
    selectedDay: {
      borderColor: colors.primaryGreen
    },
    selectedText: {
      color: colors.primaryGreen,
    },
    pastDayText: {
      color: colors.textTertiary,
    },
    availableBg: colors.secondaryBeige || '#DCFCE7',
    blockedBg: colors.badgeText || '#FEE2E2',
    availableDot: colors.successBackground || '#16A34A',
    blockedDot: colors.warningText || '#DC2626',
  };

  return (
    <View style={[styles.container, dynamicStyles.container]}>
      {/* Cabeçalho do mês */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => onChangeMonth('prev')}>
          <Text style={[styles.arrow, dynamicStyles.arrow]}>←</Text>
        </TouchableOpacity>
        <Text style={[styles.monthTitle, dynamicStyles.monthTitle]}>
          {format(currentMonth, "MMMM 'de' yyyy", { locale: ptBR })}
        </Text>
        <TouchableOpacity onPress={() => onChangeMonth('next')}>
          <Text style={[styles.arrow, dynamicStyles.arrow]}>→</Text>
        </TouchableOpacity>
      </View>

      {/* Dias da semana */}
      <View style={styles.weekHeader}>
        {DAYS.map((day) => (
          <Text key={day} style={[styles.weekDay, dynamicStyles.weekDay]}>
            {day}
          </Text>
        ))}
      </View>

      {/* Grade de dias */}
      <View style={styles.grid}>
        {days.map((date) => {
          const dateStr = format(date, 'yyyy-MM-dd');
          const dayData = statusMap.get(dateStr);
          const isPast = isBefore(date, today);
          const isSelected = selectedDate === dateStr;
          const isCurrentMonth = date.getMonth() === currentMonth.getMonth();

          const dayBgStyle = [];
          if (!isCurrentMonth) dayBgStyle.push(styles.otherMonth);
          if (isPast) dayBgStyle.push(styles.pastDay);
          if (dayData?.status === 'available')
            dayBgStyle.push({ backgroundColor: dynamicStyles.availableBg });
          if (dayData?.status === 'blocked')
            dayBgStyle.push({ backgroundColor: dynamicStyles.blockedBg });
          if (isSelected) dayBgStyle.push(styles.selectedDay, { borderColor: dynamicStyles.selectedDay.borderColor });

          const dayTextStyle = [];
          if (isPast) dayTextStyle.push(dynamicStyles.pastDayText);
          if (isSelected) dayTextStyle.push(dynamicStyles.selectedText);

          return (
            <TouchableOpacity
              key={dateStr}
              disabled={isPast || !isCurrentMonth}
              onPress={() => onSelectDate(dateStr)}
              style={[styles.day, ...dayBgStyle]}
            >
              <Text style={[styles.dayText, dynamicStyles.dayText, ...dayTextStyle]}>
                {format(date, 'd')}
              </Text>
              {dayData?.status === 'available' && (
                <View style={[styles.availableDot, { backgroundColor: dynamicStyles.availableDot }]} />
              )}
              {dayData?.status === 'blocked' && (
                <View style={[styles.blockedDot, { backgroundColor: dynamicStyles.blockedDot }]} />
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 24,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  arrow: {
    fontSize: 28,
    fontWeight: '700',
  },
  monthTitle: {
    fontSize: 22,
    fontWeight: '800',
    textTransform: 'capitalize',
  },
  weekHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  weekDay: {
    flex: 1,
    textAlign: 'center',
    fontWeight: '700',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  day: {
    width: '14.28%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 18,
    marginBottom: 8,
  },
  dayText: {
    fontSize: 16,
    fontWeight: '700',
  },
  selectedDay: {
    borderWidth: 2,
  },
  pastDay: {
    opacity: 0.35,
  },
  otherMonth: {
    opacity: 0.2,
  },
  availableDot: {
    width: 6,
    height: 6,
    borderRadius: 999,
    marginTop: 4,
  },
  blockedDot: {
    width: 6,
    height: 6,
    borderRadius: 999,
    marginTop: 4,
  },
});

export default CalendarGrid;