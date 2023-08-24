<script lang="ts" setup>
import { useLinkHelper } from '@/composables/navigation'
import IconsBrand from '@/components/pure/IconsBrand/IconsBrand.vue'
import { TApplication, TIcons } from '@/types/general.interfaces'

const props = defineProps({
  logoName: {
    type: String as () => TIcons,
    default: ''
  },
  logoSrc: {
    type: String,
    default: ''
  },
  logoPath: {
    type: String,
    default: ''
  },
  usage: {
    type: String as () => TApplication,
    default: ''
  }
})

const { customLink } = useLinkHelper(props.usage)
</script>

<template>
  <a
    :class="[logoPath.length ? 'cursor-pointer': '']"
    class="text-app-logo block "
    @click.stop="customLink('clickLogo', {path: logoPath })"
  >
    <img
      v-if="logoSrc"
      :src="logoSrc"
      alt="logo"
      class="block w-auto max-h-[40px] "
    >
    <IconsBrand
      v-if="!logoSrc && logoName"
      :icon="logoName"
      class="h-[38px] relative top-[-1px]"
    />
  </a>
</template>
