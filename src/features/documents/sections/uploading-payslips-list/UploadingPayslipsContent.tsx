import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Button } from '@tourmalinecore/react-tc-ui-kit';
import { ToastContainer } from 'react-toastify';
import { PayslipsStateContext } from '../state/PayslipsStateContext';
import { UploaderPayslips } from '../uploader/UploaderPayslips';
import Preloader from '../../../../components/Preloader/Preloader';
import 'react-toastify/dist/ReactToastify.css';
import { UploadedPayslip } from './components/uploaded-payslip/UploadedPayslip';

export const UploadingPayslipsContent = observer(({
  onSubmit = () => {},
  onUploadPayslips,
}: {
  onSubmit?: () => void,
  onUploadPayslips: () => unknown,
}) => {
  const payslipsState = useContext(PayslipsStateContext);

  const uploadedPayslipsIsEmpty = payslipsState.allUploadedPayslips.length === 0;

  return (
    <>
      <section
        className="uploading-payslips-content"
        data-cy="uploading-payslips-content"
      >
        <div
          className="uploading-payslips-content__header"
          data-cy="uploading-payslips-content-header"
        >
          <Button
            className="uploading-payslips-content__button"
            data-cy="uploading-payslips-content-button"
            disabled={payslipsState.isSendButtonDisabled}
            onClick={() => onSubmit()}
          >
            Send
          </Button>
          <UploaderPayslips onUploadPayslips={onUploadPayslips} />
        </div>
        {!uploadedPayslipsIsEmpty
       && (
         <ul
           className="uploading-payslips-content__list"
           data-cy="uploading-payslips-content-list"
         >
           {
             payslipsState
               .allUploadedPayslips
               .map(({
                 id,
                 file,
               }) => (
                 <li
                   key={id}
                   className="uploading-payslips-content__item"
                   data-cy="uploading-payslips-content-item"
                 >
                   <UploadedPayslip
                     fileId={id}
                     file={file}
                   />
                 </li>
               ))
           }
         </ul>
       )}
      </section>
      <ToastContainer position="top-center" />
      {payslipsState.isSent && <Preloader />}
    </>
  );
});
