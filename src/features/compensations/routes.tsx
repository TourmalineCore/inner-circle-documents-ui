import IconCompensations from '../../assets/icons/icon-compensations.svg?react';
import IconCompensationsActive from '../../assets/icons/icon-compensations-active.svg?react';

export function getRouteForCompensations(permission: string) {
  if (permission === 'CanRequestCompensations') {
    return [{
      isWindowRedirectNecessary: true,
      path: '/compensations/my',
      label: 'Compensations',
      icon: <IconCompensations />,
      iconActive: <IconCompensationsActive />,
    }];
  }

  return [{
    isWindowRedirectNecessary: true,
    path: '/compensations/all',
    label: 'Compensations',
    icon: <IconCompensations />,
    iconActive: <IconCompensationsActive />,
  }];
}

export const allCompensationsAccessSidebarRoutes = [
  {
    isWindowRedirectNecessary: true,
    path: '/compensations',
    label: 'Compensations',
    icon: <IconCompensations />,
    iconActive: <IconCompensationsActive />,
    routes: [
      {
        isWindowRedirectNecessary: true,
        path: '/compensations/my',
        label: 'My',
        iconMini: <IconCompensations />,
      },
      {
        isWindowRedirectNecessary: true,
        path: '/compensations/all',
        label: 'All',
        iconMini: <IconCompensations />,
      }],
  },
];
