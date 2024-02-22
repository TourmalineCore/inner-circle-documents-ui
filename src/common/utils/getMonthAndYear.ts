import moment from 'moment';

export function getMonthAndYear(date: Date) {
  return moment(date).format('MMMM YYYY');
}
