const mapping: Record<string, string> = {
  'chatbot-settings': 'chatbot_setting',
  'data-sources': 'data_source',
  organizations: 'organization',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
