import { useContext, useState } from 'react'
import {Document, Page, pdfjs} from 'react-pdf'
import 'react-pdf/dist/esm/Page/TextLayer.css'
import { TextContent } from 'pdfjs-dist/types/src/display/api'
import { observer } from 'mobx-react-lite'
import { PayslipsStateContext } from '../../../state/PayslipsStateContext'
import { isNotContainLastNameInFileText } from './isNotContainLastNameInFileText'
import { UploadedPayslipCard } from './components/uploaded-payslip-card/UploadedPayslipCard'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

const NON_EXISTING_EMPLOYEE_IN_FILE_NAME_ERROR_MESSAGE = `This file name doesn't contain an existing employee last name`
const NO_EMPLOYEE_LAST_NAME_IN_FILE_ERROR_MESSAGE = `This file doesn't contain the same employee last name as in its file name`
  
export const UploadedPayslip = observer(({
  fileId,
  file,
}: {
  fileId: string,
  file: File,
}) => {
  const [
    errorMessage,
    setErrorMessage,
  ] = useState(``)
  const [
    validationFinish,
    setValidationFinish,
  ] = useState(false)

  const payslipsState = useContext(PayslipsStateContext)

  const nonExistingEmployeeInFileName = payslipsState
    .payslipIdsWithNonExistingEmployeeInFileName
    .includes(fileId)

  const lastName = !nonExistingEmployeeInFileName
    ? payslipsState.payslipIdsEmployeeMap[fileId].lastName
    : ``

  return (
    <>
      {
        !nonExistingEmployeeInFileName && (
          <div style={{
            display: `none`, 
          }}>
            <Document file={file}>
              <Page
                pageNumber={1}
                renderAnnotationLayer={false}
                onGetTextSuccess={validationTextDocument}
              />
            </Document>
          </div>
        )
      }
      {
        nonExistingEmployeeInFileName && (
          <UploadedPayslipCard
            fileId={fileId}
            name={file.name}
            errorMessage={NON_EXISTING_EMPLOYEE_IN_FILE_NAME_ERROR_MESSAGE}
            lastName={lastName}
          />
        )
      }
      {
        validationFinish && (
          <UploadedPayslipCard
            fileId={fileId}
            name={file.name}
            errorMessage={errorMessage}
            lastName={lastName}
          />
        )
      }
    </>
  )

  function validationTextDocument(text: TextContent) {
    if (isNotContainLastNameInFileText(text, lastName)) {
      payslipsState.addNotValidPayslipsId(fileId)
      setErrorMessage(NO_EMPLOYEE_LAST_NAME_IN_FILE_ERROR_MESSAGE)
    }

    setValidationFinish(true)
  }
})
