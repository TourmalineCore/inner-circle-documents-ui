import { ReactComponent as IconAnalytics } from '../../assets/icons/icon-analytics.svg';
import { ReactComponent as IconAnalyticsActive } from '../../assets/icons/icon-analytics-active.svg';

export const analyticsSidebarRoutes = [
  {
    isWindowRedirectNecessary: true,
    path: '/analytics',
    label: 'Analytics',
    icon: <IconAnalytics />,
    iconActive: <IconAnalyticsActive />,
  },
];
