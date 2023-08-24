<script lang="ts" setup>
import IconsUserMenu from '@/components/pure/IconsUserMenu/IconsUserMenu.vue'

type TIcons = 'profile' | 'logout' | 'changelog'

const props = defineProps({
  icon: {
    type: String as () => TIcons,
    default: ''
  },
  important: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <a
    class="py-2 px-4 text-sm cursor-pointer text-dropdown-text hover:bg-dropdown-hoverBackground hover:text-dropdown-hoverText transition ease-in-out duration-150 flex items-center"
  >
    <span class="w-6 flex items-center gap-2 ">
      <IconsUserMenu
        class="h-4 w-4"
        :class="[
          important ? 'text-dropdown-important' : 'text-dropdown-icon',
        ]"
        :icon="icon"
      />
    </span>
    <span>
      <slot />
    </span>
  </a>
</template>
