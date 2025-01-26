# 360 AppHeader
A whitelabel application header as a Vue web component

## Install

For Javascript frontends
```shell
npm i @webpros/tsxappheadervue
```

**Alternative with a CDN**
*or download the script from the cdn*
```html
<script type="module" crossorigin src="https://cdn.jsdelivr.net/npm/@webpros/tsxappheader/dist/tsxAppHeader.js"></script>
```

## Usage
The AppHeader is treated like a regular HTML element, and can be placed anywhere in the document. 

```html
<!-- Minimial Usage, -->
<tsx-appheader></tsx-appheader>

<!-- or with selfclosing tags (in SPAs)-->
<tsx-appheader />
```
*All props and configurations are optional, if nothing is passed, no header will be visible either*

To position the AppHeader so that it always hangs at the top of the page, it is recommended to position it `sticky`.
```css
.appHeader {
  position: sticky;
  top: 0;
  z-index: 100;
}
```

```html
<tsx-appheader
  environment="stage"
  current-language="en"
  extend-config='{ "user": { "avatar": "https://cdn.discordapp.com/avatars/174252302910095361/c938fe37cf00416656f4a102e0e869b9.webp?size=128", "email": "luke.skywalker@rebelsofempire.com", "plan": "pro" }}'
  model="threeSixtyFSC"
  class="appHeader"
/>
```

The `extended-config` expects the data to be passed in JSON format. This is unfortunately due to the fact that WebComponente can not forward JS objects.

### With Vue/Nuxt
```js
import Vue from 'vue'
import '@webpros/tsxappheader'

Vue.config.ignoredElements = [
  'tsx-appheader',
]
```

## Props
- `environment <string>` : The current environment, used to call the appropriate route of navigation [default: production]
- `currentLanguage <string>`: Current language [default: 'en']
- `model <string>`: Selection of the predefined configuration, if available
- `extendConfig <json>`: Passing the config parameters, which can also be used to extend / overwrite one of the predefined configurations. [default: '{}']
- `external-wl-domain <string>`: Optional external whitelabel domain
- `generate-base-url <boolean>`: With this the appheader writes the BaseURL by itself (independent from the config)
- `changelog-updates <boolean>`: Triggers the visibility of a changelog update

## Extend Config
With this Config the entire AppHeader is defined. It is important that depending on the `model` a configuration already exists, which can then be extended with the `extendConfig`. If there is no `model` then this serves as a general configuration. All props are optional, if no configuration is present, the element will not be rendered.

## Debug Report
With the query parameter `debugAppHeader` you get various debug messages of the AppHeader via console logs.

*It is necessary that the configuration is passed as valid JSON.*

**Base Interface**

```typescript
interface IConfig {
  baseUrl?: IConfigBaseUrl
  changelog?: boolean
  integration?: 'wlServerMonitoring' | 'wlWebsiteMonitoring'
  logo?: IConfigLogo
  breakpoints?: IConfigBreakpoints
  languages?: string[]
  user: IConfigUser
  userMenu?: IConfigUserMenu
  dotMenu?: IConfigDotMenu[][]
  navigation?: IConfigNavigation[]
  extend?: {
    logo?: IConfigLogo
    breakpoints?: IConfigBreakpoints
    languages?: string[]
    userMenu?: IConfigUserMenu
    dotMenu?: IConfigDotMenu[][]
    navigation?: IConfigNavigation[]
  }
}
```
Via the `extend` prop all contained props of an existing configuration can be extended. Outside the `extend` prop, all the props contained in it will be overwritten.

**Example:**

```typescript
const extendConfig = {
  baseUrl: {
    stage: 'http://localhost:3000',
    production: 'https://plesk.com'
  },
  extend: {
    languages: ['us']  
  }
}
```

### Shared Routes Interfaces
All routes can be passed as a simple string. For external routes, a target can be passed if `_self` is not sufficient, in which case the route is passed as an object.

It is possible to store relative as well as absolute links, the distinction happens automatically via regex (if http, https is at the link). Absolute links will change the AppHeader via `window.location.href`, with relative links the AppHeader will send a defined event, it is then up to the frontend how to handle the event.

```typescript
interface IConfigRoutes {
  [key: string]: string | {
    path: string
    target: string
  }
}
```

### Changelog
This activates the Changelog Trigger button in the first place.

### BaseUrl
The BaseUrl is to be set up for all environments and is needed to find the active link of internal URLs.

```typescript
interface IBaseUrl {
  [key: string]: string  
}
```

### Logo
The logo can be displayed either via an `element` integrated in the AppHeader or an external `src` as an image element. The logo width is limited to 160 pixels. The height is 40px, resulting in an aspect ratio of 4:1.

```typescript
interface ILogo {
  src: string
  routes?: IConfigRoutes
}
```

The `link` is also optional, an external as well as an internal link can be passed. In case of an internal link an event is transmitted via `mitt`, an external link triggers a regular page request. External links are opened in the same tab by default, this can be changed via the `linkTarget`.

