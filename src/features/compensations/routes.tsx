import { ReactComponent as IconAnalytics } from '../../assets/icons/icon-analytics.svg';
import { ReactComponent as IconAnalyticsActive } from '../../assets/icons/icon-analytics-active.svg';

export function getRouteForCompensations(permission: string) {
  if (permission === 'CanRequestCompensations') {
    return [{
      isWindowRedirectNecessary: true,
      path: '/compensations/my',
      label: 'Compensations',
      icon: <IconAnalytics />,
      iconActive: <IconAnalyticsActive />,
    }];
  }

  return [{
    isWindowRedirectNecessary: true,
    path: '/compensations/all',
    label: 'Compensations',
    icon: <IconAnalytics />,
    iconActive: <IconAnalyticsActive />,
  }];
}

export const allCompensationsAccessSidebarRoutes = [
  {
    isWindowRedirectNecessary: true,
    path: '/compensations',
    label: 'Compensations',
    icon: <IconAnalytics />,
    iconActive: <IconAnalyticsActive />,
    routes: [
      {
        isWindowRedirectNecessary: true,
        path: '/compensations/my',
        label: 'My',
        iconMini: <IconAnalytics />,
      },
      {
        isWindowRedirectNecessary: true,
        path: '/compensations/all',
        label: 'All',
        iconMini: <IconAnalytics />,
      }],
  },
];
