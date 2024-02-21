import {
  HTMLProps, forwardRef,
} from 'react';
import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker';
import logoData from '../../assets/icons/logo-data-picker.svg';
import IconDelet from '../../assets/icons/icon-delete.svg';

const DatePickerCustomElement = forwardRef<HTMLButtonElement, HTMLProps<HTMLButtonElement>>(({ value, onClick }, ref) => (
  <div style={{ display: 'flex', alignItems: 'center' }}>
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
    <button
      type="button"
      className="uploaded-document-card__delete"
      data-cy="uploaded-document-card-delete"
      onClick={() => ''}
    >
      <img
        className="uploaded-document-card__icon"
        data-cy="uploaded-document-card-icon"
        src={IconDelet}
        width="20"
        height="20"
        alt="DeleteIcon"
      />
    </button>
  </div>
));

export const DatePicker = ({
  selectedDate,
  onChange,
  ...otherProps
}:{
  selectedDate: Date;
  onChange: (date: Date) => void;
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
  </div>
);