### Breakpoints
The breakpoints define the responsive behavior of the `navigation`, the `userMenu` and the `9DotMenu`. If there are problems with certain languages, also set language-specific breakpoints. It is important to specify a `default` breakpoint, which will be used by all undefined languages.

```typescript
interface IBreakpoints {
  navigation?: number | {
    default: number
    [key: string]: number
  }
  userMenu?: number | {
    default: number
    [key: string]: number
  }
}
```

The breakpoints are mobile first. So if the navigation has few elements, it is possible to set the breakpoint to a much narrower viewport width.

**Example**
```typescript
const config = {
  breakpoints: {
    navigation: {
      default: 1000,
      en: 800,
      ru: 1200
    }  
  }  
}
```

### Languages
This sets how many languages the language changer must provide. The language codes are stored in ISO 639-1. It is important to note that the language changer is only displayed if two or more languages are specified. If no language is specified, it is set to 'en' by default.

```typescript
const config = {
  languages: ['en', 'de', 'fr']  
}
```

### User
This is used to pass the details of the user, such as the `email`, the `avatar` and the `plan`. The latter is used to control conditions within the navigation.

_The user is not part of the predefined config, so it must always be supplied via the `extendConfig` prop_.

```typescript
interface IUser {
  email: string
  avatar?: string
  plan: string
}
```

### UserMenu
The UserMenu is currently only a possible logout link, but can later be extended by another navigation.
Via 'extra' additional menu items can be added, which are related to the user.

```typescript
interface IUserMenu {
  logout?: {
    path: string
    target?: string
  }
  extra?: [
    {
      id: string
      title: string
      routes?: IConfigRoutes
    }  
  ]
}
```

### DotMenu
Within the DotMenu, links are grouped via arrays, which then results in the individual separator lines. The `type` defines whether it is a note, a link or a placeholder for the navigation.

```typescript
interface IDotMenu {
  id: number
  type: 'link' | 'note' | 'navPlaceholder'
  title?: string
  route?: IConfigRoutes
  icon?: string
}
```

The later is necessary so that the navigation below the breakpoint is rendered in the DotMenu. You should therefore set the type only once. If no DotMenu configuration is passed, the placeholder is set automatically.

**Example**
```typescript
const config = {
  dotMenu: [
    [
      {
        id: 'plesk360',
        type: 'link',
        title: 'Plesk360',
        routes: {
          stage: 'https://plesk360.com',
          prod: 'https://plesk360.com'
        },
        icon: 'cloud'
      }
    ],
    [
      {
        type: 'note',
        title: 'Service in Plesk360'
      },
      {
        id: 'monitoring',
        type: 'link',
        title: 'Monitoring',
        routes: {
          stage: '/',
          prod: '/'
        },
        icon: 'monitor'
      },
      {
        type: 'navPlaceholder'
      }
    ]
  ]
}
```

### Navigation
In its simplest state, the navigation consists of a series of entries with an `id`, `title` and optionally the `routes`. However, the individual entries can be extended with `label` and `clickConditions`.

```typescript
interface INavigation {
  id: number
  title: string
  routes?: IConfigRoutes
  external?: boolean
  label?: ILabel
  clickCondition?: IClickCondition
}
```

If an `external-wl-domain` is used, one can define with `external` route, whether this route leads explicitly outside. Since in this variant all links are noted relatively, when clicking on the link, an absolute link is generated from the relative link, if `external` is set to `true`.

#### Labeling
To attach a label to a navigation entry, you define it with `title` and the selection of a `style`. 

```typescript
interface ILabel {
  callback?: (user: string) => boolean | string | boolean
  title: string
  style: 'marketing' | 'info'
}
```
If the label is to be displayed in dependence on the user, a callback must be implemented. It is important that the callback only uses the user object.

**Example**
```typescript
label: {
  callback: (user: IConfigUser) => {
    return !/maildomain.com|/.test(user.email) || ['lite', 'pro'].includes(user.plan)
  },
  title: 'Pro',
  style: 'marketing'
}
```

#### Clickcondition
It is similar with the click condition, here a callback is mandatory.

```typescript
interface IClickCondition {
  callback: (plan: string) => boolean | string | boolean
  isTrue: {
    action: 'emitEvent'
    actionName: string
    payload?: any
  }
}
```

If a click condition is set, this is also checked in dependence on the user data, if it results in a `true`, a click on the navigation entry will only trigger an event. The name of the event is freely selectable, as well as the payload that is sent with the event.

**Example**
```typescript
clickCondition: {
  callback: (user: IConfigUser) => {
    return !/maildomain.com|/.test(user.email) || ['lite', 'pro'].includes(user.plan)
  },
  isTrue: {
    action: 'emitEvent',
    actionName: 'triggerInfoScreen',
    payload: {requiredPlan: ['business', 'enterprise']}
  }
}
```

### Callback
If you pass the navigation via the `extend-config`, the callback must be passed in a different form. In the simplest case you can pass a `boolean`, but if you want the AppHeader to evaluate it internally, the callback is passed in the following form.

```typescript
callback: '{ "args": "user", "body": "return [\\"lite\\"].includes(user.plan)" }'
```


