import { UploadingPayslipsPage } from './UploadingPayslipsPage'

const DEFAULT_PATH = `/documents`

// TODO figure out how to make custom breadcrumbs for nested routers
export const documentsRoutes = [
  {
    path: DEFAULT_PATH,
    breadcrumb: `Payslips`,
    Component: UploadingPayslipsPage,
  },
]   