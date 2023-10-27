<script lang="ts" setup>
import { IConfigNavigationDetails, TApplication } from '@/types/general.interfaces'
import { debugEcho } from '@/utils'
import { Icon } from '@iconify/vue'

const props = defineProps({
  navEntries: {
    type: Array as () => IConfigNavigationDetails[],
    default: () => []
  },
  usage: {
    type: String as () => TApplication,
    default: ''
  }
})

debugEcho('AppNavigation props', props)

const { clickLink, labelStyle, setActiveLink } = useLinkHelper(props.usage)

const navigation = computed(() => {
  return props.navEntries.map((entry) => {
    if (!entry.path) return entry
    return {
      ...entry,
      isActive: setActiveLink(entry)
    }
  })
})
</script>

<template>
  <nav
    role="navigation"
    class="flex-auto w-full justify-start flex items-center h-16 text-app-text antialiased"
  >
    <div
      v-for="(entry, index) in navigation"
      :key="index"
      class="cursor-pointer font-semibold text-base leading-5 px-3 transition ease-in-out duration-300 relative h-full flex items-center navigation__link"
      :class="[
        {'navigation__link--active shadow-md': entry.isActive || false},
      ]"
    >
      <a class="h-full flex items-center" @click="clickLink(entry, $event)">
        <span>{{ translator(entry.id) }}</span>
        <span
          v-if="entry.label"
          class="ml-2 rounded-full py-[2px] text-xs font-semibold uppercase leading-none relative"
          :class="labelStyle(entry)"
        >
          <Icon
            v-if="entry.label === 'icon'"
            icon="ic:baseline-star"
            class="w-4"
          />
          <span v-else>{{ t(entry.label) }}</span>
        </span>
      </a>
    </div>
  </nav>
</template>
