export type TAppModels = 'threeSixtyFSC' | 'threeSixtyNixstats'
export type TIntegration = 'wlServerMonitoring' | 'wlWebsiteMonitoring'

export type TIcons = '360monitoring' | 'plesk360'

export interface IConfigUser {
  email: string
  avatar?: string
  plan: string
  free?: string
  lite?: string
  name?: string
  partnerPlan?: string
  websiteOnly?: string
}

export interface IConfigBreakpoints {
  navigation?: number | {
    default: number
    [key: string]: number
  }
  userMenu?: number | {
    default: number
    [key: string]: number
  }
}
export interface IChangelogUrls {
  changelogUrl: string
  getChangelogs: string
  postChangelog: string
}

export interface IConfigEventPayload {
  [key: string]: unknown
}

export interface IConfigNavigationEvents {
  [key: string]: IConfigEventPayload
}
export type TApplication = 'nixstats' | 'fullsitecheck'
export interface IConfigNavigationDetails {
  id: string
  type?: 'link' | 'note' | 'placeholder' | 'seperator' | 'userInfo' | 'planName' | 'accountFeatures' | 'externalLink'
  title?: string
  icon?: string
  path?: string
  searchPath?: string
  searchPathRegex?: string
  newTab?: boolean | string
  events?: IConfigNavigationEvents
  sendEvent?: IConfigEventPayload
  label?: string
  labelStyle?: string
  isSub?: boolean
  application?: TApplication
  isActive?: boolean
}
export interface IConfigNavigation {
  [key: string]: IConfigNavigationDetails
}

export interface IFlagEvent {
    name: string
    payload?: unknown
}

export interface IFlag {
  [key: string]: {
    [key: string]: {
      [key: string]: boolean | {
        label: string
        labelColor?: string
        event?: string | IFlagEvent
      }
    }
  }
}

