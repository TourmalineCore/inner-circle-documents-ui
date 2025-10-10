import { useMemo } from 'react'
import { PayslipsStateContext } from './sections/state/PayslipsStateContext'
import { PayslipsState } from './sections/state/PayslipsState'
import { UploadingPayslipsContainer } from './sections/uploading-payslips-list/UploadingPayslipsContainer'

export function UploadingPayslipsPage() {
  const payslipsState = useMemo(
    () => new PayslipsState(),
    [],
  )  

  return (
    <PayslipsStateContext.Provider value={payslipsState}>
      <UploadingPayslipsContainer />
    </PayslipsStateContext.Provider>
  )
}
