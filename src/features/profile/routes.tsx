import { ReactComponent as IconProfile } from '../../assets/icons/icon-profile.svg';
import { ReactComponent as IconProfileActive } from '../../assets/icons/icon-profile-active.svg';

export const profileSidebarRoutes = [
  {
    isWindowRedirectNecessary: true,
    path: '/profile',
    label: 'Profile',
    icon: <IconProfile />,
    iconActive: <IconProfileActive />,
  },
];
