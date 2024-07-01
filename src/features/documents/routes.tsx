import { ReactComponent as IconDocuments } from '../../assets/icons/icon-documents.svg';
import { ReactComponent as IconDocumentsActive } from '../../assets/icons/icon-documents-active.svg';
import { UploadingPayslipsPage } from './UploadingPayslipsPage';

// TODO figure out how to make custom breadcrumbs for nested routers
export const documentsRoutes = [
  {
    path: '/',
    breadcrumb: 'Payslips',
    Component: UploadingPayslipsPage,
  },
];

export const documentsSidebarRoutes = [
  {
    path: '/documents',
    label: 'Documents',
    icon: <IconDocuments />,
    iconActive: <IconDocumentsActive />,
  },
];
