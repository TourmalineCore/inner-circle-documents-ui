import { BreadcrumbComponentProps } from 'use-react-router-breadcrumbs'
import { documentsRoutes } from '../pages/uploading-payslips/routes'

export function getPageRoutes(accessPermissions: Map<any, boolean>) {
  const routes: {
    path: string,
    breadcrumb: string | ((props: BreadcrumbComponentProps) => string | undefined),
    Component: () => JSX.Element,
  }[] = []

  if (accessPermissions.get(`CanManageDocuments`)) {
    routes.push(...documentsRoutes)
  }

  return routes
}
