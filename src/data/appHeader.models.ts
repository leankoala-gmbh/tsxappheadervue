interface IBreakPoints {
  [key: string]: {
    [key: string]: number
  }
}

export const breakPoints: IBreakPoints = {
  navigation: {
    default: 1200,
    de: 1000,
    en: 950,
    ru: 1200,
    es: 1200,
    pt: 1200,
    fr: 1100,
    ja: 1050
  },
  userMenu: {
    default: 1450,
    de: 1500,
    ru: 1650,
    es: 1680,
    pt: 1680,
    fr: 1600,
    ja: 1550
  }
}

export const usableLanguages = ['en', 'de', 'es', 'fr', 'it', 'pt', 'ru', 'ja']

export const defaultNavigation = {
  navigation: [
    {
      id: 'servers',
      path: '/servers/overview',
      searchPathRegEx: '^(/server|/metric)',
      application: 'nixstats'
    },
    {
      id: 'websites',
      path: '/domains/overview',
      searchPathRegEx: '^/domain',
      application: 'nixstats'
    },
    {
      id: 'blocklists',
      path: '/n3/blocklists',
      searchPathRegEx: '^/n3/blocklists',
      application: 'foundation',
      events: {
        upsell: {
          action: 'openContentScreen',
          type: 'marketing',
          label: 'Business',
          title: 'youHaveDiscoveredANewFeature',
          contentId: 'customer.360.business.blocklists'
        }
      }
    },
    {
      id: 'fullSiteCheck',
      path: '/n3/crawler/',
      searchPathRegEx: '^/n3/crawler',
      application: 'fullsitecheck',
      events: {
        upsell: {
          action: 'openContentScreen',
          type: 'marketing',
          label: 'Pro',
          title: 'youHaveDiscoveredANewProFeature',
          contentId: 'customer.360.pro.fsc'
        }

      }
    },
    {
      id: 'pages',
      path: '/pages/overview',
      searchPath: '/page',
      application: 'nixstats'
    },
    {
      id: 'alerts',
      path: '/alerts',
      searchPath: '/alert',
      application: 'nixstats'
    }
  ],
  documentation: [
    {
      id: 'changelog',
      icon: 'changelog',
      path: 'https://docs.360monitoring.com/changelog',
      newTab: true
    },
    {
      id: 'documentation',
      icon: 'documentation',
      path: 'https://docs.360monitoring.com',
      newTab: true
    }
  ],
  user: [
    {
      id: 'userInfo',
      type: 'userInfo'
    },
    {
      id: 'profile',
      icon: 'profile',
      path:'/n3/user',
      searchPath: '/n3/user',
      application: 'foundation',
      type: 'link'
    },
    {
      id: 'seperator1',
      type: 'seperator'
    },
    {
      id: 'planName',
      type: 'planName'
    },
    {
      id: 'accountFeatures',
      type: 'accountFeatures'
    },
    {
      id: 'licenseManagement',
      icon: 'licenseManagement',
      path: '/n3/user/license',
      searchPath: '/n3/user/license',
      application: 'foundation',
      type: 'link'
    },
    {
      id: 'seperator2',
      type: 'seperator'
    },
    {
      id: 'apiKeys',
      icon: 'apiKeys',
      path: '/api-keys/list',
      searchPath: '/api-key',
      application: 'nixstats',
      type: 'link',
      events: {
        upsell: {
          action: 'openContentScreen',
          type: 'marketing',
          label: 'icon',
          title: 'youHaveDiscoveredANewFeature',
          contentId: 'customer.360.pro.api-keys'
        }
      }
    },
    {
      id: 'logout',
      icon: 'logout',
      type: 'link'
    }
  ],
  company: [
    {
      id: 'plesk360',
      path: 'https://platform360.io/',
      icon: 'cloud',
      type: 'link'
    },
    {
      id: 'seperator1',
      type: 'seperator'
    },
    {
      id: 'pleskNote',
      type: 'note',
      title: 'Service in Plesk360'
    },
    {
      type: 'link',
      id: 'monitoring',
      path: '/dashboard/overview',
      searchPath: '/dashboard',
      application: 'nixstats',
      icon: 'monitor'
    },
    {
      id: 'placeholder',
      type: 'placeholder'
    },
    {
      id: 'seperator2',
      type: 'seperator'
    },
    {
      type: 'link',
      id: 'feedback',
      path: 'https://pt-research.typeform.com/to/BVtcGgRL',
      icon: 'feedback'
    }
  ]
}