### Predefined Models
Currently two configurations are predefined, which can be selected via the `model` prop.

```
threeSixtyFSC | threeSixtyNixstats | wlServerMonitoring | wlWebsiteMonitoring
```

If required, you can also use these configurations for your own configurations by either overwriting or extending individual areas via the `extendCofig


## Events
All click events of the AppHeader on internal links as well as internal info are sent to the `window.mitt` ([mitt.js](https://github.com/developit/mitt)) object using `mitt`. To filter the events the key `tsxAppHeader` is used. The actual event is identified via the action supplied.

**Example**
```typescript
window.mitt.on('tsxAppHeader', (payload) => {
  console.log('tsxAppHeader', payload)
})
```

Configuration for websites without SPA support
```html
<script src="https://unpkg.com/mitt/dist/mitt.umd.js"></script>
<script type="text/javascript">
  window.mitt = window.mitt()
  window.mitt.on('tsxAppHeader', (payload) => {
    console.log('tsxAppHeader', payload)
  })
</script>
```

Configuration for SPAs 
```typescript
import mitt from 'mitt'

window.mitt = window.mitt || mitt()

window.mitt.on('tsxAppHeader', (payload) => {
  console.log('payload', payload)
})
```

### General Click Event
All clickable elements will send out a click event, provided they do not already send out an event that comes via a ClickCondition. This provides the possibility to track the clicks within the AppHeader or to use them for other purposes. The payload of the event always contains the `id` of the element and if necessary the `path` of the selected route.

```typescript
interface ClickReturn {
  action: 'click'  
  path: string
  id: string
}
```

### Logo Event
```typescript
interface LogoReturn {
  action: 'clickLogo'  
  path: string
}
```

### Logout Event 
```typescript
interface LogoutReturn {
  action: 'logout'  
  path: string
}
```

### Languageselector Event 
```typescript
interface LanguageSelectorReturn {
  action: 'setLanguage'  
  value: string
}
```

### Changelog Event
```typescript
interface ChangelogReturn {
  action: 'openChangelog'
}
```

### Custom Events for clickconditions

```typescript
interface ClickConditionReturn {
  action: string
  id: string
  userPlan?: string
  [key: string]: any
}
```

_Eventnames for the conditions are freely defined via the configuration of the navigation._


## Whitelabel Colors
All colors of the header are described with CSS Vars and can be overwritten externally without the need for a new build. The CSS vars are prefixed with `tsxah`.

```css
:root {
  --tsxahBackground: #fff; /* Background Color */
  --tsxahText: #131313; /* General text color */
  --tsxahPrimary: #4cccff; /* Primary Color */
  --tsxahSecondary: #e77b35; /* Secondary Color */
  --tsxahPrimaryHover: #28aade; /* Primary color for hover */
  --tsxahSecondaryHover: #e16b1f; /* Secondary color for hover */
  --tsxahSubtleHover: #f5f5f5; /* Background Color for hover elements likes dotmenu */
  --tsxahNavBorderHover: #dcdcdc; /* Hover Color for the border in the nav */ 
  --tsxahNavBorderActive: #4cccff; /* Active border color for navigation */
  --tsxahDDBackground: #fff; /* Background color for dropdowns */
  --tsxahDDText: #6e6e6e; /* Text color for drowpdowns */
  --tsxahDDIcon: #565656; /* Color for Dropdown Icons */
  --tsxahDDInfo: #737373; /* Textcolor for Dropdown info texts */
  --tsxahDDHoverBackground: #f1f1f1; /* Background hover color */
  --tsxahDDHoverText: #3d3d3d; /* Text hover color */
  --tsxahDDActiveText: #4cccff; /* Text color for active elements */
  --tsxahDDActiveBackground: #fff; /* Background color for active elements */
  --tsxahDots: #131313; /* Color for the 9Dot Icon */
  --tsxahDivider: #e7e7e7; /* Color for Dividers */
  --tsxahLogo: #282828; /* Color for the Wordmark for prepared Logos */
  --tsxahChevron: #484848; /* Chevron colors, indicates a dropdown */
  --tsxahChangelogColorRegular: #CA3931; /* Changelog Update colors */
  --tsxahChangelogColorHover: #9d1d15; /* Changelog update colors hover */
}
```

*The CSSVars must be included in the regular CSS.*

## Translations 
All wordings of the prepared Configs are translated via the AppHeader. If external configs are inserted, make sure that the wordings are translated into the AppHeader before the inject.


## Additional Examples 

### Eventhandler 

```typescript
window.mitt.on('tsxAppHeader', (payload) => {
  switch (payload.action) {
    case 'setLanguage' :
      console.log('set language', payload.value.code)
      break
    case 'triggerInfoScreen' :
      if (payload.id === 'metrics') {
        console.log('open a info screen for metrics')
      }
      break
    case 'logout' :
      console.log('trigger logout')
      break
    case 'click':
      console.log('anything with general click events', payload.value)
      break
    case 'openChangelog':
      console.log('Open Changelog')
      break
  }
})
```
