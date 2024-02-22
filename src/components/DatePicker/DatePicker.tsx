import {
  HTMLProps, forwardRef,
} from 'react';
import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker';
import logoData from '../../assets/icons/logo-data-picker.svg';
import IconDelete from '../../assets/icons/icon-delete.svg';

const DatePickerCustomElement = forwardRef<HTMLButtonElement, HTMLProps<HTMLButtonElement>>(({ value, onClick }, ref) => (
  <button
    type="button"
    onClick={onClick}
    ref={ref}
    className="date-picker__button"
    data-cy="date-picker-select"
  >
    <img className="date-picker__icon" src={logoData} width="24" height="24" alt="DataPicker" />
    <span data-cy="date-picker-result">{value === '' ? 'Select date' : value}</span>
    <span className="date-picker__arrow">&or;</span>
  </button>
));

export const DatePicker = ({
  selectedDate,
  onChange,
  onClearDate,
  ...otherProps
}:{
  selectedDate: Date | null;
  onChange: (date: Date) => void;
  onClearDate?: (value: null) => void
} & ReactDatePickerProps) => (
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
      {...otherProps}
    />
    {selectedDate !== null && onClearDate && (
      <button
        type="button"
        className="date-picker__delete"
        data-cy="date-picker-delete"
        onClick={() => onClearDate(null)}
      >
        <img
          className="date-picker__delete-icon"
          data-cy="date-picker-delete-icon"
          src={IconDelete}
          width="24"
          height="24"
          alt="DeleteIcon"
        />
      </button>
    ) }
  </div>
);
