<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import { translator } from '@/composables/translator'
import { IConfigNavigationDetails, TApplication } from '@/types/general.interfaces'
import { Menu, MenuButton, MenuItems } from '@headlessui/vue'
import IconsUserMenu from '@/components/pure/IconsUserMenu/IconsUserMenu.vue'

const props = defineProps({
  fullLength: {
    type: Boolean,
    default: false
  },
  changelogUpdates: {
    type: Boolean,
    default: false
  },
  navEntries: {
    type: Array as () => IConfigNavigationDetails[],
    default: () => []
  },
  usage: {
    type: String as () => TApplication,
    default: ''
  }
})

const { clickLink, labelStyle } = useLinkHelper(props.usage)
</script>

<template>
  <Menu
    v-if="navEntries.length"
    as="div"
    class="ml-3 relative hover:bg-app-hover justify-end flex items-center rounded h-10"
  >
    <MenuButton>
      <div class="flex items-center gap-2 cursor-pointer">
        <svg
          class="w-5 h-5 opacity-60"
          viewBox="0 0 14 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M13.125 9.9375C13.125 10.3477 12.9336 10.6758 12.6875 10.9492V13.1641C12.9336 13.3281 13.125 13.6016 13.125 13.9023C13.125 14.3672 12.7148 14.75 12.25 14.75H3.5C2.02344 14.75 0.875 13.6016 0.875 12.125V3.375C0.875 1.92578 2.02344 0.75 3.5 0.75H11.8125C12.5234 0.75 13.125 1.35156 13.125 2.0625V9.9375ZM4.78516 4.25C4.56641 4.25 4.375 4.46875 4.375 4.6875C4.375 4.93359 4.56641 5.125 4.78516 5.125H10.0625C10.2812 5.125 10.5 4.93359 10.5 4.6875C10.5 4.46875 10.2812 4.25 10.0352 4.25H4.78516ZM4.78516 6C4.56641 6 4.375 6.21875 4.375 6.4375C4.375 6.68359 4.56641 6.875 4.78516 6.875H10.0625C10.2812 6.875 10.5 6.68359 10.5 6.4375C10.5 6.21875 10.2812 6 10.0352 6H4.78516ZM11.375 13V11.25H3.5C3.00781 11.25 2.625 11.6602 2.625 12.125C2.625 12.6172 3.00781 13 3.5 13H11.375Z" fill="currentColor" />
        </svg>


        <svg
          class="w-4 text-app-chevron"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        ><path fill="currentColor" d="M7.41 8.58L12 13.17l4.59-4.59L18 10l-6 6l-6-6l1.41-1.42Z" /></svg>
      </div>
    </MenuButton>
    <transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <MenuItems
        v-if="navEntries.length"
        class="origin-top-right absolute right-0 top-[55px] rounded-md shadow-lg  bg-dropdown-background ring-1 ring-black ring-opacity-5 focus:outline-none w-64 py-2"
      >
        <div>
          <a
            v-for="(entry, index) in navEntries"
            :key="index"
            class="mx-2 my-1 px-2 py-2 text-sm cursor-pointer text-dropdown-text hover:bg-dropdown-hoverBackground hover:text-dropdown-hoverText transition ease-in-out duration-150  flex items-center rounded"
            @click.stop="clickLink(entry)"
          >
            <IconsUserMenu
              v-if="entry.icon"
              class="w-4 opacity-60"
              :icon="entry.icon"
            />
            <span
              class="ml-2"
            >{{ translator(entry.id) }}</span>
            <svg
              v-if="entry.newTab"
              class="ml-2"
              width="14"
              height="15"
              viewBox="0 0 14 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.5 9.5C10.9648 9.5 11.375 9.91016 11.375 10.375V13C11.375 13.9844 10.582 14.75 9.625 14.75H1.75C0.765625 14.75 0 13.9844 0 13V5.125C0 4.16797 0.765625 3.375 1.75 3.375H4.375C4.83984 3.375 5.25 3.78516 5.25 4.25C5.25 4.74219 4.83984 5.125 4.375 5.125H1.75V13H9.625V10.375C9.625 9.91016 10.0078 9.5 10.5 9.5ZM13.3438 0.75C13.6992 0.75 14 1.05078 14 1.40625V5.125C14 5.48047 13.7812 5.80859 13.4531 5.94531C13.125 6.08203 12.7422 6 12.4961 5.75391L11.375 4.63281L5.85156 10.1289C5.6875 10.293 5.46875 10.375 5.25 10.375C5.00391 10.375 4.78516 10.293 4.62109 10.1289C4.26562 9.80078 4.26562 9.22656 4.62109 8.89844L10.1172 3.375L8.99609 2.25391C8.75 2.00781 8.66797 1.625 8.80469 1.29688C8.94141 0.96875 9.26953 0.75 9.625 0.75H13.3438Z" fill="#97A2B6" />
            </svg>
            <span
              v-if="entry.label"
              class="ml-2 rounded-full p-[2px] text-xs font-semibold uppercase leading-none relative flex items-center justify-center h-4 w-4"
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
      </MenuItems>
    </transition>
  </Menu>
</template>
