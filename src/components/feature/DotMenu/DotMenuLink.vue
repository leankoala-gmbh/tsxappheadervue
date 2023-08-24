<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import { IConfigNavigationDetails, TApplication } from '@/types/general.interfaces'

const props = defineProps({
  details: {
    type: Object as () => IConfigNavigationDetails,
    default: () => ({})
  },
  isSub: {
    type: Boolean,
    default: false
  },
  usage: {
    type: String as () => TApplication,
    default: ''
  }
})

const { clickLink, labelStyle } = useLinkHelper(props.usage)

</script>

<template>
  <a
    class="text-sm flex-auto flex items-center"
    @click.stop="clickLink(details)"
  >
    {{ translator(details.id) }}
    <span
      v-if="details.label"
      class="ml-2 rounded-full p-[2px] text-xs font-semibold uppercase leading-none relative flex items-center justify-center h-4 w-4"
      :class="labelStyle(details)"
    >
      <Icon
        v-if="details.label === 'icon'"
        icon="ic:baseline-star"
        class="w-4"
      />
      <span v-else>{{ t(details.label) }}</span>
    </span>
  </a>
</template>
