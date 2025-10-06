import { pdfjs } from 'react-pdf'
import 'react-pdf/dist/esm/Page/TextLayer.css'
import { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import IconDelete from '../../../../../../../../assets/icons/icon-delete.svg?react'
import { PayslipsStateContext } from '../../../../../state/PayslipsStateContext'
import { InfoTip } from '../../../../../../../../components/InfoTip/InfoTip'
import IconQuestionMark from '../../../../../../../../assets/icons/question-mark-circle.svg?react'
  
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`
  
export const UploadedPayslipCard = observer(({
  fileId,
  name,
  errorMessage,
  lastName,
}: {
  fileId: string,
  name: string,
  errorMessage: string,
  lastName: string,
}) => {
  const payslipsState = useContext(PayslipsStateContext)

  return (
    <div
      className="uploaded-payslip-card"
      data-cy="uploaded-payslip-card"
    >
      <div
        className="uploaded-payslip-card__inner"
        data-cy="uploaded-payslip-card-inner"
      >
        <div
          className="uploaded-payslip-card__header"
          data-cy="uploaded-payslip-card-header"
        >
          <span
            className="uploaded-payslip-card__name"
            data-cy="uploaded-payslip-card-name"
          >
            {lastName}
          </span>
          <div className="uploaded-payslip-card__actions">
            <InfoTip
              icon={(
                <IconQuestionMark
                  width={18}
                  height={18}
                />
              )}
              content={name}
            />
            <button
              type="button"
              className="uploaded-payslip-card__delete"
              data-cy="uploaded-payslip-card-delete"
              disabled={payslipsState.isSent}
              onClick={() => payslipsState.deleteUploadedPayslip(fileId)}
            >
              <IconDelete
                width={18}
                height={18}
                data-cy="uploaded-payslip-card-delete-icon"
              />
            </button>
          </div>
        </div>
        {
          errorMessage && (
            <span
              className="uploaded-payslip-card__error"
              data-cy="uploaded-payslip-card-error"
            >
              {errorMessage}
            </span>
          )
        }
      </div>
    </div>
  )
})
