import { ReactComponent as IconProfile } from '../../assets/icons/icon-profile.svg';
import { ReactComponent as IconProfileActive } from '../../assets/icons/icon-profile-active.svg';
import { UploadingMailingPayslipsPage } from './UploadingMailingPayslipsPage';

// TODO figure out how to make custom breadcrumbs for nested routers
export const documentsRoutes = [
  {
    path: '/',
    breadcrumb: 'MailingPayslips',
    Component: UploadingMailingPayslipsPage,
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
