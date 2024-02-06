/* eslint-disable @typescript-eslint/no-use-before-define */
import {
  HTMLProps, forwardRef, useContext,
} from 'react';
import DatePicker from 'react-datepicker';
import { observer } from 'mobx-react-lite';
import logoData from '../../../../../../assets/icons/logo-data-picker.svg';
import { AllDocumentsStateContext } from '../../state/AllDocumentsStateContext';

const DatePickerAllDocumentsCustomElement = forwardRef<HTMLButtonElement, HTMLProps<HTMLButtonElement>>(({ value, onClick }, ref) => (
  <button
    type="button"
    onClick={onClick}
    ref={ref}
    className="date-picker-documents__button"
    data-cy="date-picker-documents-select"
  >
    <img className="date-picker-documents__icon" src={logoData} width="24" height="24" alt="DataPicker" />
    <span data-cy="date-picker-documents-result">{value}</span>
    <span className="date-picker-documents__arrow">&or;</span>
  </button>
));

export const DatePickerAllDocuments = observer(() => {
  const allDocumentsState = useContext(AllDocumentsStateContext);

  return (
    <div
      className="date-picker-documents"
      data-cy="date-picker-documents"
    >
      <DatePicker
        selected={allDocumentsState.selectedDate}
        onChange={(date: Date) => allDocumentsState.updateDate(date)}
        showMonthYearPicker
        dateFormat="MMMM yyyy"
        customInput={<DatePickerAllDocumentsCustomElement />}
      />
    </div>
  );
});
