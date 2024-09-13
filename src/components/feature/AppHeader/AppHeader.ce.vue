<script lang="ts" setup>
import { defaultNavigation, breakPoints } from '@/data/appHeader.models'
import { IConfigNavigationEvents, IFlagEvent, TApplication, TIcons } from '@/types/general.interfaces'
import { useElementSize } from '@vueuse/core'
import mitt from 'mitt'
import 'container-query-polyfill'

window.mitt = window.mitt || mitt()

const props = defineProps({
  /**
   * Current language of the application
   */
  currentLanguage: {
    type: String,
    default: 'en'
  },
  userDetails: {
    type: String,
    default: '{}'
  },
  logoName: {
    type: String as () => TIcons,
    default: ''
  },
  logoPath: {
    type: String,
    default: ''
  },
  logoSrc: {
    type: String,
    default: ''
  },
  languages: {
    type: String,
    default: '[]'
  },
  navigation: {
    type: String,
    default: '{}'
  },
  flags: {
    type: String,
    default: '{}'
  },
  changelogUpdates: {
    type: String,
    default: 'false'
  },
  hasChangelog: {
    type: String,
    default: 'false'
  },
  changelogUrls: {
    type: String,
    default: '{}'
  },
  localeEndpoint: {
    type: String,
    default: ''
  },
  usage: {
    type: String as () => TApplication,
    default: 'nixstats'
  }
})

const appFlags = computed(() => JSON.parse(props.flags))

const constructSendEvent = (event: string | IFlagEvent, events: IConfigNavigationEvents) => {
  if (typeof event === 'string') {
    return events[event] || false
  } if (typeof event === 'object') {
    return event
  }
  return false
}

const appNavigation = computed(() => {
  const outerNavigation = JSON.parse(props.navigation)
  const copyDefaultNavigation = JSON.parse(JSON.stringify(defaultNavigation))
  const navigation = Object.keys(outerNavigation).length ? outerNavigation : copyDefaultNavigation

  Object.keys(appFlags.value).forEach((group) => {
    const flagGroup = appFlags.value[group]
    if (!flagGroup) {

      if (group === 'company') {
        navigation[group] = [{ id: 'placeholder', type: 'placeholder' }]
      } else {
        navigation[group] = flagGroup ? navigation[group] : []
      }
    }

    if (!navigation[group]) return

    const flagGroupKeys = Object.keys(flagGroup)

    if (flagGroupKeys.length) {
      flagGroupKeys.forEach((item) => {
        const flagGroupItem = flagGroup[item]
        if (!flagGroupItem) {
          navigation[group] = navigation[group].filter((navItem: any) => navItem.id !== item)
        }
        if (Object.keys(flagGroupItem).length) {
          const entry = navigation[group].find((val: any) => val.id === item)

          if (entry) {
            const entryIndex = navigation[group].findIndex((val: any) => val.id === item)
            const sendEvent = constructSendEvent(flagGroupItem.event, entry.events || {})
            if (sendEvent) {
              navigation[group][entryIndex] = { ...entry, ...flagGroupItem, sendEvent }
            } else {
              navigation[group][entryIndex] = { ...entry, ...flagGroupItem }
            }
          }
        }
      })
    }
  })

  return navigation
})

const appUserDetails = computed(() => {
  const parsed = JSON.parse(props.userDetails)
  return parsed
})

const selectBreakpoint = (key: 'navigation'| 'userMenu', language: string) => {
  const breakpointEntry = breakPoints[key]
  return typeof breakpointEntry === 'object'
    ? breakpointEntry[props.currentLanguage] || breakpointEntry.default || 2000
    : breakpointEntry
}

const navigationBreakpoint = computed(() => selectBreakpoint('navigation', props.currentLanguage))

const appHeaderEl = ref(null)
const { width } = useElementSize(appHeaderEl)

const navigationVisibility = computed(() => {
  return navigationBreakpoint.value ? navigationBreakpoint.value <= width.value : true
})

const dotMenuVisibility = computed(() => {
  if (navigationBreakpoint.value && navigationBreakpoint.value > width.value) {
    return !!appNavigation.value.navigation?.length || !!appNavigation.value.company?.length
  }
  return appNavigation.value.company ? appNavigation.value.company.length > 1 : false
})


watch(() => props.currentLanguage, () => {
  setLanguage(props.currentLanguage)
}, { immediate: true })

const convertHasChangelog = computed(() => {
  return props.hasChangelog === 'true'
})

const convertChangelogUpdates = computed(() => {
  return props.changelogUpdates === 'true'
})

</script>

<template>
  <div
    v-if="Object.keys(appNavigation)"
    ref="appHeaderEl"
    class="appHeader px-[10px] bg-app-background antialiased"
  >
    <div v-if="usage.length" class="appHeader__wrapper flex items-center justify-between">
      <DotMenu
        v-if="dotMenuVisibility"
        :width="width"
        :navigation-breakpoint="navigationBreakpoint"
        :nav-entries-company="appNavigation.company"
        :nav-entries-navigation="appNavigation.navigation"
        :usage="usage"
        class="w-7 flex-shrink-0 mr-4"
      />
      <BrandLogo
        v-if="logoName.length || logoSrc.length"
        :logo-name="logoName"
        :logo-path="logoPath"
        :logo-src="logoSrc"
        :usage="usage"
        class="w-[160px] mr-4 flex-shrink-0"
      />
      <AppNavigation
        v-if="navigationVisibility"
        :nav-entries="appNavigation.navigation"
        :usage="usage"
      />
      <div
        v-else
        class="w-full flex-auto"
      />
      <ChangeLogTrigger
        v-if="convertHasChangelog"
        :changelog-updates="convertChangelogUpdates"
        :changelog-urls="JSON.parse(changelogUrls)"
        class="whatsNew"
      />
      <DocsMenu
        :changelog-updates="convertChangelogUpdates"
        :nav-entries="appNavigation.documentation"
        :usage="usage"
      />
      <UserMenu
        :nav-entries="appNavigation.user"
        :user-details="appUserDetails"
        :changelog-updates="convertChangelogUpdates"
        :usage="usage"
      />
    </div>
  </div>
</template>

<style lang="postcss">
@import '../../../assets/output.css';
</style>
