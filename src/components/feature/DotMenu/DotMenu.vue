<script lang="ts" setup>
import { IConfigNavigationDetails, TApplication } from '@/types/general.interfaces'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'

const props = defineProps({
  width: {
    type: Number,
    default: 0
  },
  navigationBreakpoint: {
    type: Number,
    default: 0
  },
  navEntriesCompany: {
    type: Array as () => IConfigNavigationDetails[],
    default: () => []
  },
  navEntriesNavigation: {
    type: Array as () => IConfigNavigationDetails[],
    default: () => []
  },
  usage: {
    type: String as () => TApplication,
    default: ''
  }
})

const { setActiveLink } = useLinkHelper(props.usage)

const onlyResponsiveMenu = computed(() => props.navEntriesCompany.length <= 1)

const dotMenu = computed(() => {
  const baseMenu : IConfigNavigationDetails[] = props.navEntriesCompany?.length
    ? props.navEntriesCompany
    : [{ id: 'placeholder', type: 'placeholder' }]

  return baseMenu.map(entry => {
    if (entry.type === 'placeholder') {
      return props.navEntriesNavigation.map((val) => {
        return {
          ...val,
          type: 'link',
          isSub: !onlyResponsiveMenu.value,
          isActive: setActiveLink(val)
        }
      })
    }
    return entry
  }).flat()
})

const isBreak = computed(() => props.navigationBreakpoint
  ? props.navigationBreakpoint <= props.width
  : true)


</script>

<template>
  <Menu
    as="div"
    class="hover:bg-app-hover rounded"
  >
    <MenuButton>
      <div class="flex items-center justify-center cursor-pointer h-10 w-7 ">
        <IconNineDot class="w-4 text-app-dots" />
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
        class="origin-top-right absolute left-2 top-[66px] w-72 rounded-md shadow-lg bg-dropdown-background ring-1 ring-black ring-opacity-5 focus:outline-none overflow-hidden py-2"
      >
        <div
          v-for="(item, index) in dotMenu"
          :key="index"
          class="flex px-2 text-dropdown-text"
          :class="[
            {'hover:bg-dropdown-hoverBackground hover:text-dropdown-hoverText cursor-pointer transition ease-in-out duration-150 rounded' : item.type === 'link'},
            item.isActive && item.isSub || item.isActive && onlyResponsiveMenu ? 'bg-gray-200': '',
            item.isSub && isBreak ? 'hidden' : '',
            item.type === 'seperator' ? 'border-b border-gray-200 h-1 py-0 my-0' : 'py-1 my-1 mx-3',
          ]"
        >
          <div class="flex items-center gap-3 leading-loose w-full px-2">
            <div v-if="!onlyResponsiveMenu" class="w-4 flex-shrink-0">
              <IconsDotMenu
                v-if="item.icon"
                class="w-5 h-5 text-dropdown-icon"
                :icon="item.icon"
              />
            </div>

            <div
              v-if="item.type === 'note'"
              class="text-[10px] uppercase pt-2 font-semibold tracking-[1px] text-dropdown-info"
            >
              {{ translator(item.title || '') }}
            </div>
            <DotMenuLink
              v-if="item.type === 'link'"
              :details="item"
              :usage="usage"
              :class="[
                item.isSub ? 'dotNav__sub' : ''
              ]"
            />
          </div>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>
