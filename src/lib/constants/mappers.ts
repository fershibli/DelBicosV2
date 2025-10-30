import { AppointmentStatus } from '@stores/Appointment/types';

export const getAppointmentStatusLabel = (status: AppointmentStatus) => {
  switch (status) {
    case AppointmentStatus.CONFIRMED:
      return 'Confirmado';
    case AppointmentStatus.PENDING:
      return 'Pendente';
    case AppointmentStatus.COMPLETED:
      return 'Concluído';
    case AppointmentStatus.CANCELED:
      return 'Cancelado';
    default:
      return 'undefined';
  }
};
