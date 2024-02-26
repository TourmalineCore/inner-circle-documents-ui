import { ReactComponent as IconProfile } from '../../assets/icons/icon-profile.svg';
import { ReactComponent as IconProfileActive } from '../../assets/icons/icon-profile-active.svg';
import { DocumentsPage } from './DocumentsPage';
import { UploadingDocumentsPage } from './UploadingDocumentsPage';

export const documentsRoutes = [
  {
    path: '/',
    breadcrumb: 'MailingPayslips',
    Component: DocumentsPage,
  },
  {
    path: '/uploading-documents',
    breadcrumb: 'UploadingDocuments',
    Component: UploadingDocumentsPage,
  },
];

export const documentsSidebarRoutes = [
  {
    path: '/documents',
    label: 'Documents',
    icon: <IconProfile />,
    iconActive: <IconProfileActive />,
  },
];
