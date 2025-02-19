import { ChangeEvent, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { PayslipsStateContext } from '../state/PayslipsStateContext';

export const UploaderPayslips = observer(({
  onUploadPayslips,
} : {
  onUploadPayslips: () => unknown,
}) => {
  const payslipsState = useContext(PayslipsStateContext);
  return (
    <label
      className="uploader-payslips"
      data-cy="uploader-payslips"
    >
      <input
        className="uploader-payslips__input"
        onChange={handleChange}
        type="file"
        value=""
        multiple
        accept=".pdf"
      />
      <span
        className="uploader-payslips__text"
        data-cy="uploader-payslips-text"
      >
        Upload payslips!
      </span>
    </label>
  );

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const fileList: File[] = Object.values(event.target.files!);
    payslipsState.addUploadedPayslips(fileList);

    onUploadPayslips();
  }
});
