import {
  HTMLProps, forwardRef,
} from 'react';
import ReactDatePicker from 'react-datepicker';
import logoData from '../../assets/icons/logo-data-picker.svg';

const DatePickerCustomElement = forwardRef<HTMLButtonElement, HTMLProps<HTMLButtonElement>>(({ value, onClick }, ref) => (
  <button
    type="button"
    onClick={onClick}
    ref={ref}
    className="date-picker__button"
    data-cy="date-picker-select"
  >
    <img className="date-picker__icon" src={logoData} width="24" height="24" alt="DataPicker" />
    <span data-cy="date-picker-result">{value}</span>
    <span className="date-picker__arrow">&or;</span>
  </button>
));

export const DatePicker = ({
  selectedDate,
  onChange,
}:{
  selectedDate: Date;
  onChange: (date: Date) => void;
}) => (
  <div
    className="date-picker"
    data-cy="date-picker"
  >
    <ReactDatePicker
      selected={selectedDate}
      onChange={(date: Date) => onChange(date)}
      showMonthYearPicker
      dateFormat="MMMM yyyy"
      customInput={<DatePickerCustomElement />}
    />
  </div>
);
