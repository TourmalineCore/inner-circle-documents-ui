import IconDocuments from '../../assets/icons/icon-documents.svg?react';
import IconDocumentsActive from '../../assets/icons/icon-documents-active.svg?react';
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
