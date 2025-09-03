// Google Analytics configuration
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || 'GA_MEASUREMENT_ID';

// Track page views
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

// Track custom events
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Track bar views
export const trackBarView = (barId: string, barName: string) => {
  event({
    action: 'view_bar',
    category: 'engagement',
    label: `${barName} (${barId})`,
  });
};

// Track ranking interactions
export const trackRankingInteraction = (action: string, barId: string) => {
  event({
    action: action,
    category: 'ranking',
    label: barId,
  });
};

// Track search
export const trackSearch = (searchTerm: string, resultsCount: number) => {
  event({
    action: 'search',
    category: 'engagement',
    label: searchTerm,
    value: resultsCount,
  });
};

// Track filter usage
export const trackFilter = (filterType: string, filterValue: string) => {
  event({
    action: 'filter',
    category: 'engagement',
    label: `${filterType}: ${filterValue}`,
  });
};

// Declare gtag function for TypeScript
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event',
      targetId: string,
      config?: Record<string, unknown>
    ) => void;
  }
}
